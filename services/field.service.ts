import { api } from "@/lib/api";

export const createField = async (formId: string, data: any) => {
  return api.post(`/forms/${formId}`, data);
};

export const getFormById = (formId: string) => {
  return api.get(`/forms/${formId}`);
};