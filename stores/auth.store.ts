import { create } from "zustand";
import { User } from "@/types/user";
import { decodeJWT, isTokenExpired } from "@/utils/jwt";

interface AuthState {
  token: string | null;
  user: User | null;
  login: (token: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  token: null,
  user: null,
  
  login: (token: string) => {
    const user = decodeJWT(token);
    if (user) {
      localStorage.setItem("token", token);
      set({ token, user });
    }
  },
  
  logout: () => {
    localStorage.removeItem("token");
    set({ token: null, user: null });
  },

  initializeAuth: () => {
    const token = localStorage.getItem("token");
    if (token && !isTokenExpired(token)) {
      const user = decodeJWT(token);
      if (user) {
        set({ token, user });
      } else {
        get().logout();
      }
    } else {
      get().logout();
    }
  },
}));
