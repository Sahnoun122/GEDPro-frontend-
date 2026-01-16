import { api } from "@/lib/api";

export const listFiles = (bucket: string) => {
  return api.get(`/minio/list/${bucket}`);
};

export const uploadFile = (bucket: string, file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("bucket", bucket);

  return api.post("/minio/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const downloadFile = (bucket: string, fileName: string) => {
  return api.get(`/minio/download/${bucket}/${fileName}`, {
    responseType: "blob",
  });
};

export const deleteFile = (bucket: string, fileName: string) => {
  return api.delete(`/minio/remove/${bucket}/${fileName}`);
};
