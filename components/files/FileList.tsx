"use client";

import { useEffect, useState } from "react";
import { getFiles, deleteFile, downloadFile } from "@/lib/files.api";
import { FileItem } from "@/types/file";

export default function FileList() {
  const [files, setFiles] = useState<FileItem[]>([]);

  useEffect(() => {
    loadFiles();
  }, []);

  async function loadFiles() {
    const res = await getFiles();
    setFiles(res.data);
  }

  async function handleDelete(id: string) {
    await deleteFile(id);
    loadFiles();
  }

  async function handleDownload(file: FileItem) {
    const res = await downloadFile(file.id);
    const blob = new Blob([res.data]);

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = file.filename;
    link.click();
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
          {files.map((file) => (
            <tr key={file.id} className="border-t">
              <td className="p-3">{file.filename}</td>
              <td className="p-3 text-center space-x-3">
                <button
                  onClick={() => handleDownload(file)}
                  className="text-blue-600 underline"
                >
                  Télécharger
                </button>
                <button
                  onClick={() => handleDelete(file.id)}
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
