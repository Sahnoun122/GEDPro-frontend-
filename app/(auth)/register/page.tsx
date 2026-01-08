"use client"

import { FormEvent , useState } from "react";
import { useRouter } from "next/router";
import { regester } from "@/services/auth.service";
import Input from "@/components/auth/Input";
import button from "@/components/auth/Button";

export default function Register(){

    const route = useRouter();
    const [error , setErorre] = useState("");

    async function handleSubmit(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formData = new FormData(e.currentTarget)

        const firstname = formData.get("firstname") as string;
        const lastname = formData.get("lastname") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const organisation_name = formData.get("organisation_name") as string;

        try {
            await regester({firstname , lastname , email , password , organisation_name});
            route.push('/register')
        } catch ( err: any) {
            setErorre(err.message);
        }
    }


    return (
      <form onSubmit={handleSubmit}>
        <Input label="firstname" name="firstname" type="text" required />
        <Input label="lasttname" name="lasttname" type="text" required />
        <Input label="email" name="email" type="email" required />
        <Input label="password" name="password" type="password" required />
        <Input
          label="organisation_name"
          name="organisation_name"
          type="password"
          required
        />
      </form>
    );
}