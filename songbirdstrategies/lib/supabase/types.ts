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
      users: {
        Row: {
          id: string
          email: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_preferences: {
        Row: {
          id: string
          user_id: string
          marketing_opt_in: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          marketing_opt_in?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          marketing_opt_in?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      content_generations: {
        Row: {
          id: string
          user_id: string | null
          audience: string
          goal: string
          tone: string
          content_type: string
          additional_context: string | null
          generated_content: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          audience: string
          goal: string
          tone: string
          content_type: string
          additional_context?: string | null
          generated_content: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          audience?: string
          goal?: string
          tone?: string
          content_type?: string
          additional_context?: string | null
          generated_content?: string
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}