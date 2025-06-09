import Link from 'next/link';
import styles from './Navigation.module.css';

export default function Navigation() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>LeSotLyLaisse71</div>
      <ul className={styles.navLinks}>
        <li><Link href="/">Accueil</Link></li>
        <li><Link href="/qui-sommes-nous">Qui sommes-nous</Link></li>
        <li><Link href="/infos">Infos</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
