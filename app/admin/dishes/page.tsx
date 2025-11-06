"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useToast } from "@/app/components/admin/ToastProvider";
import { useUpload } from "@/app/components/admin/useUpload";
import Modal from "@/app/components/admin/Modal";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";

interface Category {
  id: string;
  name: string;
}

interface Dish {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  image?: { id: string; url: string };
  category: Category;
  allergens?: string;
  isAvailable: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
}

export default function DishesPage() {
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDish, setEditingDish] = useState<Dish | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const { uploadImage, uploading } = useUpload();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    price: 0,
    categoryId: "",
    allergens: "",
    isAvailable: true,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    imageId: "",
  });

  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    fetchDishes();
    fetchCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDishes = async () => {
    try {
      const res = await fetch("/api/dishes");
      const data = await res.json();
      if (data.success) {
        setDishes(data.data);
      }
    } catch {
      showToast("Erreur chargement plats", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/categories");
      const data = await res.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error: unknown) {
      console.error("Error loading categories:", error);
    }
  };

  const handleOpenModal = (dish?: Dish) => {
    if (dish) {
      setEditingDish(dish);
      setFormData({
        name: dish.name,
        slug: dish.slug,
        description: dish.description || "",
        price: dish.price,
        categoryId: dish.category.id,
        allergens: dish.allergens || "",
        isAvailable: dish.isAvailable,
        isVegetarian: dish.isVegetarian,
        isVegan: dish.isVegan,
        isGlutenFree: dish.isGlutenFree,
        imageId: dish.image?.id || "",
      });
      setImagePreview(dish.image?.url || "");
    } else {
      setEditingDish(null);
      setFormData({
        name: "",
        slug: "",
        description: "",
        price: 0,
        categoryId: categories[0]?.id || "",
        allergens: "",
        isAvailable: true,
        isVegetarian: false,
        isVegan: false,
        isGlutenFree: false,
        imageId: "",
      });
      setImagePreview("");
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    const result = await uploadImage(file);
    if (result.success && result.data) {
      setFormData({ ...formData, imageId: result.data.id });
      setImagePreview(result.data.url);
      showToast("Image uploadée", "success");
    } else {
      showToast("Erreur upload", "error");
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug = formData.slug || generateSlug(formData.name);
    const payload = { ...formData, slug };

    try {
      const url = editingDish ? `/api/dishes/${editingDish.id}` : "/api/dishes";
      const method = editingDish ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        showToast(editingDish ? "Plat modifié" : "Plat créé", "success");
        setIsModalOpen(false);
        fetchDishes();
      } else {
        showToast(data.error || "Erreur", "error");
      }
    } catch {
      showToast("Erreur réseau", "error");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/dishes/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (data.success) {
        showToast("Plat supprimé", "success");
        fetchDishes();
      } else {
        showToast(data.error || "Erreur suppression", "error");
      }
    } catch {
      showToast("Erreur réseau", "error");
    }
    setDeleteConfirm(null);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-6" role="main">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">🍴 Gestion des Plats</h1>
        <button onClick={() => handleOpenModal()} className="btn btn-primary">
          + Nouveau Plat
        </button>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {dishes.map((dish) => (
          <div key={dish.id} className="card bg-base-100 shadow-xl">
            {dish.image && (
              <figure className="relative h-48">
                <Image
                  src={dish.image.url}
                  alt={dish.name}
                  fill
                  className="object-cover"
                />
              </figure>
            )}
            <div className="card-body">
              <h2 className="card-title">
                {dish.name}
                {!dish.isAvailable && (
                  <div className="badge badge-error">Indisponible</div>
                )}
              </h2>
              <p className="text-base-content/70 text-sm">{dish.description}</p>
              <div className="flex flex-wrap gap-1">
                {dish.isVegetarian && (
                  <div className="badge badge-success">🌱 Végétarien</div>
                )}
                {dish.isVegan && (
                  <div className="badge badge-success">🥬 Vegan</div>
                )}
                {dish.isGlutenFree && (
                  <div className="badge badge-warning">🌾 Sans gluten</div>
                )}
              </div>
              <div className="text-2xl font-bold text-primary">
                {dish.price.toFixed(2)} €
              </div>
              <div className="card-actions justify-end">
                <button
                  onClick={() => handleOpenModal(dish)}
                  className="btn btn-sm btn-ghost"
                >
                  ✏️ Modifier
                </button>
                <button
                  onClick={() => setDeleteConfirm(dish.id)}
                  className="btn btn-sm btn-ghost text-error"
                >
                  🗑️ Supprimer
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingDish ? "Modifier le Plat" : "Nouveau Plat"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Nom *</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (!editingDish) {
                  setFormData({
                    ...formData,
                    name: e.target.value,
                    slug: generateSlug(e.target.value),
                  });
                }
              }}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Prix (€) *</span>
              </label>
              <input
                type="number"
                step="0.01"
                className="input input-bordered"
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Catégorie *</span>
              </label>
              <select
                className="select select-bordered"
                value={formData.categoryId}
                onChange={(e) =>
                  setFormData({ ...formData, categoryId: e.target.value })
                }
                required
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Allergènes</span>
            </label>
            <input
              type="text"
              className="input input-bordered"
              placeholder="Ex: gluten, lactose, fruits à coque"
              value={formData.allergens}
              onChange={(e) =>
                setFormData({ ...formData, allergens: e.target.value })
              }
            />
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Disponible</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.isAvailable}
                onChange={(e) =>
                  setFormData({ ...formData, isAvailable: e.target.checked })
                }
              />
            </label>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-xs">🌱 Végétarien</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-success checkbox-sm"
                  checked={formData.isVegetarian}
                  onChange={(e) =>
                    setFormData({ ...formData, isVegetarian: e.target.checked })
                  }
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-xs">🥬 Vegan</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-success checkbox-sm"
                  checked={formData.isVegan}
                  onChange={(e) =>
                    setFormData({ ...formData, isVegan: e.target.checked })
                  }
                />
              </label>
            </div>

            <div className="form-control">
              <label className="label cursor-pointer">
                <span className="label-text text-xs">🌾 Sans gluten</span>
                <input
                  type="checkbox"
                  className="checkbox checkbox-warning checkbox-sm"
                  checked={formData.isGlutenFree}
                  onChange={(e) =>
                    setFormData({ ...formData, isGlutenFree: e.target.checked })
                  }
                />
              </label>
            </div>
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input
              type="file"
              accept="image/*"
              className="file-input file-input-bordered"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleImageUpload(file);
              }}
              disabled={uploading}
            />
            {imagePreview && (
              <div className="relative mt-2 h-48 w-full">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="rounded object-cover"
                />
              </div>
            )}
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => setIsModalOpen(false)}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={uploading}
            >
              {uploading ? "Upload..." : editingDish ? "Modifier" : "Créer"}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onCancel={() => setDeleteConfirm(null)}
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
        title="Supprimer le plat ?"
        message="Cette action est irréversible."
      />
    </main>
  );
}
