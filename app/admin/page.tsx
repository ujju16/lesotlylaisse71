<<<<<<< HEAD
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
=======
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
>>>>>>> origin/main

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    categories: 0,
    dishes: 0,
    menus: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [categoriesRes, dishesRes, menusRes] = await Promise.all([
<<<<<<< HEAD
          fetch("/api/categories"),
          fetch("/api/dishes"),
          fetch("/api/menus"),
=======
          fetch('/api/categories'),
          fetch('/api/dishes'),
          fetch('/api/menus'),
>>>>>>> origin/main
        ]);

        const categories = await categoriesRes.json();
        const dishes = await dishesRes.json();
        const menus = await menusRes.json();

        setStats({
          categories: categories.data?.length || 0,
          dishes: dishes.data?.length || 0,
          menus: menus.data?.length || 0,
        });
      } catch (error) {
<<<<<<< HEAD
        console.error("Error fetching stats:", error);
=======
        console.error('Error fetching stats:', error);
>>>>>>> origin/main
      }
    };

    fetchStats();
  }, []);

  return (
    <main className="container mx-auto p-6" role="main">
      <div className="mb-8">
<<<<<<< HEAD
        <h1 className="mb-2 text-3xl font-bold">Tableau de Bord Admin</h1>
=======
        <h1 className="text-3xl font-bold mb-2">Tableau de Bord Admin</h1>
>>>>>>> origin/main
        <p className="text-base-content/70">
          Gérez votre restaurant LeSotLyLaisse71
        </p>
      </div>

      {/* Stats Cards */}
<<<<<<< HEAD
      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="stats bg-base-100 shadow">
=======
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="stats shadow bg-base-100">
>>>>>>> origin/main
          <div className="stat">
            <div className="stat-figure text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
<<<<<<< HEAD
                className="inline-block h-8 w-8 stroke-current"
=======
                className="inline-block w-8 h-8 stroke-current"
>>>>>>> origin/main
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
            <div className="stat-title">Catégories</div>
            <div className="stat-value text-primary">{stats.categories}</div>
            <div className="stat-desc">Catégories de plats</div>
          </div>
        </div>

<<<<<<< HEAD
        <div className="stats bg-base-100 shadow">
=======
        <div className="stats shadow bg-base-100">
>>>>>>> origin/main
          <div className="stat">
            <div className="stat-figure text-secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
<<<<<<< HEAD
                className="inline-block h-8 w-8 stroke-current"
=======
                className="inline-block w-8 h-8 stroke-current"
>>>>>>> origin/main
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                />
              </svg>
            </div>
            <div className="stat-title">Plats</div>
            <div className="stat-value text-secondary">{stats.dishes}</div>
            <div className="stat-desc">Plats disponibles</div>
          </div>
        </div>

<<<<<<< HEAD
        <div className="stats bg-base-100 shadow">
=======
        <div className="stats shadow bg-base-100">
>>>>>>> origin/main
          <div className="stat">
            <div className="stat-figure text-accent">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
<<<<<<< HEAD
                className="inline-block h-8 w-8 stroke-current"
=======
                className="inline-block w-8 h-8 stroke-current"
>>>>>>> origin/main
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="stat-title">Menus</div>
            <div className="stat-value text-accent">{stats.menus}</div>
            <div className="stat-desc">Menus configurés</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
<<<<<<< HEAD
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/categories"
          className="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl"
        >
          <div className="card-body">
            <h2 className="card-title">📂 Gérer les Catégories</h2>
=======
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/categories" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title">
              📂 Gérer les Catégories
            </h2>
>>>>>>> origin/main
            <p>Créer et organiser les catégories de votre menu</p>
            <div className="card-actions justify-end">
              <button className="btn btn-primary">Accéder</button>
            </div>
          </div>
        </Link>

<<<<<<< HEAD
        <Link
          href="/admin/dishes"
          className="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl"
        >
          <div className="card-body">
            <h2 className="card-title">🍴 Gérer les Plats</h2>
=======
        <Link href="/admin/dishes" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title">
              🍴 Gérer les Plats
            </h2>
>>>>>>> origin/main
            <p>Ajouter, modifier et gérer vos plats</p>
            <div className="card-actions justify-end">
              <button className="btn btn-secondary">Accéder</button>
            </div>
          </div>
        </Link>

<<<<<<< HEAD
        <Link
          href="/admin/menus"
          className="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl"
        >
          <div className="card-body">
            <h2 className="card-title">📋 Gérer les Menus</h2>
=======
        <Link href="/admin/menus" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title">
              📋 Gérer les Menus
            </h2>
>>>>>>> origin/main
            <p>Composer et activer vos menus</p>
            <div className="card-actions justify-end">
              <button className="btn btn-accent">Accéder</button>
            </div>
          </div>
        </Link>

<<<<<<< HEAD
        <Link
          href="/menu"
          className="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl"
        >
          <div className="card-body">
            <h2 className="card-title">👁️ Voir le Menu Public</h2>
=======
        <Link href="/menu" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title">
              👁️ Voir le Menu Public
            </h2>
>>>>>>> origin/main
            <p>Prévisualiser le menu tel que vos clients le voient</p>
            <div className="card-actions justify-end">
              <button className="btn btn-outline">Voir</button>
            </div>
          </div>
        </Link>

<<<<<<< HEAD
        <Link
          href="/reservations"
          className="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl"
        >
          <div className="card-body">
            <h2 className="card-title">📅 Réservations</h2>
=======
        <Link href="/reservations" className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow">
          <div className="card-body">
            <h2 className="card-title">
              📅 Réservations
            </h2>
>>>>>>> origin/main
            <p>Consulter les réservations en ligne</p>
            <div className="card-actions justify-end">
              <button className="btn btn-outline">Voir</button>
            </div>
          </div>
        </Link>

<<<<<<< HEAD
        <Link
          href="/admin/qrcode"
          className="card bg-base-100 shadow-xl transition-shadow hover:shadow-2xl"
        >
          <div className="card-body">
            <h2 className="card-title">📱 QR Code Menu</h2>
            <p>Générer et télécharger le QR code pour accès rapide au menu</p>
            <div className="card-actions justify-end">
              <button className="btn btn-outline">Générer</button>
            </div>
          </div>
        </Link>
=======
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              📱 QR Code Menu
            </h2>
            <p>Télécharger le QR code pour accès rapide au menu</p>
            <div className="card-actions justify-end">
              <button className="btn btn-outline">Bientôt</button>
            </div>
          </div>
        </div>
>>>>>>> origin/main
      </div>
    </main>
  );
}
