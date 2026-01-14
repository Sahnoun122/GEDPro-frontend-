"use client";

import { useEffect, useState } from "react";
import { getForm } from "@/services/form.service";
import FormModal from "@/components/forms/FormModal";

export default function FormsPage() {
  const [forms, setForms] = useState([]);
  const [open, setOpen] = useState(false);

  async function load() {
    const data = await getForm();
    setForms(data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="p-6">
      <button
        className="bg-green-600 text-white px-4 py-2"
        onClick={() => setOpen(true)}
      >
        ➕ Nouveau Form
      </button>

      <ul className="mt-4">
        {forms.map((f: any) => (
          <li key={f.id} className="border p-2 mb-2">
            {f.title}
          </li>
        ))}
      </ul>

      <FormModal open={open} onClose={() => setOpen(false)} reload={load} />
    </div>
  );
}
