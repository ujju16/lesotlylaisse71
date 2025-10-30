'use client';

import { useState, useEffect } from 'react';
import styles from './Admin.module.css';
import { MenuItem, MenuCategory, defaultMenuItems, defaultCategories } from '../types/menu';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'items' | 'categories'>('items');
  
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    available: true,
  });

  useEffect(() => {
    // Vérifier si déjà authentifié
    const auth = sessionStorage.getItem('adminAuth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      loadData();
    }
  }, []);

  const loadData = () => {
    const storedItems = localStorage.getItem('menuItems');
    const storedCategories = localStorage.getItem('menuCategories');

    if (storedItems) {
      setMenuItems(JSON.parse(storedItems));
    } else {
      setMenuItems(defaultMenuItems);
      localStorage.setItem('menuItems', JSON.stringify(defaultMenuItems));
    }

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(defaultCategories);
      localStorage.setItem('menuCategories', JSON.stringify(defaultCategories));
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mot de passe simple (à changer en production avec vrai backend)
    if (password === 'admin123') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true');
      loadData();
    } else {
      alert('Mot de passe incorrect');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('adminAuth');
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingItem) {
      // Mise à jour
      const updatedItems = menuItems.map(item =>
        item.id === editingItem.id
          ? { ...editingItem, ...formData, price: parseFloat(formData.price) }
          : item
      );
      setMenuItems(updatedItems);
      localStorage.setItem('menuItems', JSON.stringify(updatedItems));
      setEditingItem(null);
    } else {
      // Nouveau plat
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: formData.name,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        available: formData.available,
      };
      const updatedItems = [...menuItems, newItem];
      setMenuItems(updatedItems);
      localStorage.setItem('menuItems', JSON.stringify(updatedItems));
    }

    // Reset form
    setFormData({
      name: '',
      description: '',
      price: '',
      category: categories[0]?.name || '',
      available: true,
    });
  };

  const handleEditItem = (item: MenuItem) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      description: item.description,
      price: item.price.toString(),
      category: item.category,
      available: item.available,
    });
  };

  const handleDeleteItem = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce plat ?')) {
      const updatedItems = menuItems.filter(item => item.id !== id);
      setMenuItems(updatedItems);
      localStorage.setItem('menuItems', JSON.stringify(updatedItems));
    }
  };

  const handleToggleAvailability = (id: string) => {
    const updatedItems = menuItems.map(item =>
      item.id === id ? { ...item, available: !item.available } : item
    );
    setMenuItems(updatedItems);
    localStorage.setItem('menuItems', JSON.stringify(updatedItems));
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.adminPage}>
        <div className={styles.container}>
          <div className={styles.loginSection}>
            <h1 className={styles.title}>Administration</h1>
            <form className={styles.loginForm} onSubmit={handleLogin}>
              <h2>Connexion</h2>
              <input
                type="password"
                placeholder="Mot de passe"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button type="submit" className={styles.btnPrimary}>
                Se connecter
              </button>
              <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#718096' }}>
                Mot de passe par défaut : admin123
              </p>
            </form>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adminPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Administration du Menu</h1>
          <button onClick={handleLogout} className={styles.btnSecondary}>
            Déconnexion
          </button>
        </header>

        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === 'items' ? styles.active : ''}`}
            onClick={() => setActiveTab('items')}
          >
            Gestion des plats
          </button>
          <button
            className={`${styles.tab} ${activeTab === 'categories' ? styles.active : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            Catégories
          </button>
        </div>

        {activeTab === 'items' && (
          <>
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>
                {editingItem ? 'Modifier le plat' : 'Ajouter un plat'}
              </h2>
              <form className={styles.form} onSubmit={handleAddItem}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nom du plat</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Description</label>
                  <input
                    type="text"
                    className={styles.input}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Prix (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    className={styles.input}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.label}>Catégorie</label>
                  <select
                    className={styles.select}
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    required
                  >
                    {categories.map(cat => (
                      <option key={cat.id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={formData.available}
                      onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                    />
                    <span className={styles.label}>Disponible</span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button type="submit" className={styles.btnPrimary}>
                    {editingItem ? 'Mettre à jour' : 'Ajouter'}
                  </button>
                  {editingItem && (
                    <button
                      type="button"
                      className={styles.btnSecondary}
                      onClick={() => {
                        setEditingItem(null);
                        setFormData({
                          name: '',
                          description: '',
                          price: '',
                          category: categories[0]?.name || '',
                          available: true,
                        });
                      }}
                    >
                      Annuler
                    </button>
                  )}
                </div>
              </form>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Liste des plats ({menuItems.length})</h2>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Catégorie</th>
                    <th>Prix</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map(item => (
                    <tr key={item.id}>
                      <td>{item.name}</td>
                      <td>{item.category}</td>
                      <td>{item.price.toFixed(2)} €</td>
                      <td>
                        <span className={`${styles.badge} ${item.available ? styles.badgeSuccess : styles.badgeDanger}`}>
                          {item.available ? 'Disponible' : 'Indisponible'}
                        </span>
                      </td>
                      <td className={styles.actions}>
                        <button
                          className={`${styles.btnSmall} ${styles.btnEdit}`}
                          onClick={() => handleEditItem(item)}
                        >
                          Modifier
                        </button>
                        <button
                          className={`${styles.btnSmall} ${item.available ? styles.btnDanger : styles.btnEdit}`}
                          onClick={() => handleToggleAvailability(item.id)}
                        >
                          {item.available ? 'Désactiver' : 'Activer'}
                        </button>
                        <button
                          className={`${styles.btnSmall} ${styles.btnDelete}`}
                          onClick={() => handleDeleteItem(item.id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          </>
        )}

        {activeTab === 'categories' && (
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>Catégories</h2>
            <div className={styles.form}>
              {categories.map(cat => (
                <div key={cat.id} style={{ padding: '1rem', background: '#f7fafc', borderRadius: '8px' }}>
                  <strong>{cat.name}</strong>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
