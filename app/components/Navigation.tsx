'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import styles from './Navigation.module.css';

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
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <Image 
            src="/logo_soly.png" 
            alt="LeSotLyLaisse71 Logo" 
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
        <ul className={styles.navLinks}>
          {navItems.map((item) => (
            <li key={item.href}>
              <Link 
                href={item.href}
                className={pathname === item.href ? styles.navLinkActive : styles.navLink}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <button className={styles.ctaButton}>
          Réserver
        </button>

        {/* Mobile Menu Button */}
        <button 
          className={styles.mobileMenuButton}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Menu"
        >
          <span className={mobileMenuOpen ? styles.hamburgerOpen : styles.hamburger}></span>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className={styles.mobileMenu}>
          <ul className={styles.mobileNavLinks}>
            {navItems.map((item) => (
              <li key={item.href}>
                <Link 
                  href={item.href}
                  className={pathname === item.href ? styles.mobileNavLinkActive : styles.mobileNavLink}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <button className={styles.mobileCtaButton}>
            Réserver
          </button>
        </div>
      )}
    </nav>
  );
}
