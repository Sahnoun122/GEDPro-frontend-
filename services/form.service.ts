import { api } from "@/lib/api";

export const getForm = async(data: any)=>{
    const res = await api.get('/forms' , data);
    return res.data
}

export const createForm = async(data: any)=>{
    return api.post('/forms', data);
}

export const updateForm = async(data:any , id: string)=>{
    return api.put(`forms/${id}` , data);
}

export const deleteForm= async(id:string)=>{
    return api.delete(`/forms/${id}`);
}