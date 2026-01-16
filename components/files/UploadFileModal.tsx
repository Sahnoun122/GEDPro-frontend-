"use client";

import { useState } from "react";
import { uploadFile } from "@/lib/files.api";

interface UploadFileModalProps {
  onClose: () => void;
  onUploaded: () => void;
  bucket?: string;
}

export default function UploadFileModal({ onClose, onUploaded, bucket = "documents" }: UploadFileModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleUpload() {
    if (!file) return;

    setLoading(true);
    try {
      await uploadFile(bucket, file);
      onUploaded();
      onClose();
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Upload document</h2>

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="mb-4"
        />

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Annuler
          </button>
          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Upload..." : "Uploader"}
          </button>
        </div>
      </div>
    </div>
  );
}
