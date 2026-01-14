"use client";

import { useEffect, useState } from "react";
import { createField , getFormById } from "@/services/field.service";

enum FieldType {
  TEXT = "text",
  EMAIL = "email",
  NUMBER = "number",
  DATE = "date",
  SELECT = "select",
}

export default function FieldsModal({ form, onClose }: any) {
  const [fields, setFields] = useState<any[]>([]);
  const [label, setLabel] = useState("");
  const [type, setType] = useState<FieldType>(FieldType.TEXT);
  const [required, setRequired] = useState(false);

  useEffect(() => {
    getFormById(form.id).then((res) => {
      setFields(res.data.fields);
    });
  }, [form.id]);

  async function handleAddField() {
    const res = await createField(form.id, {
      label,
      type,
      required,
      order: fields.length + 1,
    });

    setFields([...fields, res.data]);
    setLabel("");
    setRequired(false);
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
      <div className="bg-white w-full max-w-lg rounded p-6">
        <h2 className="text-xl font-bold mb-4">Champs – {form.title}</h2>

        {/* FORM FIELD */}
        <div className="space-y-3">
          <input
            placeholder="Label"
            className="w-full border px-3 py-2 rounded"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />

          <select
            className="w-full border px-3 py-2 rounded"
            value={type}
            onChange={(e) => setType(e.target.value as FieldType)}
          >
            <option value="text">Texte</option>
            <option value="email">Email</option>
            <option value="number">Nombre</option>
            <option value="date">Date</option>
            <option value="select">Select</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={required}
              onChange={(e) => setRequired(e.target.checked)}
            />
            Champ obligatoire
          </label>

          <button
            onClick={handleAddField}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            + Ajouter champ
          </button>
        </div>

        {/* LIST */}
        <div className="mt-6">
          <h3 className="font-semibold mb-2">Champs existants</h3>
          <ul className="space-y-2">
            {fields.map((f) => (
              <li
                key={f.id}
                className="border p-2 rounded flex justify-between"
              >
                <span>
                  {f.label} ({f.type})
                </span>
                {f.required && <span className="text-red-600">*</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="text-right mt-6">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
