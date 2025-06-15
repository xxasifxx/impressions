
-- Create appointments table
CREATE TABLE public.appointments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT NOT NULL,
  client_phone TEXT,
  service_id UUID REFERENCES public.salon_services(id),
  specialist_id UUID REFERENCES public.salon_specialists(id),
  appointment_date DATE NOT NULL,
  appointment_time TIME NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  total_price DECIMAL(10,2),
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'confirmed', 'in_progress', 'completed', 'cancelled', 'no_show')),
  notes TEXT,
  source_page TEXT, -- Track which sales funnel generated this appointment
  google_calendar_event_id TEXT, -- Store Google Calendar event ID
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create appointment notifications table for reminders
CREATE TABLE public.appointment_notifications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  appointment_id UUID NOT NULL REFERENCES public.appointments(id) ON DELETE CASCADE,
  notification_type TEXT NOT NULL CHECK (notification_type IN ('confirmation', 'reminder_24h', 'reminder_2h', 'follow_up')),
  sent_at TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointment_notifications ENABLE ROW LEVEL SECURITY;

-- Create policies for appointments (public booking, staff can view all)
CREATE POLICY "Anyone can create appointments" 
  ON public.appointments 
  FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Anyone can view their own appointments" 
  ON public.appointments 
  FOR SELECT 
  USING (true); -- For now, make it public for booking system

-- Create policies for notifications
CREATE POLICY "System can manage notifications" 
  ON public.appointment_notifications 
  FOR ALL 
  USING (true);

-- Create function to update appointment updated_at
CREATE OR REPLACE FUNCTION public.update_appointment_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for appointments
CREATE TRIGGER update_appointment_updated_at
  BEFORE UPDATE ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.update_appointment_updated_at();

-- Create function to automatically create notification records
CREATE OR REPLACE FUNCTION public.create_appointment_notifications()
RETURNS TRIGGER AS $$
BEGIN
  -- Create confirmation notification
  INSERT INTO public.appointment_notifications (appointment_id, notification_type)
  VALUES (NEW.id, 'confirmation');
  
  -- Create reminder notifications
  INSERT INTO public.appointment_notifications (appointment_id, notification_type)
  VALUES (NEW.id, 'reminder_24h');
  
  INSERT INTO public.appointment_notifications (appointment_id, notification_type)
  VALUES (NEW.id, 'reminder_2h');
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-create notifications
CREATE TRIGGER create_appointment_notifications_trigger
  AFTER INSERT ON public.appointments
  FOR EACH ROW
  EXECUTE FUNCTION public.create_appointment_notifications();
