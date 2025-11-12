export type ProfileRole = "admin" | "viewer";

export type ProfileRecord = {
  id: string;
  role: ProfileRole;
  created_at: string;
  updated_at: string;
};
