'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/app/components/admin/ToastProvider';
import Modal from '@/app/components/admin/Modal';
import ConfirmDialog from '@/app/components/admin/ConfirmDialog';

interface Dish {
  id: string;
  name: string;
  price: number;
  category: { name: string };
}

interface Menu {
  id: string;
  name: string;
  slug: string;
  description?: string;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  dishes: Dish[];
}

export default function MenusPage() {
  const [menus, setMenus] = useState<Menu[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMenu, setEditingMenu] = useState<Menu | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [isDishModalOpen, setIsDishModalOpen] = useState(false);
  const [selectedMenuId, setSelectedMenuId] = useState<string | null>(null);
  const [selectedDishes, setSelectedDishes] = useState<string[]>([]);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    startDate: '',
    endDate: '',
    isActive: false,
  });

  useEffect(() => {
    fetchMenus();
    fetchDishes();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await fetch('/api/menus');
      const data = await res.json();
      if (data.success) {
        setMenus(data.data);
      }
    } catch (error) {
      showToast('Erreur chargement menus', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchDishes = async () => {
    try {
      const res = await fetch('/api/dishes');
      const data = await res.json();
      if (data.success) {
        setDishes(data.data);
      }
    } catch (error) {
      console.error('Error loading dishes:', error);
    }
  };

  const handleOpenModal = (menu?: Menu) => {
    if (menu) {
      setEditingMenu(menu);
      setFormData({
        name: menu.name,
        slug: menu.slug,
        description: menu.description || '',
        startDate: menu.startDate.split('T')[0],
        endDate: menu.endDate ? menu.endDate.split('T')[0] : '',
        isActive: menu.isActive,
      });
    } else {
      setEditingMenu(null);
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        name: '',
        slug: '',
        description: '',
        startDate: today,
        endDate: '',
        isActive: false,
      });
    }
    setIsModalOpen(true);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const slug = formData.slug || generateSlug(formData.name);
    const payload = { ...formData, slug };

    try {
      const url = editingMenu ? `/api/menus/${editingMenu.id}` : '/api/menus';
      const method = editingMenu ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        showToast(
          editingMenu ? 'Menu modifié' : 'Menu créé',
          'success'
        );
        setIsModalOpen(false);
        fetchMenus();
      } else {
        showToast(data.error || 'Erreur', 'error');
      }
    } catch (error) {
      showToast('Erreur réseau', 'error');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/menus/${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        showToast('Menu supprimé', 'success');
        fetchMenus();
      } else {
        showToast(data.error || 'Erreur suppression', 'error');
      }
    } catch (error) {
      showToast('Erreur réseau', 'error');
    }
    setDeleteConfirm(null);
  };

  const handleActivate = async (id: string) => {
    try {
      const res = await fetch(`/api/menus/${id}/activate`, { method: 'POST' });
      const data = await res.json();

      if (data.success) {
        showToast('Menu activé', 'success');
        fetchMenus();
      } else {
        showToast(data.error || 'Erreur activation', 'error');
      }
    } catch (error) {
      showToast('Erreur réseau', 'error');
    }
  };

  const handleOpenDishModal = (menu: Menu) => {
    setSelectedMenuId(menu.id);
    setSelectedDishes(menu.dishes.map((d) => d.id));
    setIsDishModalOpen(true);
  };

  const handleSaveDishes = async () => {
    if (!selectedMenuId) return;

    try {
      const res = await fetch(`/api/menus/${selectedMenuId}/dishes`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dishIds: selectedDishes }),
      });

      const data = await res.json();

      if (data.success) {
        showToast('Plats mis à jour', 'success');
        setIsDishModalOpen(false);
        fetchMenus();
      } else {
        showToast(data.error || 'Erreur', 'error');
      }
    } catch (error) {
      showToast('Erreur réseau', 'error');
    }
  };

  const toggleDish = (dishId: string) => {
    setSelectedDishes((prev) =>
      prev.includes(dishId)
        ? prev.filter((id) => id !== dishId)
        : [...prev, dishId]
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <main className="container mx-auto p-6" role="main">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">📋 Gestion des Menus</h1>
        <button
          onClick={() => handleOpenModal()}
          className="btn btn-primary"
        >
          + Nouveau Menu
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className={`card bg-base-100 shadow-xl ${
              menu.isActive ? 'ring-2 ring-primary' : ''
            }`}
          >
            <div className="card-body">
              <div className="flex justify-between items-start">
                <h2 className="card-title">
                  {menu.name}
                  {menu.isActive && (
                    <div className="badge badge-primary">Actif</div>
                  )}
                </h2>
              </div>
              
              <p className="text-sm text-base-content/70">
                {menu.description || 'Aucune description'}
              </p>

              <div className="text-sm">
                <div>📅 Du {new Date(menu.startDate).toLocaleDateString()}</div>
                {menu.endDate && (
                  <div>au {new Date(menu.endDate).toLocaleDateString()}</div>
                )}
              </div>

              <div className="divider my-2">Plats ({menu.dishes.length})</div>

              <div className="max-h-40 overflow-y-auto space-y-1">
                {menu.dishes.length > 0 ? (
                  menu.dishes.map((dish) => (
                    <div key={dish.id} className="text-sm flex justify-between">
                      <span>{dish.name}</span>
                      <span className="text-primary font-medium">
                        {dish.price.toFixed(2)} €
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-base-content/50">
                    Aucun plat dans ce menu
                  </p>
                )}
              </div>

              <div className="card-actions justify-between mt-4">
                <div className="space-x-2">
                  <button
                    onClick={() => handleOpenModal(menu)}
                    className="btn btn-sm btn-ghost"
                  >
                    ✏️ Modifier
                  </button>
                  <button
                    onClick={() => handleOpenDishModal(menu)}
                    className="btn btn-sm btn-ghost"
                  >
                    🍴 Gérer plats
                  </button>
                </div>

                <div className="space-x-2">
                  {!menu.isActive && (
                    <button
                      onClick={() => handleActivate(menu.id)}
                      className="btn btn-sm btn-success"
                    >
                      ✓ Activer
                    </button>
                  )}
                  <button
                    onClick={() => setDeleteConfirm(menu.id)}
                    className="btn btn-sm btn-ghost text-error"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Menu Form Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMenu ? 'Modifier le Menu' : 'Nouveau Menu'}
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
                if (!editingMenu) {
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
                <span className="label-text">Date début *</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                value={formData.startDate}
                onChange={(e) =>
                  setFormData({ ...formData, startDate: e.target.value })
                }
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Date fin</span>
              </label>
              <input
                type="date"
                className="input input-bordered"
                value={formData.endDate}
                onChange={(e) =>
                  setFormData({ ...formData, endDate: e.target.value })
                }
              />
            </div>
          </div>

          <div className="form-control">
            <label className="label cursor-pointer">
              <span className="label-text">Activer ce menu</span>
              <input
                type="checkbox"
                className="checkbox"
                checked={formData.isActive}
                onChange={(e) =>
                  setFormData({ ...formData, isActive: e.target.checked })
                }
              />
            </label>
            <label className="label">
              <span className="label-text-alt">
                ℹ️ Activer ce menu désactivera automatiquement les autres
              </span>
            </label>
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => setIsModalOpen(false)}
            >
              Annuler
            </button>
            <button type="submit" className="btn btn-primary">
              {editingMenu ? 'Modifier' : 'Créer'}
            </button>
          </div>
        </form>
      </Modal>

      {/* Dishes Selection Modal */}
      <Modal
        isOpen={isDishModalOpen}
        onClose={() => setIsDishModalOpen(false)}
        title="Gérer les Plats du Menu"
      >
        <div className="space-y-4">
          <p className="text-sm text-base-content/70">
            Sélectionnez les plats à inclure dans ce menu
          </p>

          <div className="max-h-96 overflow-y-auto space-y-2">
            {dishes.map((dish) => (
              <div
                key={dish.id}
                className="flex items-center justify-between p-3 bg-base-200 rounded-lg"
              >
                <div>
                  <div className="font-medium">{dish.name}</div>
                  <div className="text-sm text-base-content/60">
                    {dish.category.name} • {dish.price.toFixed(2)} €
                  </div>
                </div>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedDishes.includes(dish.id)}
                  onChange={() => toggleDish(dish.id)}
                />
              </div>
            ))}
          </div>

          <div className="modal-action">
            <button
              type="button"
              className="btn"
              onClick={() => setIsDishModalOpen(false)}
            >
              Annuler
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSaveDishes}
            >
              Enregistrer ({selectedDishes.length} plats)
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deleteConfirm}
        onCancel={() => setDeleteConfirm(null)}
        onConfirm={() => deleteConfirm && handleDelete(deleteConfirm)}
        title="Supprimer le menu ?"
        message="Cette action est irréversible."
      />
    </main>
  );
}
