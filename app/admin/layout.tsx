<<<<<<< HEAD
import { ToastProvider } from "../components/admin/ToastProvider";
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="bg-base-200 min-h-screen">
        <nav className="navbar text-primary-content bg-primary shadow-lg">
=======
import { ToastProvider } from '../components/admin/ToastProvider';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-base-200">
        <nav className="navbar bg-primary text-primary-content shadow-lg">
>>>>>>> origin/main
          <div className="flex-1">
            <Link href="/admin" className="btn btn-ghost text-xl">
              🍽️ LeSotLyLaisse71 Admin
            </Link>
          </div>
          <div className="flex-none">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/admin/categories">📂 Catégories</Link>
              </li>
              <li>
                <Link href="/admin/dishes">🍴 Plats</Link>
              </li>
              <li>
                <Link href="/admin/menus">📋 Menus</Link>
              </li>
              <li>
<<<<<<< HEAD
                <Link href="/admin/qrcode">📱 QR Code</Link>
=======
                <Link href="/admin">📱 QR Code</Link>
>>>>>>> origin/main
              </li>
            </ul>
            <Link href="/" className="btn btn-ghost btn-sm ml-4">
              Retour au site
            </Link>
          </div>
        </nav>
        {children}
      </div>
    </ToastProvider>
  );
}
