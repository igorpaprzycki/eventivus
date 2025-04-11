export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string
          title: string
          description: string
          location: string
          created_by: string
          planning_mode: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          location: string
          created_by: string
          planning_mode?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          location?: string
          created_by?: string
          planning_mode?: boolean
          created_at?: string
        }
      }
      event_dates: {
        Row: {
          id: string
          event_id: string
          proposed_date: string
          created_at: string
        }
        Insert: {
          id?: string
          event_id: string
          proposed_date: string
          created_at?: string
        }
        Update: {
          id?: string
          event_id?: string
          proposed_date?: string
          created_at?: string
        }
      }
      votes: {
        Row: {
          id: string
          event_date_id: string
          user_id: string
          created_at: string
        }
        Insert: {
          id?: string
          event_date_id: string
          user_id: string
          created_at?: string
        }
        Update: {
          id?: string
          event_date_id?: string
          user_id?: string
          created_at?: string
        }
      }
    }
  }
}