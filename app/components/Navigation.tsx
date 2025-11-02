'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Navigation.module.css';
import ThemeToggle from './ThemeToggle';

export default function Navigation() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Accueil' },
    { href: '/qui-sommes-nous', label: 'Qui sommes-nous' },
    { href: '/menu', label: 'Menu' },
    { href: '/infos', label: 'Infos' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={styles.navbar} role="navigation" aria-label="Navigation principale">
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo} aria-label="Retour à l'accueil - LeSotLyLaisse71">
          <Image
            src="/logo_soly.png"
            alt="Logo LeSotLyLaisse71"
            width={48}
            height={48}
            className={styles.logoImage}
            priority
          />
          <div className={styles.logoTextContainer}>
            <span className={styles.logoText}>LeSotLyLaisse71</span>
            <span className={styles.logoSubtext}>Restaurant & Bar</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <ul className={styles.navLinks} role="list">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={pathname === item.href ? styles.navLinkActive : styles.navLink}
                aria-current={pathname === item.href ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className={styles.ctaButton} aria-label="Réserver une table">
          Réserver
        </button>

        {/* Theme Toggle */}
        <ThemeToggle />

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className={mobileMenuOpen ? styles.hamburgerOpen : styles.hamburger}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu} id="mobile-menu" role="menu" aria-label="Menu mobile">
          <ul className={styles.mobileNavLinks} role="list">
            {navItems.map((item) => (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  className={
                    pathname === item.href ? styles.mobileNavLinkActive : styles.mobileNavLink
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  role="menuitem"
                  aria-current={pathname === item.href ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <button className={styles.mobileCtaButton} aria-label="Réserver une table">
            Réserver
          </button>
        </div>
      )}
    </nav>
  );
}
