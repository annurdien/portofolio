export type ProjectActionState =
  | { success: true }
  | {
      success: false;
      error: string;
      issues?: Record<string, string[]>;
    };

export const initialProjectActionState: ProjectActionState = {
  success: false,
  error: "",
};
