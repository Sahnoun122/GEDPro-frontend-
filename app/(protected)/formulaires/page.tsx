"use client";

import { useEffect, useState } from "react";

type Form = {
  id: string;
  title: string;
  description?: string;
  isActive: boolean;
};

export default function FormulairesPage() {
  const [forms, setForms] = useState<Form[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    setForms([
      {
        id: "1",
        title: "Formulaire Recrutement",
        description: "Candidature développeur",
        isActive: true,
      },
    ]);
  }, []);

  function openModal() {
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setTitle("");
    setDescription("");
  }

  function handleCreateForm() {
    const newForm: Form = {
      id: Date.now().toString(),
      title,
      description,
      isActive: true,
    };

    setForms([...forms, newForm]);
    closeModal();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Gestion des Formulaires
        </h1>

        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nouveau formulaire
        </button>
      </div>

      {/* TABLE */}
      <div className="bg-white shadow rounded-lg">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 text-left">Titre</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((form) => (
              <tr key={form.id} className="border-t">
                <td className="p-3">{form.title}</td>
                <td className="p-3 text-gray-600">{form.description || "-"}</td>
                <td className="p-3">
                  {form.isActive ? (
                    <span className="text-green-600 font-medium">Actif</span>
                  ) : (
                    <span className="text-red-600 font-medium">Inactif</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Créer un formulaire</h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Titre du formulaire"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />

              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded px-3 py-2"
              />
            </div>

            <div className="flex justify-end gap-3 mt-6">
              <button onClick={closeModal} className="px-4 py-2 border rounded">
                Annuler
              </button>

              <button
                onClick={handleCreateForm}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Enregistrer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
