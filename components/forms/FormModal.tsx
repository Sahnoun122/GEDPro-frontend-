"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import { createForm } from "@/services/form.service";
import { createField } from "@/services/field.service";

export default function FormModal({ open, onClose, reload }: any) {
  const [formId, setFormId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleCreateForm() {
    const res = await createForm({
      title,
      description,
      isActive: true,
    });
    setFormId(res.data.id);
  }

  async function handleAddField(e: any) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    await createField(formId!, {
      label: fd.get("label"),
      type: fd.get("type"),
      required: fd.get("required") === "on",
      order: 1,
      options: fd.get("options")?.toString().split(","),
    });

    e.currentTarget.reset();
  }

  return (
    <Modal isOpen={open} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Créer Form</h2>

      {!formId ? (
        <>
          <input
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <textarea
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full mb-2"
          />
          <button
            onClick={handleCreateForm}
            className="bg-blue-600 text-white px-4 py-2"
          >
            Créer Form
          </button>
        </>
      ) : (
        <>
          <h3 className="font-bold mt-4">Ajouter Field</h3>

          <form onSubmit={handleAddField} className="space-y-2">
            <input
              name="label"
              placeholder="Label"
              className="border p-2 w-full"
            />
            <select name="type" className="border p-2 w-full">
              <option value="text">Text</option>
              <option value="email">Email</option>
              <option value="number">Number</option>
              <option value="select">Select</option>
            </select>
            <input name="options" placeholder="opt1,opt2" />
            <label>
              <input type="checkbox" name="required" /> Required
            </label>
            <button className="bg-green-600 text-white px-4 py-2">
              Ajouter Field
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}
