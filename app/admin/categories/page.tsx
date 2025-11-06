<<<<<<< HEAD
"use client";

import { useState } from "react";
import Image from "next/image";
import { useCategories } from "@/app/components/admin/useCategories";
import { useUpload } from "@/app/components/admin/useUpload";
import { useToast } from "@/app/components/admin/ToastProvider";
import Modal from "@/app/components/admin/Modal";
import ConfirmDialog from "@/app/components/admin/ConfirmDialog";
import type { Category } from "@/lib/types";

export default function CategoriesPage() {
  const {
    categories,
    loading,
    createCategory,
    updateCategory,
    deleteCategory,
  } = useCategories();
=======
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCategories } from '@/app/components/admin/useCategories';
import { useUpload } from '@/app/components/admin/useUpload';
import { useToast } from '@/app/components/admin/ToastProvider';
import Modal from '@/app/components/admin/Modal';
import ConfirmDialog from '@/app/components/admin/ConfirmDialog';
import type { Category } from '@/lib/types';

export default function CategoriesPage() {
  const { categories, loading, createCategory, updateCategory, deleteCategory } = useCategories();
>>>>>>> origin/main
  const { uploadImage, uploading } = useUpload();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
<<<<<<< HEAD
    name: "",
    slug: "",
    description: "",
    order: 0,
    icon: "",
    imageId: "",
  });

  const [imagePreview, setImagePreview] = useState<string>("");
=======
    name: '',
    slug: '',
    description: '',
    order: 0,
    icon: '',
    imageId: '',
  });

  const [imagePreview, setImagePreview] = useState<string>('');
>>>>>>> origin/main

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
<<<<<<< HEAD
        description: category.description || "",
        order: category.order,
        icon: category.icon || "",
        imageId: category.image?.id || "",
      });
      setImagePreview(category.image?.url || "");
    } else {
      setEditingCategory(null);
      setFormData({
        name: "",
        slug: "",
        description: "",
        order: categories.length,
        icon: "",
        imageId: "",
      });
      setImagePreview("");
=======
        description: category.description || '',
        order: category.order,
        icon: category.icon || '',
        imageId: category.image?.id || '',
      });
      setImagePreview(category.image?.url || '');
    } else {
      setEditingCategory(null);
      setFormData({
        name: '',
        slug: '',
        description: '',
        order: categories.length,
        icon: '',
        imageId: '',
      });
      setImagePreview('');
>>>>>>> origin/main
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    const result = await uploadImage(file);
    if (result.success && result.data) {
      setFormData({ ...formData, imageId: result.data.id });
      setImagePreview(result.data.url);
<<<<<<< HEAD
      showToast("Image uploadée", "success");
    } else {
      showToast("Erreur upload", "error");
=======
      showToast('Image uploadée', 'success');
    } else {
      showToast('Erreur upload', 'error');
>>>>>>> origin/main
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
<<<<<<< HEAD
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
=======
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
>>>>>>> origin/main
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
<<<<<<< HEAD
    if (!formData.name || !formData.slug)
      return showToast("Nom et slug requis", "error");
=======
    if (!formData.name || !formData.slug) return showToast('Nom et slug requis', 'error');
>>>>>>> origin/main

    const result = editingCategory
      ? await updateCategory(editingCategory.id, formData)
      : await createCategory(formData as any);

    if (result.success) {
<<<<<<< HEAD
      showToast(editingCategory ? "Modifié" : "Créé", "success");
      setIsModalOpen(false);
    } else {
      showToast(result.error || "Erreur", "error");
=======
      showToast(editingCategory ? 'Modifié' : 'Créé', 'success');
      setIsModalOpen(false);
    } else {
      showToast(result.error || 'Erreur', 'error');
>>>>>>> origin/main
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    const result = await deleteCategory(deleteConfirm);
<<<<<<< HEAD
    if (result.success) showToast("Supprimé", "success");
=======
    if (result.success) showToast('Supprimé', 'success');
>>>>>>> origin/main
    setDeleteConfirm(null);
  };

  if (loading) {
    return (
<<<<<<< HEAD
      <div className="bg-base-200 flex min-h-screen items-center justify-center">
=======
      <div className="flex min-h-screen items-center justify-center bg-base-200">
>>>>>>> origin/main
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
<<<<<<< HEAD
    <div className="bg-base-200 min-h-screen p-6">
=======
    <div className="min-h-screen bg-base-200 p-6">
>>>>>>> origin/main
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-primary">📂 Catégories</h1>
<<<<<<< HEAD
            <p className="text-base-content/70 mt-1">
              Gérez les catégories de votre menu
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="btn btn-primary gap-2"
          >
=======
            <p className="mt-1 text-base-content/70">Gérez les catégories de votre menu</p>
          </div>
          <button onClick={() => handleOpenModal()} className="btn btn-primary gap-2">
>>>>>>> origin/main
            ➕ Nouvelle Catégorie
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => (
            <div
              key={cat.id}
              className="card bg-base-100 shadow-md transition-shadow hover:shadow-xl"
            >
              <div className="card-body">
                {cat.image?.url && (
                  <figure className="relative mb-4 h-32 w-full">
                    <Image
                      src={cat.image.url}
                      alt={cat.name}
                      fill
                      className="rounded-lg object-cover"
                      unoptimized
                    />
                  </figure>
                )}
                <div className="flex items-start gap-3">
<<<<<<< HEAD
                  <div className="text-4xl">{cat.icon || "📂"}</div>
                  <div className="flex-1">
                    <h3 className="card-title text-primary">{cat.name}</h3>
                    <p className="text-base-content/70 mt-1 text-sm">
                      {cat.description}
                    </p>
                    <div className="badge badge-secondary mt-2">
                      Ordre: {cat.order}
                    </div>
=======
                  <div className="text-4xl">{cat.icon || '📂'}</div>
                  <div className="flex-1">
                    <h3 className="card-title text-primary">{cat.name}</h3>
                    <p className="mt-1 text-sm text-base-content/70">{cat.description}</p>
                    <div className="badge badge-secondary mt-2">Ordre: {cat.order}</div>
>>>>>>> origin/main
                  </div>
                </div>
                <div className="card-actions mt-4 justify-end">
                  <button
                    onClick={() => handleOpenModal(cat)}
                    className="btn btn-ghost btn-sm text-primary"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(cat.id)}
                    className="btn btn-ghost btn-sm text-error"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {categories.length === 0 && (
          <div className="alert alert-info">
            <span>Aucune catégorie. Créez-en une pour commencer !</span>
          </div>
        )}

        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
<<<<<<< HEAD
          title={editingCategory ? "Modifier" : "Nouvelle catégorie"}
=======
          title={editingCategory ? 'Modifier' : 'Nouvelle catégorie'}
>>>>>>> origin/main
          size="lg"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Nom *</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                    slug: generateSlug(e.target.value),
                  })
                }
                className="input input-bordered input-primary"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Slug *</span>
              </label>
              <input
                type="text"
                value={formData.slug}
<<<<<<< HEAD
                onChange={(e) =>
                  setFormData({ ...formData, slug: e.target.value })
                }
=======
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
>>>>>>> origin/main
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Description</span>
              </label>
              <textarea
                value={formData.description}
<<<<<<< HEAD
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
=======
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
>>>>>>> origin/main
                className="textarea textarea-bordered"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Ordre *</span>
                </label>
                <input
                  type="number"
                  value={formData.order}
<<<<<<< HEAD
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value),
                    })
                  }
=======
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
>>>>>>> origin/main
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Icône</span>
                </label>
                <input
                  type="text"
                  value={formData.icon}
<<<<<<< HEAD
                  onChange={(e) =>
                    setFormData({ ...formData, icon: e.target.value })
                  }
=======
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
>>>>>>> origin/main
                  className="input input-bordered"
                  placeholder="🥗"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Image</span>
              </label>
              <div
<<<<<<< HEAD
                className="border-base-300 cursor-pointer rounded-lg border-2 border-dashed p-6 text-center hover:border-primary"
                onClick={() => document.getElementById("imageInput")?.click()}
=======
                className="cursor-pointer rounded-lg border-2 border-dashed border-base-300 p-6 text-center hover:border-primary"
                onClick={() => document.getElementById('imageInput')?.click()}
>>>>>>> origin/main
              >
                {uploading ? (
                  <span className="loading loading-spinner"></span>
                ) : imagePreview ? (
                  <div className="relative mx-auto h-48 w-full">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="rounded-lg object-contain"
                      unoptimized
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
<<<<<<< HEAD
                        setImagePreview("");
                        setFormData({ ...formData, imageId: "" });
=======
                        setImagePreview('');
                        setFormData({ ...formData, imageId: '' });
>>>>>>> origin/main
                      }}
                      className="btn btn-circle btn-error btn-sm absolute right-2 top-2"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <p className="text-base-content/70">Cliquez pour uploader</p>
                )}
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                  className="hidden"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
<<<<<<< HEAD
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="btn btn-ghost"
              >
                Annuler
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                disabled={uploading}
              >
                {editingCategory ? "Modifier" : "Créer"}
=======
              <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-ghost">
                Annuler
              </button>
              <button type="submit" className="btn btn-primary" disabled={uploading}>
                {editingCategory ? 'Modifier' : 'Créer'}
>>>>>>> origin/main
              </button>
            </div>
          </form>
        </Modal>

        <ConfirmDialog
          isOpen={!!deleteConfirm}
          title="Supprimer"
          message="Supprimer cette catégorie ?"
          confirmText="Supprimer"
          onConfirm={handleDelete}
          onCancel={() => setDeleteConfirm(null)}
          type="danger"
        />
      </div>
    </div>
  );
}
