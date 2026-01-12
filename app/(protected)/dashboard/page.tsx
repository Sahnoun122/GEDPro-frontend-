"use client";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "admin_rh") router.push("/login");
  }, [user]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Dashboard Admin RH</h1>
      <p>Ici vous pouvez gérer les utilisateurs</p>
    </div>
  );
}
