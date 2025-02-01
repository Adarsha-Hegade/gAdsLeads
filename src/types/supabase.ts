export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          name: string;
          phone: string;
          city: string;
          email: string | null;
          url_slugs: string[] | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          phone: string;
          city: string;
          email?: string | null;
          url_slugs?: string[] | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          phone?: string;
          city?: string;
          email?: string | null;
          url_slugs?: string[] | null;
          created_at?: string;
        };
      };
    };
  };
}