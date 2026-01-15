import { api } from "@/lib/api";

export const uploadFile = (formData: FormData) => {
  return api.post("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getFiles = () => {
  return api.get("/files");
};

export const deleteFile = (id: string) => {
  return api.delete(`/files/${id}`);
};

export const downloadFile = (id: string) => {
  return api.get(`/files/${id}/download`, {
    responseType: "blob",
  });
};
