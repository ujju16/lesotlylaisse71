import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Section principale du footer */}
        <div className={styles.footerGrid}>
          {/* Colonne À propos */}
          <div className={styles.footerColumn}>
            <h3 className={styles.footerTitle}>LeSotLyLaisse71</h3>
            <p className={styles.footerDescription}>
              Restaurant, bar et tabac au cœur de la Bourgogne. 
              Un lieu de convivialité et de partage depuis des générations.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" className={styles.socialLink} aria-label="Facebook">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className={styles.socialLink} aria-label="Instagram">
                <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Colonne Navigation */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Navigation</h4>
            <ul className={styles.footerLinks}>
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="/qui-sommes-nous">Qui sommes-nous</Link></li>
              <li><Link href="/menu">Notre Menu</Link></li>
              <li><Link href="/infos">Infos pratiques</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Colonne Horaires */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Horaires</h4>
            <ul className={styles.footerInfo}>
              <li>
                <strong>Lundi - Vendredi</strong>
                <span>7h00 - 21h00</span>
              </li>
              <li>
                <strong>Samedi</strong>
                <span>8h00 - 22h00</span>
              </li>
              <li>
                <strong>Dimanche</strong>
                <span>8h00 - 20h00</span>
              </li>
            </ul>
          </div>

          {/* Colonne Contact */}
          <div className={styles.footerColumn}>
            <h4 className={styles.footerColumnTitle}>Contact</h4>
            <ul className={styles.footerInfo}>
              <li>
                <strong>Adresse</strong>
                <span>Messey Sur Grosne</span>
                <span>71390 Saône-et-Loire</span>
              </li>
              <li>
                <strong>Téléphone</strong>
                <span>03 XX XX XX XX</span>
              </li>
              <li>
                <strong>Email</strong>
                <span>contact@lesotlylaisse71.fr</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className={styles.footerDivider}></div>

        {/* Footer Bottom */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>
            © {currentYear} LeSotLyLaisse71. Tous droits réservés.
          </p>
          <p className={styles.credits}>
            Conçu et développé par <a href="https://github.com/ujju16" target="_blank" rel="noopener noreferrer" className={styles.creditLink}>ujju16</a>
          </p>
          <div className={styles.legalLinks}>
            <Link href="/mentions-legales">Mentions légales</Link>
            <span className={styles.separator}>•</span>
            <Link href="/confidentialite">Confidentialité</Link>
            <span className={styles.separator}>•</span>
            <Link href="/cookies">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
