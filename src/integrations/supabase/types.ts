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
      achievements: {
        Row: {
          created_at: string | null
          description: string
          icon: string | null
          id: string
          points: number
          premium_only: boolean | null
          requirement: number | null
          title: string
          type: Database["public"]["Enums"]["achievement_type"]
        }
        Insert: {
          created_at?: string | null
          description: string
          icon?: string | null
          id: string
          points?: number
          premium_only?: boolean | null
          requirement?: number | null
          title: string
          type: Database["public"]["Enums"]["achievement_type"]
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string | null
          id?: string
          points?: number
          premium_only?: boolean | null
          requirement?: number | null
          title?: string
          type?: Database["public"]["Enums"]["achievement_type"]
        }
        Relationships: []
      }
      content_creators: {
        Row: {
          bank_details: Json | null
          bio: string | null
          created_at: string | null
          current_badge: Database["public"]["Enums"]["creator_badge"] | null
          current_commission_rate: number | null
          id: string
          social_links: Json | null
          total_earnings: number | null
          total_ebooks_sold: number | null
          total_sales: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bank_details?: Json | null
          bio?: string | null
          created_at?: string | null
          current_badge?: Database["public"]["Enums"]["creator_badge"] | null
          current_commission_rate?: number | null
          id?: string
          social_links?: Json | null
          total_earnings?: number | null
          total_ebooks_sold?: number | null
          total_sales?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bank_details?: Json | null
          bio?: string | null
          created_at?: string | null
          current_badge?: Database["public"]["Enums"]["creator_badge"] | null
          current_commission_rate?: number | null
          id?: string
          social_links?: Json | null
          total_earnings?: number | null
          total_ebooks_sold?: number | null
          total_sales?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      creator_bundles: {
        Row: {
          commission_rate: number | null
          created_at: string | null
          creator_id: string
          id: string
          kit_id: string
        }
        Insert: {
          commission_rate?: number | null
          created_at?: string | null
          creator_id: string
          id?: string
          kit_id: string
        }
        Update: {
          commission_rate?: number | null
          created_at?: string | null
          creator_id?: string
          id?: string
          kit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "creator_bundles_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "content_creators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creator_bundles_kit_id_fkey"
            columns: ["kit_id"]
            isOneToOne: false
            referencedRelation: "kits"
            referencedColumns: ["id"]
          },
        ]
      }
      creator_ebooks: {
        Row: {
          commission_rate: number | null
          created_at: string | null
          creator_id: string
          ebook_id: number
          id: string
        }
        Insert: {
          commission_rate?: number | null
          created_at?: string | null
          creator_id: string
          ebook_id: number
          id?: string
        }
        Update: {
          commission_rate?: number | null
          created_at?: string | null
          creator_id?: string
          ebook_id?: number
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "creator_ebooks_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "content_creators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "creator_ebooks_ebook_id_fkey"
            columns: ["ebook_id"]
            isOneToOne: false
            referencedRelation: "ebooks"
            referencedColumns: ["id"]
          },
        ]
      }
      ebook_ratings: {
        Row: {
          comment: string | null
          created_at: string
          ebook_id: number
          id: string
          liked: boolean | null
          rating: number
          updated_at: string
          user_id: string
        }
        Insert: {
          comment?: string | null
          created_at?: string
          ebook_id: number
          id?: string
          liked?: boolean | null
          rating: number
          updated_at?: string
          user_id: string
        }
        Update: {
          comment?: string | null
          created_at?: string
          ebook_id?: number
          id?: string
          liked?: boolean | null
          rating?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "ebook_ratings_ebook_id_fkey"
            columns: ["ebook_id"]
            isOneToOne: false
            referencedRelation: "ebooks"
            referencedColumns: ["id"]
          },
        ]
      }
      ebooks: {
        Row: {
          audio_url: string | null
          author: string
          category: string
          cover: string | null
          created_at: string | null
          creator_id: string | null
          description: string | null
          difficulty: string | null
          downloads: number | null
          featured: boolean | null
          file_url: string | null
          id: number
          is_premium: boolean | null
          pages: number | null
          price: number | null
          rating: number | null
          reading_time: number | null
          title: string
          type: string | null
          updated_at: string | null
        }
        Insert: {
          audio_url?: string | null
          author: string
          category: string
          cover?: string | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          difficulty?: string | null
          downloads?: number | null
          featured?: boolean | null
          file_url?: string | null
          id?: number
          is_premium?: boolean | null
          pages?: number | null
          price?: number | null
          rating?: number | null
          reading_time?: number | null
          title: string
          type?: string | null
          updated_at?: string | null
        }
        Update: {
          audio_url?: string | null
          author?: string
          category?: string
          cover?: string | null
          created_at?: string | null
          creator_id?: string | null
          description?: string | null
          difficulty?: string | null
          downloads?: number | null
          featured?: boolean | null
          file_url?: string | null
          id?: number
          is_premium?: boolean | null
          pages?: number | null
          price?: number | null
          rating?: number | null
          reading_time?: number | null
          title?: string
          type?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ebooks_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "content_creators"
            referencedColumns: ["id"]
          },
        ]
      }
      favorites: {
        Row: {
          created_at: string | null
          ebook_id: number
          id: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          ebook_id: number
          id?: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          ebook_id?: number
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_ebook_id_fkey"
            columns: ["ebook_id"]
            isOneToOne: false
            referencedRelation: "ebooks"
            referencedColumns: ["id"]
          },
        ]
      }
      kits: {
        Row: {
          cover_image: string | null
          created_at: string
          creator_id: string | null
          description: string | null
          ebook_ids: number[] | null
          id: string
          is_premium: boolean | null
          price: number
          title: string
          updated_at: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          creator_id?: string | null
          description?: string | null
          ebook_ids?: number[] | null
          id?: string
          is_premium?: boolean | null
          price: number
          title: string
          updated_at?: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          creator_id?: string | null
          description?: string | null
          ebook_ids?: number[] | null
          id?: string
          is_premium?: boolean | null
          price?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "kits_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "content_creators"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          amount: number
          created_at: string
          currency: string | null
          id: string
          product_id: string
          product_type: string
          status: string | null
          stripe_session_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string | null
          id?: string
          product_id: string
          product_type: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string | null
          id?: string
          product_id?: string
          product_type?: string
          status?: string | null
          stripe_session_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          first_name: string | null
          id: string
          last_name: string | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      sales_analytics: {
        Row: {
          creator_id: string
          gross_amount: number
          id: string
          net_amount: number
          order_id: string
          platform_commission: number
          product_id: string
          product_type: string
          sale_date: string | null
        }
        Insert: {
          creator_id: string
          gross_amount: number
          id?: string
          net_amount: number
          order_id: string
          platform_commission: number
          product_id: string
          product_type: string
          sale_date?: string | null
        }
        Update: {
          creator_id?: string
          gross_amount?: number
          id?: string
          net_amount?: number
          order_id?: string
          platform_commission?: number
          product_id?: string
          product_type?: string
          sale_date?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sales_analytics_creator_id_fkey"
            columns: ["creator_id"]
            isOneToOne: false
            referencedRelation: "content_creators"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sales_analytics_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      subscriptions: {
        Row: {
          created_at: string
          current_period_end: string | null
          current_period_start: string | null
          id: string
          plan_type: string
          status: string | null
          stripe_customer_id: string | null
          stripe_subscription_id: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          current_period_end?: string | null
          current_period_start?: string | null
          id?: string
          plan_type?: string
          status?: string | null
          stripe_customer_id?: string | null
          stripe_subscription_id?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_achievements: {
        Row: {
          achievement_id: string
          completed: boolean | null
          completed_at: string | null
          created_at: string | null
          current_progress: number | null
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          current_progress?: number | null
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          completed?: boolean | null
          completed_at?: string | null
          created_at?: string | null
          current_progress?: number | null
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_stats: {
        Row: {
          bundles_purchased: number | null
          certificates_earned: number | null
          comments_posted: number | null
          created_at: string | null
          current_tier: string | null
          days_active: number | null
          ebooks_read: number | null
          id: string
          is_premium: boolean | null
          login_count: number | null
          role: Database["public"]["Enums"]["user_role"] | null
          streak_days: number | null
          total_points: number | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          bundles_purchased?: number | null
          certificates_earned?: number | null
          comments_posted?: number | null
          created_at?: string | null
          current_tier?: string | null
          days_active?: number | null
          ebooks_read?: number | null
          id?: string
          is_premium?: boolean | null
          login_count?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          streak_days?: number | null
          total_points?: number | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          bundles_purchased?: number | null
          certificates_earned?: number | null
          comments_posted?: number | null
          created_at?: string | null
          current_tier?: string | null
          days_active?: number | null
          ebooks_read?: number | null
          id?: string
          is_premium?: boolean | null
          login_count?: number | null
          role?: Database["public"]["Enums"]["user_role"] | null
          streak_days?: number | null
          total_points?: number | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_commission_rate: {
        Args: { badge: Database["public"]["Enums"]["creator_badge"] }
        Returns: number
      }
      calculate_creator_badge: {
        Args: { ebooks_sold: number }
        Returns: Database["public"]["Enums"]["creator_badge"]
      }
      get_creator_badge_progress: {
        Args: { user_uuid: string }
        Returns: {
          current_badge: Database["public"]["Enums"]["creator_badge"]
          current_sales: number
          current_commission_rate: number
          next_badge: Database["public"]["Enums"]["creator_badge"]
          next_badge_requirement: number
          sales_to_next_level: number
        }[]
      }
      get_creator_data: {
        Args: { user_uuid: string }
        Returns: {
          creator_id: string
          total_ebooks: number
          total_bundles: number
          can_create_bundles: boolean
        }[]
      }
      increment_ebook_downloads: {
        Args: { ebook_id: number }
        Returns: undefined
      }
      increment_user_ebooks_read: {
        Args: { user_uuid: string }
        Returns: undefined
      }
      is_creator: {
        Args: { user_uuid: string }
        Returns: boolean
      }
    }
    Enums: {
      achievement_type: "badge" | "medal"
      creator_badge:
        | "bronze"
        | "silver"
        | "copper"
        | "iron"
        | "gold"
        | "diamond"
        | "crown"
        | "rocket"
      user_role: "user" | "premium" | "creator" | "admin"
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
      achievement_type: ["badge", "medal"],
      creator_badge: [
        "bronze",
        "silver",
        "copper",
        "iron",
        "gold",
        "diamond",
        "crown",
        "rocket",
      ],
      user_role: ["user", "premium", "creator", "admin"],
    },
  },
} as const
