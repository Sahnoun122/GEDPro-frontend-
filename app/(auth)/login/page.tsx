"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/services/auth.service";

import { decodeToken } from "@/utils/helpers";
import { useAuthStore } from "@/stores/auth.store";
import Input from "@/components/auth/Input";
import Button from "@/components/auth/Button";

export default function LoginPage() {
  const router = useRouter();
  const { login: saveAuth } = useAuthStore();
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const { access_token } = await login({
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      });

      const decoded = decodeToken(access_token);

      saveAuth(access_token, {
        id: decoded.sub,
        firstname: decoded.firstname || '',
        lastname: decoded.lastname || '',
        email: decoded.email || '',
        role: decoded.role,
        organisation_id: decoded.organisation_id,
      });

      if (decoded.role === "admin_rh") router.push("/dashboard");
      else if (decoded.role === "rh") router.push("/candidats");
      else router.push("/entretiens");
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-96 mx-auto mt-20 space-y-4">
      {error && <p className="text-red-500">{error}</p>}
      <Input label="Email" name="email" />
      <Input label="Mot de passe" name="password" type="password" />
      <Button type="submit">Connexion</Button>
    </form>
  );
}
