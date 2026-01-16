"use client";

import { useEffect, useState } from "react";
import { listFiles, deleteFile, downloadFile } from "@/lib/files.api";
import { FileItem } from "@/types/file";

interface FileListProps {
  bucket?: string;
}

export default function FileList({ bucket = "documents" }: FileListProps) {
  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    loadFiles();
  }, [bucket]);

  async function loadFiles() {
    try {
      const res = await listFiles(bucket);
      setFiles(res.data || []);
    } catch (error) {
      console.error('Error loading files:', error);
      setFiles([]);
    }
  }

  async function handleDelete(file: FileItem) {
    try {
      const fileName = file.name || file.filename || '';
      await deleteFile(bucket, fileName);
      loadFiles();
    } catch (error) {
      console.error('Error deleting file:', error);
    }
  }

  async function handleDownload(file: FileItem) {
    try {
      const fileName = file.name || file.filename || '';
      const res = await downloadFile(bucket, fileName);
      const blob = new Blob([res.data]);

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  }

  return (
    <div className="bg-white shadow rounded">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left">Nom</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file, index) => (
            <tr key={file.name || file.filename || index} className="border-t">
              <td className="p-3">{file.name || file.filename}</td>
              <td className="p-3 text-center space-x-3">
                <button
                  onClick={() => handleDownload(file)}
                  className="text-blue-600 underline"
                >
                  Télécharger
                </button>
                <button
                  onClick={() => handleDelete(file)}
                  className="text-red-600 underline"
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
