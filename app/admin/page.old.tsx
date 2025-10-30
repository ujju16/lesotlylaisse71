'use client';

import { useState, useEffect } from 'react';
import { getCategories, getMenus, getDishes, getReservations, Category, Menu, Dish, Reservation } from '@/lib/queries-admin';
import QRCode from 'qrcode';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'categories' | 'menus' | 'dishes' | 'qrcode' | 'reservations'>('qrcode');
  const [categories, setCategories] = useState<Category[]>([]);
  const [menus, setMenus] = useState<Menu[]>([]);
  const [dishes, setDishes] = useState<Dish[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [cats, menusData, dishesData, reservsData] = await Promise.all([
        getCategories(),
        getMenus(),
        getDishes(),
        getReservations(),
      ]);
      setCategories(cats);
      setMenus(menusData);
      setDishes(dishesData);
      setReservations(reservsData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
    setLoading(false);
  };

  const generateQRCode = async (menuSlug: string) => {
    const url = menuSlug === 'active' 
      ? `${window.location.origin}/menu`
      : `${window.location.origin}/menu/${menuSlug}`;
    const qrDataUrl = await QRCode.toDataURL(url, {
      width: 400,
      margin: 2,
      color: {
        dark: '#795548',
        light: '#FFFFFF',
      },
    });
    setQrCodeUrl(qrDataUrl);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      {/* Header */}
      <div className="navbar bg-primary text-primary-content shadow-lg">
        <div className="flex-1">
          <h1 className="text-2xl font-bold ml-4">🍽️ LeSotLyLaisse71 - Admin</h1>
        </div>
        <div className="flex-none">
          <a href="/" className="btn btn-ghost btn-sm">
            Retour au site
          </a>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-7xl">
        {/* Tabs */}
        <div className="tabs tabs-boxed bg-base-100 shadow-md mb-6 justify-center flex-wrap gap-2">
          <button 
            className={`tab tab-lg ${activeTab === 'qrcode' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('qrcode')}
          >
            📱 QR Code
          </button>
          <button 
            className={`tab tab-lg ${activeTab === 'categories' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('categories')}
          >
            📂 Catégories
          </button>
          <button 
            className={`tab tab-lg ${activeTab === 'menus' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('menus')}
          >
            📋 Menus
          </button>
          <button 
            className={`tab tab-lg ${activeTab === 'dishes' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('dishes')}
          >
            🍴 Plats
          </button>
          <button 
            className={`tab tab-lg ${activeTab === 'reservations' ? 'tab-active' : ''}`}
            onClick={() => setActiveTab('reservations')}
          >
            📅 Réservations
          </button>
        </div>

        {/* Content */}
        <div className="bg-base-100 rounded-lg shadow-xl p-6">
          {/* QR CODE TAB */}
          {activeTab === 'qrcode' && (
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">📱 Générateur de QR Code Dynamique</h2>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <div className="card bg-primary/10 p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                      <span className="text-2xl">💡</span> Comment ça marche ?
                    </h3>
                    <ul className="space-y-2 text-base-content/80">
                      <li className="flex gap-2">
                        <span>1️⃣</span>
                        <span>Générez un QR code unique pour votre restaurant</span>
                      </li>
                      <li className="flex gap-2">
                        <span>2️⃣</span>
                        <span>Imprimez-le et placez-le sur vos tables</span>
                      </li>
                      <li className="flex gap-2">
                        <span>3️⃣</span>
                        <span>Changez de menu actif quand vous voulez dans Hygraph</span>
                      </li>
                      <li className="flex gap-2">
                        <span>4️⃣</span>
                        <span>Le QR code affiche automatiquement le bon menu !</span>
                      </li>
                    </ul>
                  </div>

                  <div className="form-control mb-4">
                    <label className="label">
                      <span className="label-text font-semibold">Option 1 : Sélectionnez un menu spécifique</span>
                    </label>
                    <select 
                      className="select select-bordered select-primary"
                      onChange={(e) => e.target.value && generateQRCode(e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>Choisir un menu</option>
                      {menus.map((menu) => (
                        <option key={menu.id} value={menu.slug}>
                          {menu.name} {menu.active ? '✅ (Actif)' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="divider">OU</div>

                  <button 
                    className="btn btn-secondary btn-block btn-lg"
                    onClick={() => generateQRCode('active')}
                  >
                    <span className="text-xl">📱</span>
                    Générer QR Code Dynamique (Recommandé)
                  </button>
                  <p className="text-sm text-center mt-2 text-base-content/60">
                    Ce QR code affichera toujours le menu actif configuré dans Hygraph
                  </p>

                  <div className="alert alert-success mt-6 shadow-md">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    <div>
                      <div className="font-bold">Astuce Pro</div>
                      <div className="text-sm">Utilisez le QR code dynamique pour un seul code qui s&apos;adapte automatiquement à vos changements de menu !</div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center">
                  {qrCodeUrl ? (
                    <div className="card bg-base-200 shadow-2xl p-8">
                      <img src={qrCodeUrl} alt="QR Code Menu" className="w-full max-w-sm rounded-lg" />
                      <div className="card-actions justify-center mt-6 flex-col gap-2">
                        <a 
                          href={qrCodeUrl} 
                          download="lesotly-menu-qrcode.png"
                          className="btn btn-primary btn-wide"
                        >
                          ⬇️ Télécharger PNG
                        </a>
                        <button 
                          className="btn btn-outline btn-wide"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = qrCodeUrl;
                            link.download = 'lesotly-menu-qrcode-print.png';
                            link.click();
                          }}
                        >
                          🖨️ Préparer pour impression
                        </button>
                      </div>
                      <div className="divider"></div>
                      <div className="text-center text-sm text-base-content/60">
                        <p className="font-semibold mb-1">Format recommandé pour l&apos;impression :</p>
                        <p>10x10 cm minimum • 300 DPI</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-base-content/50 p-12">
                      <div className="text-8xl mb-6">📱</div>
                      <p className="text-lg">Cliquez sur un bouton ci-contre</p>
                      <p className="text-sm">pour générer votre QR code</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* CATEGORIES TAB */}
          {activeTab === 'categories' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-primary">📂 Gestion des Catégories</h2>
                <a href="https://app.hygraph.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  ➕ Gérer dans Hygraph
                </a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((cat) => (
                  <div key={cat.id} className="card bg-base-200 shadow-md hover:shadow-xl transition-shadow">
                    <div className="card-body">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{cat.icon || '📂'}</div>
                        <div className="flex-1">
                          <h3 className="card-title text-primary">{cat.name}</h3>
                          <p className="text-sm text-base-content/70">{cat.description}</p>
                          <div className="badge badge-secondary mt-2">Ordre: {cat.order}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {categories.length === 0 && (
                <div className="alert alert-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>Aucune catégorie trouvée. Créez-en une dans Hygraph pour commencer !</span>
                </div>
              )}
            </div>
          )}

          {/* MENUS TAB */}
          {activeTab === 'menus' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-primary">📋 Gestion des Menus</h2>
                <a href="https://app.hygraph.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  ➕ Gérer dans Hygraph
                </a>
              </div>

              <div className="space-y-4">
                {menus.map((menu) => (
                  <div key={menu.id} className="card bg-base-200 shadow-md">
                    <div className="card-body">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h3 className="card-title text-primary text-2xl">{menu.name}</h3>
                          <p className="text-base-content/70 mt-2">{menu.description}</p>
                          <div className="flex gap-2 mt-3 flex-wrap">
                            <div className={`badge badge-lg ${menu.active ? 'badge-success' : 'badge-ghost'}`}>
                              {menu.active ? '✅ Menu Actif' : '⏸️ Inactif'}
                            </div>
                            <div className="badge badge-primary badge-lg">{menu.dishes?.length || 0} plats</div>
                          </div>
                        </div>
                        <button 
                          className="btn btn-secondary"
                          onClick={() => generateQRCode(menu.slug)}
                        >
                          📱 QR Code
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {menus.length === 0 && (
                <div className="alert alert-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>Aucun menu trouvé. Créez-en un dans Hygraph pour commencer !</span>
                </div>
              )}
            </div>
          )}

          {/* DISHES TAB */}
          {activeTab === 'dishes' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-bold text-primary">🍴 Gestion des Plats</h2>
                <a href="https://app.hygraph.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                  ➕ Gérer dans Hygraph
                </a>
              </div>

              <div className="overflow-x-auto">
                <table className="table table-zebra">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Nom</th>
                      <th>Catégorie</th>
                      <th>Prix</th>
                      <th>Disponible</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dishes.map((dish) => (
                      <tr key={dish.id}>
                        <td>
                          {dish.image?.url ? (
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <img src={dish.image.url} alt={dish.name} />
                              </div>
                            </div>
                          ) : (
                            <div className="w-12 h-12 bg-base-300 rounded flex items-center justify-center">🍽️</div>
                          )}
                        </td>
                        <td>
                          <div className="font-bold">{dish.name}</div>
                          <div className="text-sm opacity-50">{dish.description?.substring(0, 50)}...</div>
                        </td>
                        <td>
                          <div className="badge badge-secondary">{dish.category?.name}</div>
                        </td>
                        <td className="font-bold text-accent">{dish.price.toFixed(2)} €</td>
                        <td>
                          <input 
                            type="checkbox" 
                            checked={dish.available} 
                            className="toggle toggle-success" 
                            readOnly
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {dishes.length === 0 && (
                <div className="alert alert-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>Aucun plat trouvé. Ajoutez-en dans Hygraph pour commencer !</span>
                </div>
              )}
            </div>
          )}

          {/* RESERVATIONS TAB */}
          {activeTab === 'reservations' && (
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">📅 Réservations</h2>

              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Heure</th>
                      <th>Client</th>
                      <th>Contact</th>
                      <th>Personnes</th>
                      <th>Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res) => (
                      <tr key={res.id}>
                        <td>{new Date(res.date).toLocaleDateString('fr-FR')}</td>
                        <td className="font-semibold">{res.time}</td>
                        <td>
                          <div className="font-bold">{res.name}</div>
                          {res.message && (
                            <div className="text-sm opacity-50">{res.message.substring(0, 30)}...</div>
                          )}
                        </td>
                        <td>
                          <div className="text-sm">{res.email}</div>
                          <div className="text-sm">{res.phone}</div>
                        </td>
                        <td>
                          <div className="badge badge-lg">{res.guests} 👥</div>
                        </td>
                        <td>
                          <div className={`badge badge-lg ${
                            res.reservationStatus === 'confirmed' ? 'badge-success' :
                            res.reservationStatus === 'cancelled' ? 'badge-error' :
                            'badge-warning'
                          }`}>
                            {res.reservationStatus === 'confirmed' ? '✅ Confirmé' :
                             res.reservationStatus === 'cancelled' ? '❌ Annulé' :
                             '⏳ En attente'}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {reservations.length === 0 && (
                <div className="alert alert-info">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <span>Aucune réservation pour le moment.</span>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
