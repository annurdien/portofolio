import type { ProfileRole, ProfileRecord } from "./profile";
import type { ProjectLink, ProjectStatus } from "./project";

export type Database = {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string;
          slug: string;
          title: string;
          summary: string;
          description: string;
          tech: string[];
          links: ProjectLink[];
          category: string;
          year: number;
          status: ProjectStatus;
          featured: boolean;
          metrics: string | null;
          tags: string[] | null;
          image: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          summary: string;
          description: string;
          tech: string[];
          links: ProjectLink[];
          category: string;
          year: number;
          status: ProjectStatus;
          featured?: boolean;
          metrics?: string | null;
          tags?: string[] | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          summary?: string;
          description?: string;
          tech?: string[];
          links?: ProjectLink[];
          category?: string;
          year?: number;
          status?: ProjectStatus;
          featured?: boolean;
          metrics?: string | null;
          tags?: string[] | null;
          image?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: never[];
      };
      profiles: {
        Row: ProfileRecord;
        Insert: {
          id: string;
          role?: ProfileRole;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          role?: ProfileRole;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey";
            columns: ["id"];
            referencedRelation: "users";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: {};
    Functions: {};
    Enums: {};
    CompositeTypes: {};
  };
};
