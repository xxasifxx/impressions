export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      analytics_events: {
        Row: {
          event_data: Json | null
          event_type: string
          id: string
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          event_data?: Json | null
          event_type: string
          id?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          event_data?: Json | null
          event_type?: string
          id?: string
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      applications: {
        Row: {
          applicant_id: string | null
          applied_at: string | null
          id: string
          job_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          applicant_id?: string | null
          applied_at?: string | null
          id?: string
          job_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          applicant_id?: string | null
          applied_at?: string | null
          id?: string
          job_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applications_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "applications_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
        ]
      }
      appointment_notifications: {
        Row: {
          appointment_id: string
          created_at: string
          id: string
          notification_type: string
          sent_at: string | null
          status: string
        }
        Insert: {
          appointment_id: string
          created_at?: string
          id?: string
          notification_type: string
          sent_at?: string | null
          status?: string
        }
        Update: {
          appointment_id?: string
          created_at?: string
          id?: string
          notification_type?: string
          sent_at?: string | null
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointment_notifications_appointment_id_fkey"
            columns: ["appointment_id"]
            isOneToOne: false
            referencedRelation: "appointments"
            referencedColumns: ["id"]
          },
        ]
      }
      appointments: {
        Row: {
          appointment_date: string
          appointment_time: string
          client_email: string
          client_name: string
          client_phone: string | null
          created_at: string
          duration_minutes: number
          google_calendar_event_id: string | null
          id: string
          notes: string | null
          service_id: string | null
          source_page: string | null
          specialist_id: string | null
          status: string
          total_price: number | null
          updated_at: string
        }
        Insert: {
          appointment_date: string
          appointment_time: string
          client_email: string
          client_name: string
          client_phone?: string | null
          created_at?: string
          duration_minutes?: number
          google_calendar_event_id?: string | null
          id?: string
          notes?: string | null
          service_id?: string | null
          source_page?: string | null
          specialist_id?: string | null
          status?: string
          total_price?: number | null
          updated_at?: string
        }
        Update: {
          appointment_date?: string
          appointment_time?: string
          client_email?: string
          client_name?: string
          client_phone?: string | null
          created_at?: string
          duration_minutes?: number
          google_calendar_event_id?: string | null
          id?: string
          notes?: string | null
          service_id?: string | null
          source_page?: string | null
          specialist_id?: string | null
          status?: string
          total_price?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "appointments_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "salon_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "appointments_specialist_id_fkey"
            columns: ["specialist_id"]
            isOneToOne: false
            referencedRelation: "salon_specialists"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          industry: string | null
          location: string | null
          logo_url: string | null
          name: string
          size_range: string | null
          updated_at: string | null
          website: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          logo_url?: string | null
          name: string
          size_range?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          industry?: string | null
          location?: string | null
          logo_url?: string | null
          name?: string
          size_range?: string | null
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "companies_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      connections: {
        Row: {
          created_at: string | null
          id: string
          message: string | null
          recipient_id: string | null
          requester_id: string | null
          status: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          message?: string | null
          recipient_id?: string | null
          requester_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string | null
          recipient_id?: string | null
          requester_id?: string | null
          status?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "connections_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "connections_requester_id_fkey"
            columns: ["requester_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          company: string | null
          email: string
          id: string
          message: string
          name: string
          status: string | null
          submitted_at: string
        }
        Insert: {
          company?: string | null
          email: string
          id?: string
          message: string
          name: string
          status?: string | null
          submitted_at?: string
        }
        Update: {
          company?: string | null
          email?: string
          id?: string
          message?: string
          name?: string
          status?: string | null
          submitted_at?: string
        }
        Relationships: []
      }
      course_enrollments: {
        Row: {
          completed_at: string | null
          course_id: string | null
          enrolled_at: string | null
          id: string
          progress_percentage: number | null
          student_id: string | null
        }
        Insert: {
          completed_at?: string | null
          course_id?: string | null
          enrolled_at?: string | null
          id?: string
          progress_percentage?: number | null
          student_id?: string | null
        }
        Update: {
          completed_at?: string | null
          course_id?: string | null
          enrolled_at?: string | null
          id?: string
          progress_percentage?: number | null
          student_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          duration_hours: number | null
          id: string
          is_published: boolean | null
          price: number | null
          skill_id: string | null
          title: string
          updated_at: string | null
          vendor_id: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration_hours?: number | null
          id?: string
          is_published?: boolean | null
          price?: number | null
          skill_id?: string | null
          title: string
          updated_at?: string | null
          vendor_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration_hours?: number | null
          id?: string
          is_published?: boolean | null
          price?: number | null
          skill_id?: string | null
          title?: string
          updated_at?: string | null
          vendor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "courses_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_vendor_id_fkey"
            columns: ["vendor_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      demo_bookings: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          name: string
          notes: string | null
          phone: string | null
          selected_date: string
          selected_time: string
          status: string | null
          timezone: string | null
          updated_at: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          name: string
          notes?: string | null
          phone?: string | null
          selected_date: string
          selected_time: string
          status?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          name?: string
          notes?: string | null
          phone?: string | null
          selected_date?: string
          selected_time?: string
          status?: string | null
          timezone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      demo_candidates: {
        Row: {
          created_at: string
          email: string
          id: string
          match_score: number
          name: string
          personality_scores: Json
          skills: string[]
          status: string
          story: string | null
          title: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          match_score?: number
          name: string
          personality_scores?: Json
          skills?: string[]
          status?: string
          story?: string | null
          title: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          match_score?: number
          name?: string
          personality_scores?: Json
          skills?: string[]
          status?: string
          story?: string | null
          title?: string
        }
        Relationships: []
      }
      demo_connections: {
        Row: {
          candidate_name: string
          company_name: string
          connection_time: string
          id: string
          role: string
          status: string
        }
        Insert: {
          candidate_name: string
          company_name: string
          connection_time?: string
          id?: string
          role: string
          status?: string
        }
        Update: {
          candidate_name?: string
          company_name?: string
          connection_time?: string
          id?: string
          role?: string
          status?: string
        }
        Relationships: []
      }
      demo_employers: {
        Row: {
          company_name: string
          created_at: string
          id: string
          required_skills: string[]
          required_traits: string[]
          role_title: string
          status: string
        }
        Insert: {
          company_name: string
          created_at?: string
          id?: string
          required_skills?: string[]
          required_traits?: string[]
          role_title: string
          status?: string
        }
        Update: {
          company_name?: string
          created_at?: string
          id?: string
          required_skills?: string[]
          required_traits?: string[]
          role_title?: string
          status?: string
        }
        Relationships: []
      }
      demo_interactions: {
        Row: {
          data: Json
          id: string
          interaction_type: string
          timestamp: string
        }
        Insert: {
          data?: Json
          id?: string
          interaction_type: string
          timestamp?: string
        }
        Update: {
          data?: Json
          id?: string
          interaction_type?: string
          timestamp?: string
        }
        Relationships: []
      }
      event_registrations: {
        Row: {
          attended: boolean | null
          event_id: string | null
          id: string
          registered_at: string | null
          user_id: string | null
        }
        Insert: {
          attended?: boolean | null
          event_id?: string | null
          id?: string
          registered_at?: string | null
          user_id?: string | null
        }
        Update: {
          attended?: boolean | null
          event_id?: string | null
          id?: string
          registered_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "event_registrations_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "event_registrations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      events: {
        Row: {
          created_at: string | null
          description: string | null
          end_time: string
          event_type: string | null
          id: string
          is_virtual: boolean | null
          location: string | null
          max_attendees: number | null
          organizer_id: string | null
          registration_required: boolean | null
          start_time: string
          status: string | null
          title: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_time: string
          event_type?: string | null
          id?: string
          is_virtual?: boolean | null
          location?: string | null
          max_attendees?: number | null
          organizer_id?: string | null
          registration_required?: boolean | null
          start_time: string
          status?: string | null
          title: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_time?: string
          event_type?: string | null
          id?: string
          is_virtual?: boolean | null
          location?: string | null
          max_attendees?: number | null
          organizer_id?: string | null
          registration_required?: boolean | null
          start_time?: string
          status?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "events_organizer_id_fkey"
            columns: ["organizer_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_slots: {
        Row: {
          buffer_minutes: number | null
          created_at: string | null
          end_time: string
          id: string
          interviewer_id: string | null
          is_available: boolean | null
          max_interviews: number | null
          recurring_pattern: string | null
          start_time: string
          updated_at: string | null
        }
        Insert: {
          buffer_minutes?: number | null
          created_at?: string | null
          end_time: string
          id?: string
          interviewer_id?: string | null
          is_available?: boolean | null
          max_interviews?: number | null
          recurring_pattern?: string | null
          start_time: string
          updated_at?: string | null
        }
        Update: {
          buffer_minutes?: number | null
          created_at?: string | null
          end_time?: string
          id?: string
          interviewer_id?: string | null
          is_available?: boolean | null
          max_interviews?: number | null
          recurring_pattern?: string | null
          start_time?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_slots_interviewer_id_fkey"
            columns: ["interviewer_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          application_id: string | null
          created_at: string | null
          duration_minutes: number
          feedback: string | null
          id: string
          interview_type: string
          interviewee_id: string | null
          interviewer_id: string | null
          location: string | null
          meeting_link: string | null
          notes: string | null
          rating: number | null
          scheduled_at: string
          status: string
          updated_at: string | null
        }
        Insert: {
          application_id?: string | null
          created_at?: string | null
          duration_minutes?: number
          feedback?: string | null
          id?: string
          interview_type: string
          interviewee_id?: string | null
          interviewer_id?: string | null
          location?: string | null
          meeting_link?: string | null
          notes?: string | null
          rating?: number | null
          scheduled_at: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          application_id?: string | null
          created_at?: string | null
          duration_minutes?: number
          feedback?: string | null
          id?: string
          interview_type?: string
          interviewee_id?: string | null
          interviewer_id?: string | null
          location?: string | null
          meeting_link?: string | null
          notes?: string | null
          rating?: number | null
          scheduled_at?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interviews_application_id_fkey"
            columns: ["application_id"]
            isOneToOne: false
            referencedRelation: "applications"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_interviewee_id_fkey"
            columns: ["interviewee_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_interviewer_id_fkey"
            columns: ["interviewer_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_alerts: {
        Row: {
          created_at: string | null
          experience_level: string | null
          frequency: string
          id: string
          is_active: boolean | null
          job_type: string | null
          keywords: string[] | null
          last_sent_at: string | null
          location: string | null
          remote_ok: boolean | null
          salary_max: number | null
          salary_min: number | null
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          experience_level?: string | null
          frequency: string
          id?: string
          is_active?: boolean | null
          job_type?: string | null
          keywords?: string[] | null
          last_sent_at?: string | null
          location?: string | null
          remote_ok?: boolean | null
          salary_max?: number | null
          salary_min?: number | null
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          experience_level?: string | null
          frequency?: string
          id?: string
          is_active?: boolean | null
          job_type?: string | null
          keywords?: string[] | null
          last_sent_at?: string | null
          location?: string | null
          remote_ok?: boolean | null
          salary_max?: number | null
          salary_min?: number | null
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_alerts_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_postings: {
        Row: {
          company_id: string | null
          created_at: string | null
          description: string
          experience_level: string | null
          id: string
          location: string | null
          posted_by: string | null
          preferred_skills: string[] | null
          remote_ok: boolean | null
          required_skills: string[] | null
          salary_max: number | null
          salary_min: number | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          description: string
          experience_level?: string | null
          id?: string
          location?: string | null
          posted_by?: string | null
          preferred_skills?: string[] | null
          remote_ok?: boolean | null
          required_skills?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          description?: string
          experience_level?: string | null
          id?: string
          location?: string | null
          posted_by?: string | null
          preferred_skills?: string[] | null
          remote_ok?: boolean | null
          required_skills?: string[] | null
          salary_max?: number | null
          salary_min?: number | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_postings_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_postings_posted_by_fkey"
            columns: ["posted_by"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      job_views: {
        Row: {
          id: string
          job_id: string | null
          referrer: string | null
          session_id: string | null
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          id?: string
          job_id?: string | null
          referrer?: string | null
          session_id?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          id?: string
          job_id?: string | null
          referrer?: string | null
          session_id?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "job_views_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "job_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          id: string
          is_read: boolean | null
          recipient_id: string | null
          sender_id: string | null
          sent_at: string | null
          subject: string | null
        }
        Insert: {
          content: string
          id?: string
          is_read?: boolean | null
          recipient_id?: string | null
          sender_id?: string | null
          sent_at?: string | null
          subject?: string | null
        }
        Update: {
          content?: string
          id?: string
          is_read?: boolean | null
          recipient_id?: string | null
          sender_id?: string | null
          sent_at?: string | null
          subject?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_recipient_id_fkey"
            columns: ["recipient_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          action_url: string | null
          created_at: string | null
          data: Json | null
          expires_at: string | null
          id: string
          is_read: boolean | null
          message: string
          title: string
          type: string
          user_id: string | null
        }
        Insert: {
          action_url?: string | null
          created_at?: string | null
          data?: Json | null
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          title: string
          type: string
          user_id?: string | null
        }
        Update: {
          action_url?: string | null
          created_at?: string | null
          data?: Json | null
          expires_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          title?: string
          type?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      personality_assessments: {
        Row: {
          adaptability_score: number | null
          analytical_score: number | null
          collaboration_score: number | null
          completed_at: string | null
          creativity_score: number | null
          id: string
          leadership_score: number | null
          user_id: string | null
        }
        Insert: {
          adaptability_score?: number | null
          analytical_score?: number | null
          collaboration_score?: number | null
          completed_at?: string | null
          creativity_score?: number | null
          id?: string
          leadership_score?: number | null
          user_id?: string | null
        }
        Update: {
          adaptability_score?: number | null
          analytical_score?: number | null
          collaboration_score?: number | null
          completed_at?: string | null
          creativity_score?: number | null
          id?: string
          leadership_score?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "personality_assessments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      resumes: {
        Row: {
          analysis_score: number | null
          extracted_text: string | null
          file_name: string
          file_size: number | null
          file_url: string
          id: string
          skills_detected: string[] | null
          uploaded_at: string | null
          user_id: string | null
        }
        Insert: {
          analysis_score?: number | null
          extracted_text?: string | null
          file_name: string
          file_size?: number | null
          file_url: string
          id?: string
          skills_detected?: string[] | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Update: {
          analysis_score?: number | null
          extracted_text?: string | null
          file_name?: string
          file_size?: number | null
          file_url?: string
          id?: string
          skills_detected?: string[] | null
          uploaded_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resumes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_clients: {
        Row: {
          allergies: string[] | null
          created_at: string | null
          email: string
          first_name: string
          hair_type: string | null
          id: string
          last_name: string
          phone: string | null
          preferences: Json | null
          previous_services: string[] | null
          updated_at: string | null
        }
        Insert: {
          allergies?: string[] | null
          created_at?: string | null
          email: string
          first_name: string
          hair_type?: string | null
          id?: string
          last_name: string
          phone?: string | null
          preferences?: Json | null
          previous_services?: string[] | null
          updated_at?: string | null
        }
        Update: {
          allergies?: string[] | null
          created_at?: string | null
          email?: string
          first_name?: string
          hair_type?: string | null
          id?: string
          last_name?: string
          phone?: string | null
          preferences?: Json | null
          previous_services?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      salon_services: {
        Row: {
          base_price: number | null
          category: string
          created_at: string | null
          description: string | null
          difficulty_level: string | null
          duration_max: number | null
          duration_min: number | null
          id: string
          is_active: boolean | null
          name: string
          specialist_requirements: string[] | null
          updated_at: string | null
        }
        Insert: {
          base_price?: number | null
          category: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration_max?: number | null
          duration_min?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          specialist_requirements?: string[] | null
          updated_at?: string | null
        }
        Update: {
          base_price?: number | null
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty_level?: string | null
          duration_max?: number | null
          duration_min?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          specialist_requirements?: string[] | null
          updated_at?: string | null
        }
        Relationships: []
      }
      salon_specialists: {
        Row: {
          availability_schedule: Json | null
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          hourly_rate: number | null
          id: string
          is_active: boolean | null
          name: string
          specialties: string[] | null
          updated_at: string | null
          years_experience: number | null
        }
        Insert: {
          availability_schedule?: Json | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          specialties?: string[] | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Update: {
          availability_schedule?: Json | null
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          hourly_rate?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          specialties?: string[] | null
          updated_at?: string | null
          years_experience?: number | null
        }
        Relationships: []
      }
      salon_testimonials: {
        Row: {
          client_name: string
          created_at: string | null
          id: string
          quote: string
          rating: number | null
          service_id: string | null
          transformation_id: string | null
          verified: boolean | null
        }
        Insert: {
          client_name: string
          created_at?: string | null
          id?: string
          quote: string
          rating?: number | null
          service_id?: string | null
          transformation_id?: string | null
          verified?: boolean | null
        }
        Update: {
          client_name?: string
          created_at?: string | null
          id?: string
          quote?: string
          rating?: number | null
          service_id?: string | null
          transformation_id?: string | null
          verified?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "salon_testimonials_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "salon_services"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "salon_testimonials_transformation_id_fkey"
            columns: ["transformation_id"]
            isOneToOne: false
            referencedRelation: "salon_transformations"
            referencedColumns: ["id"]
          },
        ]
      }
      salon_transformations: {
        Row: {
          after_image_url: string
          before_image_url: string
          client_consent: boolean | null
          created_at: string | null
          description: string | null
          display_order: number | null
          featured: boolean | null
          id: string
          service_id: string | null
          timeframe: string | null
          title: string
        }
        Insert: {
          after_image_url: string
          before_image_url: string
          client_consent?: boolean | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          featured?: boolean | null
          id?: string
          service_id?: string | null
          timeframe?: string | null
          title: string
        }
        Update: {
          after_image_url?: string
          before_image_url?: string
          client_consent?: boolean | null
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          featured?: boolean | null
          id?: string
          service_id?: string | null
          timeframe?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "salon_transformations_service_id_fkey"
            columns: ["service_id"]
            isOneToOne: false
            referencedRelation: "salon_services"
            referencedColumns: ["id"]
          },
        ]
      }
      saved_jobs: {
        Row: {
          id: string
          job_id: string | null
          notes: string | null
          saved_at: string | null
          user_id: string | null
        }
        Insert: {
          id?: string
          job_id?: string | null
          notes?: string | null
          saved_at?: string | null
          user_id?: string | null
        }
        Update: {
          id?: string
          job_id?: string | null
          notes?: string | null
          saved_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "saved_jobs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "job_postings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "saved_jobs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      skills: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          id: string
          name: string
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_activity: {
        Row: {
          activity_data: Json | null
          activity_type: string
          created_at: string | null
          id: string
          ip_address: unknown | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          activity_data?: Json | null
          activity_type: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          activity_data?: Json | null
          activity_type?: string
          created_at?: string | null
          id?: string
          ip_address?: unknown | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_activity_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company_website: string | null
          created_at: string | null
          experience_years: number | null
          first_name: string | null
          id: string
          last_name: string | null
          location: string | null
          onboarding_completed: boolean | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          skills: string[] | null
          updated_at: string | null
          user_roles: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company_website?: string | null
          created_at?: string | null
          experience_years?: number | null
          first_name?: string | null
          id: string
          last_name?: string | null
          location?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          skills?: string[] | null
          updated_at?: string | null
          user_roles?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company_website?: string | null
          created_at?: string | null
          experience_years?: number | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          location?: string | null
          onboarding_completed?: boolean | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          skills?: string[] | null
          updated_at?: string | null
          user_roles?: string | null
        }
        Relationships: []
      }
      user_role_context: {
        Row: {
          active_role: Database["public"]["Enums"]["user_role"]
          id: string
          session_data: Json | null
          updated_at: string
          user_id: string
        }
        Insert: {
          active_role: Database["public"]["Enums"]["user_role"]
          id?: string
          session_data?: Json | null
          updated_at?: string
          user_id: string
        }
        Update: {
          active_role?: Database["public"]["Enums"]["user_role"]
          id?: string
          session_data?: Json | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_role_context_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          is_primary: boolean
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_primary?: boolean
          role: Database["public"]["Enums"]["user_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_primary?: boolean
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_skills: {
        Row: {
          created_at: string | null
          id: string
          proficiency_level: number | null
          skill_id: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          proficiency_level?: number | null
          skill_id?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          proficiency_level?: number | null
          skill_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_skills_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "user_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_interview_conflicts: {
        Args: {
          p_interviewer_id: string
          p_start_time: string
          p_end_time: string
          p_exclude_interview_id?: string
        }
        Returns: boolean
      }
      get_upcoming_interviews: {
        Args: { reminder_hours?: number }
        Returns: {
          interview_id: string
          interviewer_id: string
          interviewee_id: string
          scheduled_at: string
          interview_type: string
          meeting_link: string
          location: string
        }[]
      }
    }
    Enums: {
      user_role:
        | "job_seeker"
        | "talent_scout"
        | "skill_vendor"
        | "event_organizer"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      user_role: [
        "job_seeker",
        "talent_scout",
        "skill_vendor",
        "event_organizer",
      ],
    },
  },
} as const
