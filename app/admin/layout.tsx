import { ToastProvider } from '../components/admin/ToastProvider';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-base-200">
        <nav className="navbar bg-primary text-primary-content shadow-lg">
          <div className="flex-1">
            <a href="/admin" className="btn btn-ghost text-xl">🍽️ LeSotLyLaisse71 Admin</a>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li><a href="/admin/categories">📂 Catégories</a></li>
              <li><a href="/admin/dishes">🍴 Plats</a></li>
              <li><a href="/admin/menus">📋 Menus</a></li>
              <li><a href="/admin">📱 QR Code</a></li>
            </ul>
            <a href="/" className="btn btn-ghost btn-sm ml-4">Retour au site</a>
          </div>
        </nav>
        {children}
      </div>
    </ToastProvider>
  );
}
