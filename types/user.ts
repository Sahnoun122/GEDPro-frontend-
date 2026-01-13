import { Organisation } from "./organisation";

export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "admin_rh" | "rh" | "manager";
  organisation?: Organisation;
  organisation_id?: string; 
  is_active?: boolean;
  created_at?: Date;
};
