'use client';

import { useState, useEffect } from 'react';
import styles from './Menu.module.css';
import { MenuItem, MenuCategory, defaultMenuItems, defaultCategories } from '../types/menu';

export default function MenuPage() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    // Charger depuis localStorage ou utiliser les données par défaut
    const storedItems = localStorage.getItem('menuItems');
    const storedCategories = localStorage.getItem('menuCategories');

    if (storedItems) {
      setMenuItems(JSON.parse(storedItems));
    } else {
      setMenuItems(defaultMenuItems);
    }

    if (storedCategories) {
      setCategories(JSON.parse(storedCategories));
    } else {
      setCategories(defaultCategories);
    }
  }, []);

  const filteredItems =
    selectedCategory === 'all'
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  const itemsByCategory = categories.map((category) => ({
    ...category,
    items: menuItems.filter((item) => item.category === category.name && item.available),
  }));

  return (
    <div className={styles.menuPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Notre Menu</h1>
          <p className={styles.subtitle}>Découvrez notre sélection de plats du terroir</p>
        </header>

        <nav className={styles.categoriesNav}>
          <button
            className={`${styles.categoryBtn} ${selectedCategory === 'all' ? styles.active : ''}`}
            onClick={() => setSelectedCategory('all')}
          >
            Tout
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryBtn} ${selectedCategory === category.name ? styles.active : ''}`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.name}
            </button>
          ))}
        </nav>

        {selectedCategory === 'all' ? (
          // Afficher par catégories
          itemsByCategory.map(
            (category) =>
              category.items.length > 0 && (
                <section key={category.id} className={styles.categorySection}>
                  <h2 className={styles.categoryTitle}>{category.name}</h2>
                  <div className={styles.menuGrid}>
                    {category.items.map((item) => (
                      <div
                        key={item.id}
                        className={`${styles.menuItem} ${!item.available ? styles.unavailable : ''}`}
                      >
                        {!item.available && (
                          <span className={styles.unavailableBadge}>Indisponible</span>
                        )}
                        <h3 className={styles.itemName}>{item.name}</h3>
                        <p className={styles.itemDescription}>{item.description}</p>
                        <p className={styles.itemPrice}>{item.price.toFixed(2)} €</p>
                      </div>
                    ))}
                  </div>
                </section>
              )
          )
        ) : (
          // Afficher la catégorie sélectionnée
          <div className={styles.menuGrid}>
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.menuItem} ${!item.available ? styles.unavailable : ''}`}
                >
                  {!item.available && <span className={styles.unavailableBadge}>Indisponible</span>}
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemDescription}>{item.description}</p>
                  <p className={styles.itemPrice}>{item.price.toFixed(2)} €</p>
                </div>
              ))
            ) : (
              <div className={styles.emptyState}>Aucun plat disponible dans cette catégorie</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
