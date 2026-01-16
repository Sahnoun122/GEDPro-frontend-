export type FileItem = {
  name: string; // MinIO uses 'name' for filename
  size: number;
  lastModified: string;
  etag?: string;
  // Legacy properties for backward compatibility
  id?: string;
  filename?: string;
  mimetype?: string;
  url?: string;
  createdAt?: string;
};
