import Navigation from "./components/Navigation";
import Carrousel from "./components/Carrousel";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navigation />
      <main className={styles.main}>
        <h1 className={styles.title}>Bienvenue au Bar Tabac LeSotLyLaisse71</h1>
        <p className={styles.subtitle}>
          Un lieu de convivialité, de partage et de bonne humeur à Messey Sur Grosne.
        </p>
        <Carrousel />
        <section className={styles.presentation}>
          <h2>Présentation</h2>
          <p>
            LeSotLyLaisse71 met en avant l&apos;humain, le service de qualité et les produits des environs. Découvrez notre histoire, notre équipe et nos services dans une ambiance chaleureuse.
          </p>
        </section>
      </main>
    </div>
  );
}
// ...existing code...
