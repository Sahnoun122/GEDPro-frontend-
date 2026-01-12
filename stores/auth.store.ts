import { create } from "zustand";
import { User } from "@/types/user";

export const useAuthStore = create<{
  token: string | null;
  user: User | null;
  login: (token: string, user: User) => void;
  logout: () => void;
}>((set) => ({
  token: null,
  user: null,
  login: (token, user) => {
    localStorage.setItem("token", token);
    set({ token, user });
  },
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },
}));
