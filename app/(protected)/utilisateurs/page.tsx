"use client";

import { useEffect, useState } from "react";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "@/services/auth.service";
import { User } from "@/types/user";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [error, setError] = useState("");

  async function loadUsers() {
    const data = await getUsers();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  function openCreate() {
    setEditingUser(null);
    setModalOpen(true);
  }

  function openEdit(user: User) {
    setEditingUser(user);
    setModalOpen(true);
  }

  async function handleDelete(id: string) {
    if (confirm("Supprimer cet utilisateur ?")) {
      await deleteUser(id);
      loadUsers();
    }
  }
async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);

  const data: any = {
    firstname: formData.get("firstname") as string,
    lastname: formData.get("lastname") as string,
    email: formData.get("email") as string,
    role: formData.get("role") as "admin_rh" | "rh" | "manager",
  };

  if (!editingUser) {
    const password = formData.get("password") as string;
    if (!password) {
      setError("Le mot de passe est obligatoire");
      return;
    }
    data.password = password;
  }

  try {
    if (editingUser) {
      await updateUser(editingUser.id, data); 
    } else {
      await createUser(data); 
    }
    setModalOpen(false);
    loadUsers();
  } catch (err: any) {
    setError(err.message);
  }
}

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Gestion des utilisateurs</h1>
      <Button className="mb-4 bg-green-600" onClick={openCreate}>
        Ajouter utilisateur
      </Button>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Nom</th>
            <th className="p-2">Email</th>
            <th className="p-2">Role</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="p-2">
                {u.firstname} {u.lastname}
              </td>
              <td className="p-2">{u.email}</td>
              <td className="p-2">{u.role}</td>
              <td className="p-2 flex gap-2">
                <Button className="bg-yellow-500" onClick={() => openEdit(u)}>
                  Modifier
                </Button>
                <Button
                  className="bg-red-600"
                  onClick={() => handleDelete(u.id)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">
          {editingUser ? "Modifier utilisateur" : "Créer utilisateur"}
        </h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            label="Prénom"
            name="firstname"
            defaultValue={editingUser?.firstname}
          />
          <Input
            label="Nom"
            name="lastname"
            defaultValue={editingUser?.lastname}
          />
          <Input
            label="Email"
            name="email"
            type="email"
            defaultValue={editingUser?.email}
          />
          {!editingUser && (
            <Input label="Mot de passe" name="password" type="password" />
          )}
          <select
            name="role"
            className="border p-2 rounded w-full"
            defaultValue={editingUser?.role || ""}
            required
          >
            <option value="">Choisir un rôle</option>
            <option value="admin_rh">Admin RH</option>
            <option value="rh">RH</option>
            <option value="manager">Manager</option>
          </select>
          <div className="flex justify-end gap-2">
            <Button type="submit" className="bg-blue-600">
              {editingUser ? "Modifier" : "Créer"}
            </Button>
            <Button
              type="button"
              className="bg-gray-400"
              onClick={() => setModalOpen(false)}
            >
              Annuler
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
