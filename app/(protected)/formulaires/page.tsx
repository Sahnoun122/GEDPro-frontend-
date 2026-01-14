"use client";

import { useEffect, useState } from "react";
import FieldsModal from "@/components/forms/FieldsModal";
import { api } from "@/lib/api";

type Form = {
  id: string;
  title: string;
  description?: string;
  isActive: boolean;
};

export default function FormulairesPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isFieldsModalOpen, setIsFieldsModalOpen] = useState(false);
  const [selectedForm, setSelectedForm] = useState<Form | null>(null);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // 🔹 Load forms from backend
  useEffect(() => {
    fetchForms();
  }, []);

  async function fetchForms() {
    const res = await api.get("/forms");
    setForms(res.data);
  }

  async function handleCreateForm() {
    await api.post("/forms", { title, description });
    setTitle("");
    setDescription("");
    setIsFormModalOpen(false);
    fetchForms();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des Formulaires</h1>
        <button
          onClick={() => setIsFormModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Nouveau formulaire
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Titre</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3">Statut</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id} className="border-t">
                <td className="p-3">{form.title}</td>
                <td className="p-3 text-gray-600">{form.description || "-"}</td>
                <td className="p-3 text-center">
                  {form.isActive ? "✅" : "❌"}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => {
                      setSelectedForm(form);
                      setIsFieldsModalOpen(true);
                    }}
                    className="text-blue-600 underline"
                  >
                    Gérer les champs
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL CREATE FORM */}
      {isFormModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-6 rounded w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Créer un formulaire</h2>

            <input
              className="w-full border p-2 mb-3"
              placeholder="Titre"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full border p-2 mb-4"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsFormModalOpen(false)}
                className="border px-4 py-2 rounded"
              >
                Annuler
              </button>
              <button
                onClick={handleCreateForm}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL FIELDS */}
      {isFieldsModalOpen && selectedForm && (
        <FieldsModal
          form={selectedForm}
          onClose={() => setIsFieldsModalOpen(false)}
        />
      )}
    </div>
  );
}
