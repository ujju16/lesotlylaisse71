'use client';

import { useState } from 'react';
import { useCategories } from '@/app/components/admin/useCategories';
import { useUpload } from '@/app/components/admin/useUpload';
import { useToast } from '@/app/components/admin/ToastProvider';
import Modal from '@/app/components/admin/Modal';
import ConfirmDialog from '@/app/components/admin/ConfirmDialog';

export default function CategoriesPage() {
  const { categories, loading, createCategory, updateCategory, deleteCategory } = useCategories();
  const { uploadImage, uploading } = useUpload();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    order: 0,
    icon: '',
    imageId: '',
  });

  const [imagePreview, setImagePreview] = useState<string>('');

  const handleOpenModal = (category?: Category) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        slug: category.slug,
        description: category.description || '',
        order: category.order,
        icon: category.icon || '',
        imageId: category.image?.id || '',
      });
      setImagePreview(category.image?.url || '');
    } else {
      setEditingCategory(null);
      setFormData({ name: '', slug: '', description: '', order: categories.length, icon: '', imageId: '' });
      setImagePreview('');
    }
    setIsModalOpen(true);
  };

  const handleImageUpload = async (file: File) => {
    const result = await uploadImage(file);
    if (result.success && result.data) {
      setFormData({ ...formData, imageId: result.data.id });
      setImagePreview(result.data.url);
      showToast('Image uploadée', 'success');
    } else {
      showToast('Erreur upload', 'error');
    }
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) return showToast('Nom et slug requis', 'error');

    const result = editingCategory
      ? await updateCategory(editingCategory.id, formData)
      : await createCategory(formData as any);

    if (result.success) {
      showToast(editingCategory ? 'Modifié' : 'Créé', 'success');
      setIsModalOpen(false);
    } else {
      showToast(result.error || 'Erreur', 'error');
    }
  };

  const handleDelete = async () => {
    if (!deleteConfirm) return;
    const result = await deleteCategory(deleteConfirm);
    if (result.success) showToast('Supprimé', 'success');
    setDeleteConfirm(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-primary">📂 Catégories</h1>
            <p className="text-base-content/70 mt-1">Gérez les catégories de votre menu</p>
          </div>
          <button onClick={() => handleOpenModal()} className="btn btn-primary gap-2">
            ➕ Nouvelle Catégorie
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow">
              <div className="card-body">
                {cat.image?.url && (
                  <figure className="mb-4">
                    <img src={cat.image.url} alt={cat.name} className="w-full h-32 object-cover rounded-lg" />
                  </figure>
                )}
                <div className="flex items-start gap-3">
                  <div className="text-4xl">{cat.icon || '📂'}</div>
                  <div className="flex-1">
                    <h3 className="card-title text-primary">{cat.name}</h3>
                    <p className="text-sm text-base-content/70 mt-1">{cat.description}</p>
                    <div className="badge badge-secondary mt-2">Ordre: {cat.order}</div>
                  </div>
                </div>
                <div className="card-actions justify-end mt-4">
                  <button onClick={() => handleOpenModal(cat)} className="btn btn-sm btn-ghost text-primary">✏️</button>
                  <button onClick={() => setDeleteConfirm(cat.id)} className="btn btn-sm btn-ghost text-error">🗑️</button>
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

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingCategory ? 'Modifier' : 'Nouvelle catégorie'} size="lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Nom *</span></label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: generateSlug(e.target.value) })} className="input input-bordered input-primary" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Slug *</span></label>
              <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} className="input input-bordered" required />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Description</span></label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="textarea textarea-bordered" rows={3} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Ordre *</span></label>
                <input type="number" value={formData.order} onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })} className="input input-bordered" required />
              </div>
              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Icône</span></label>
                <input type="text" value={formData.icon} onChange={(e) => setFormData({ ...formData, icon: e.target.value })} className="input input-bordered" placeholder="🥗" />
              </div>
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-semibold">Image</span></label>
              <div className="border-2 border-dashed border-base-300 rounded-lg p-6 text-center cursor-pointer hover:border-primary" onClick={() => document.getElementById('imageInput')?.click()}>
                {uploading ? <span className="loading loading-spinner"></span> : imagePreview ? (
                  <div className="relative"><img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg" /><button type="button" onClick={(e) => { e.stopPropagation(); setImagePreview(''); setFormData({ ...formData, imageId: '' }); }} className="absolute top-2 right-2 btn btn-circle btn-sm btn-error">✕</button></div>
                ) : <p className="text-base-content/70">Cliquez pour uploader</p>}
                <input id="imageInput" type="file" accept="image/*" onChange={(e) => { const file = e.target.files?.[0]; if (file) handleImageUpload(file); }} className="hidden" />
              </div>
            </div>
            <div className="flex justify-end gap-2 pt-4">
              <button type="button" onClick={() => setIsModalOpen(false)} className="btn btn-ghost">Annuler</button>
              <button type="submit" className="btn btn-primary" disabled={uploading}>{editingCategory ? 'Modifier' : 'Créer'}</button>
            </div>
          </form>
        </Modal>

        <ConfirmDialog isOpen={!!deleteConfirm} title="Supprimer" message="Supprimer cette catégorie ?" confirmText="Supprimer" onConfirm={handleDelete} onCancel={() => setDeleteConfirm(null)} type="danger" />
      </div>
    </div>
  );
}
