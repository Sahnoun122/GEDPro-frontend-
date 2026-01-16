"use client";
import { useAuthStore } from "@/stores/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

export default function DashboardPage() {
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  useEffect(() => {
    if (!user || user.role !== "admin_rh") router.push("/login");
  }, [user]);

  return (
    <div className="w-full">
      <nav className="w-full bg-blue-600 text-white shadow-lg">
        <div className="w-full px-4">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-8">
              <h1 className="text-xl font-bold text-yellow-300">
                🏠 GEDPro-RH Admin
              </h1>

              <div className="flex space-x-4">
                <Link
                  href="/dashboard"
                  className="bg-blue-700 px-4 py-2 rounded-md transition-colors text-sm font-bold border-2 border-yellow-400"
                >
                  📊 Dashboard
                </Link>

                <Link
                  href="/formulaires"
                  className="hover:bg-blue-700 px-4 py-2 rounded-md transition-colors text-sm font-bold"
                >
                  👥 formulaires
                </Link>
                <Link
                  href="/documents"
                  className="hover:bg-blue-700 px-4 py-2 rounded-md transition-colors text-sm font-bold"
                >
                  documents
                </Link>
                <Link
                  href="/utilisateurs"
                  className="hover:bg-blue-700 px-4 py-2 rounded-md transition-colors text-sm font-bold"
                >
                  👥 Utilisateurs
                </Link>
                <Link
                  href="/candidats"
                  className="hover:bg-blue-700 px-4 py-2 rounded-md transition-colors text-sm font-bold"
                >
                  👤 Candidats
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm font-bold">
                👋 {user?.firstname} {user?.lastname}
              </span>
              <button
                onClick={() => {
                  useAuthStore.getState().logout();
                  router.push("/login");
                }}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-md text-sm font-bold transition-colors"
              >
                🚪 Déconnexion
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="p-4">
        <h1 className="text-2xl font-bold">Dashboard Admin RH</h1>
        <p>Ici vous pouvez gérer les utilisateurs</p>
      </div>
    </div>
  );
}

