
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface CalendarEventRequest {
  appointmentId: string;
  clientName: string;
  clientEmail: string;
  serviceName: string;
  specialistName: string;
  appointmentDate: string;
  appointmentTime: string;
  durationMinutes: number;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const { 
      appointmentId,
      clientName, 
      clientEmail, 
      serviceName, 
      specialistName,
      appointmentDate, 
      appointmentTime, 
      durationMinutes 
    }: CalendarEventRequest = await req.json();

    // Create Google Calendar event
    const googleCalendarApiKey = Deno.env.get("GOOGLE_CALENDAR_API_KEY");
    const calendarId = Deno.env.get("GOOGLE_CALENDAR_ID");

    if (!googleCalendarApiKey || !calendarId) {
      console.log("Google Calendar credentials not configured, skipping calendar creation");
      return new Response(
        JSON.stringify({ success: true, message: "Appointment created without calendar event" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Parse date and time
    const startDateTime = new Date(`${appointmentDate}T${appointmentTime}`);
    const endDateTime = new Date(startDateTime.getTime() + durationMinutes * 60000);

    const calendarEvent = {
      summary: `${serviceName} with ${specialistName}`,
      description: `Hair salon appointment for ${clientName}\nService: ${serviceName}\nSpecialist: ${specialistName}`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: "America/New_York"
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: "America/New_York"
      },
      attendees: [
        { email: clientEmail, displayName: clientName }
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 1440 }, // 24 hours
          { method: "email", minutes: 120 }   // 2 hours
        ]
      }
    };

    const calendarResponse = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${googleCalendarApiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${googleCalendarApiKey}`
        },
        body: JSON.stringify(calendarEvent)
      }
    );

    if (calendarResponse.ok) {
      const eventData = await calendarResponse.json();
      
      // Update appointment with Google Calendar event ID
      await supabase
        .from("appointments")
        .update({ google_calendar_event_id: eventData.id })
        .eq("id", appointmentId);

      console.log("Calendar event created successfully:", eventData.id);
    } else {
      const errorText = await calendarResponse.text();
      console.error("Failed to create calendar event:", errorText);
    }

    return new Response(
      JSON.stringify({ success: true, appointmentId }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );

  } catch (error) {
    console.error("Error in create-calendar-event function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
