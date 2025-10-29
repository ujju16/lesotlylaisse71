import Carrousel from "./components/Carrousel";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      
      {/* Hero Section avec Carrousel plein écran */}
      <section className={styles.hero}>
        <Carrousel />
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>LeSotLyLaisse71</h1>
            <p className={styles.heroSubtitle}>
              Restaurant • Bar • Tabac
            </p>
            <p className={styles.heroDescription}>
              Un lieu de convivialité et de partage à Messey Sur Grosne
            </p>
            <div className={styles.heroCta}>
              <button className="btn-md-accent">Réserver une table</button>
              <button className="btn-md-outlined">Voir le menu</button>
            </div>
          </div>
        </div>
      </section>

      {/* Section Présentation */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Qui sommes-nous</span>
            <h2 className={styles.sectionTitle}>Bienvenue au cœur de la Bourgogne</h2>
            <p className={styles.sectionSubtitle}>
              LeSotLyLaisse71 met en avant l&apos;humain, le service de qualité et les produits des environs
            </p>
          </div>

          <div className={styles.contentGrid}>
            <div className="card-md">
              <h3 className="title-md title-md-h3">Notre Histoire</h3>
              <p>
                Découvrez l&apos;histoire de notre établissement, un lieu ancré dans la tradition bourguignonne 
                qui allie convivialité et authenticité depuis des générations.
              </p>
            </div>

            <div className="card-md">
              <h3 className="title-md title-md-h3">Notre Cuisine</h3>
              <p>
                Une cuisine généreuse préparée avec des produits frais et locaux. 
                Nos plats mettent à l&apos;honneur les saveurs de notre terroir.
              </p>
            </div>

            <div className="card-md">
              <h3 className="title-md title-md-h3">Notre Ambiance</h3>
              <p>
                Un cadre chaleureux et accueillant où il fait bon se retrouver entre amis, 
                en famille ou pour un moment de détente au bar.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Services */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Nos Services</span>
            <h2 className={styles.sectionTitle}>Ce que nous proposons</h2>
          </div>

          <div className={styles.servicesGrid}>
            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🍽️</div>
              <h3>Restaurant</h3>
              <p>Cuisine traditionnelle et produits du terroir</p>
              <span className="badge-md">Ouvert midi & soir</span>
            </div>

            <div className={styles.serviceCard}>
              <div className={styles.serviceIcon}>🍺</div>
              <h3>Bar</h3>
              <p>Large sélection de boissons et cocktails</p>
              <span className="badge-md-secondary">Ambiance conviviale</span>
            </div>

            <div className={styles.serviceCard}>
              <div className={`${styles.serviceIcon} ${styles.tabacIcon}`}></div>
              <h3>Tabac</h3>
              <p>Presse, jeux et services de proximité</p>
              <span className="badge-md">Tous les jours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Prêt à nous rendre visite ?</h2>
            <p className={styles.ctaText}>
              Réservez votre table dès maintenant ou venez découvrir notre carte
            </p>
            <div className={styles.ctaButtons}>
              <button className="btn-md-primary">Réserver maintenant</button>
              <button className="btn-md-outlined">Nous contacter</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
