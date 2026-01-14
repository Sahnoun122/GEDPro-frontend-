

import { http } from "./http.service";
import { User } from "@/types/user";


export async function login(data: { email: string; password: string }) {
  return http<{ access_token: string }>("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function createUser(data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role: "rh" | "manager";
}) {
  return http("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}


export async function getUsers(): Promise<User[]> {
  return http<User[]>("/users"); 
}

export async function deleteUser(id: string) {
  return http(`/users/${id}`, { method: "DELETE" });
}


export async function updateUser(id: string, data: any) {
  return http(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
  });
}

