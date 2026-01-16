"use client";

import { useState } from "react";
import UploadFileModal from "@/components/files/UploadFileModal";
import FileList from "@/components/files/FileList";

export default function DocumentsPage() {
  const [open, setOpen] = useState(false);
  const bucket = "documents";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Documents RH</h1>
        <button
          onClick={() => setOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Upload
        </button>
      </div>

      <FileList bucket={bucket} />

      {open && (
        <UploadFileModal
          bucket={bucket}
          onClose={() => setOpen(false)}
          onUploaded={() => window.location.reload()}
        />
      )}
    </div>
  );
}
