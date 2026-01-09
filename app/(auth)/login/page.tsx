"use client"
import { FormEvent , useState } from "react";
import { login } from "@/services/auth.service";
import Input from "@/components/auth/Input";
import Button from "@/components/auth/Button";
import { useRouter } from "next/navigation";

export default function Login(){
    const route = useRouter();

    const [error , setErorre]= useState("");

     async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault()
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
   const {access_token} = await login({email , password});
    localStorage.setItem("token" , access_token)
     route.push('/dashboard')
  } catch (err :any) {
    setErorre(err.message)
  }

    }


    return (
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-96 mx-auto mt-20"
      >
        {error && <p className="text-red-500">{error}</p>}
        <Input label="Email" name="email" type="email" required />
        <Input label="Mot de passe" name="password" type="password" required />
        <Button type="submit">Se connecter</Button>
      </form>
    );
}