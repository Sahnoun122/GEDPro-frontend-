import { json } from "stream/consumers";

const URL_API = "http://localhost/3000";

export async function regester(data: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  organisation_name: string;
}) {

    const res = await fetch(`${URL_API}/register`,{
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(data)    });

        if(!res.ok){
            const errore = await res.json();
             throw new Error(errore.message || "register pas bien")
        }
  
        return res.json();
}

export async function login(data : {email : string , password : string }) {
    const res = await fetch(`${URL_API}/login`, {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify(data)    });

        if(!res.ok){
            const errore = await res.json();
            throw new Error(errore.message || "login pas bien ");
        
        }

        return res.json();
    
}

