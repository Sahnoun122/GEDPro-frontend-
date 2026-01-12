
export type User = {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: "admin_rh" | "rh" | "manager";
  organisation_id?: string; 
};
