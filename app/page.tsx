'use client';

import Image from 'next/image';
import Carrousel from './components/Carrousel';
import styles from './page.module.css';
import { motion } from 'framer-motion';

// Animation variants
const titleVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, x: -100, rotate: -5 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: 0.6,
      delay: index * 0.15,
      ease: [0.43, 0.13, 0.23, 0.96],
    },
  }),
};

const serviceCardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (index: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      delay: index * 0.1,
      ease: 'easeOut',
    },
  }),
};

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero Section avec Carrousel plein écran */}
      <section className={styles.hero}>
        <Carrousel />
        <div className={styles.heroOverlay}>
          <div className={styles.heroContent}>
            <motion.h1
              className={styles.heroTitle}
              initial="hidden"
              animate="visible"
              variants={titleVariants}
            >
              LeSotLyLaisse71
            </motion.h1>
            <motion.p
              className={styles.heroSubtitle}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              L&apos;humain au cœur de nos services
            </motion.p>
            <motion.p
              className={styles.heroDescription}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              Restaurant • Bar • Tabac - Un lieu de convivialité à Messey Sur Grosne
            </motion.p>
            <motion.div
              className={styles.heroCta}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <button className="btn-md-accent">Réserver une table</button>
              <button className="btn-md-outlined">Découvrir nos services</button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Notre Philosophie - L'Humain d'Abord */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Notre Philosophie</span>
            <h2 className={styles.sectionTitle}>L&apos;humain et le service de qualité</h2>
            <p className={styles.sectionSubtitle}>
              Chez LeSotLyLaisse71, nous mettons l&apos;accent sur l&apos;humain, un service
              attentionné et les produits locaux de nos environs. Chaque visite est une expérience
              chaleureuse et authentique.
            </p>
          </div>

          <div className={styles.valuesGrid}>
            <div className="card-md">
              <div className={styles.valueIcon}>🤝</div>
              <h3 className="title-md title-md-h3">Accueil Chaleureux</h3>
              <p>
                Notre équipe vous accueille avec le sourire et prend le temps de vous connaître.
                Ici, vous n&apos;êtes pas un numéro, vous êtes un invité.
              </p>
            </div>

            <div className="card-md">
              <div className={styles.valueIcon}>⭐</div>
              <h3 className="title-md title-md-h3">Service de Qualité</h3>
              <p>
                Un service attentif et professionnel pour que chaque moment passé chez nous soit
                agréable, que ce soit pour un café rapide ou un repas en famille.
              </p>
            </div>

            <div className="card-md">
              <div className={styles.valueIcon}>🌾</div>
              <h3 className="title-md title-md-h3">Produits Locaux</h3>
              <p>
                Nous travaillons avec des producteurs de la région pour vous offrir des produits
                frais, de saison et pleins de saveurs bourguignonnes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Nos Services */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel}>Nos Services</span>
            <h2 className={styles.sectionTitle}>Trois espaces, une même convivialité</h2>
          </div>

          <div className={styles.servicesGrid}>
            <motion.div
              className={styles.serviceCard}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={serviceCardVariants}
            >
              <div className={styles.serviceIcon}>🍽️</div>
              <h3>Restaurant</h3>
              <p>
                Cuisine traditionnelle bourguignonne préparée avec passion. Produits frais du
                terroir et recettes généreuses qui réchauffent le cœur.
              </p>
              <div className={styles.badgeContainer}>
                <span className="badge-md-accent">Ouvert le midi seulement</span>
              </div>
            </motion.div>

            <motion.div
              className={styles.serviceCard}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={serviceCardVariants}
            >
              <div className={styles.serviceIcon}>🍺</div>
              <h3>Bar</h3>
              <p>
                Un comptoir chaleureux pour vos pauses café, apéros entre amis ou moments de
                détente. Ambiance conviviale garantie.
              </p>
              <div className={styles.badgeContainer}>
                <span className="badge-md-secondary">Ambiance conviviale</span>
              </div>
            </motion.div>

            <motion.div
              className={styles.serviceCard}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={serviceCardVariants}
            >
              <div className={`${styles.serviceIcon} ${styles.tabacIcon}`}></div>
              <h3>Presse</h3>
              <p>
                Tous vos services de proximité : presse, jeux, cigarettes et bien plus. Un lieu
                essentiel au quotidien des habitants.
              </p>
              <div className={styles.badgeContainer}>
                <span className="badge-md-secondary">Du mardi au dimanche</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Engagement Local */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.engagementBanner}>
            <div className={styles.engagementContent}>
              <span className={styles.sectionLabel}>Notre Engagement</span>
              <h2 className={styles.sectionTitle}>Ancré dans la vie locale</h2>
              <p>
                Au cœur de Messey-sur-Grosne, notre établissement perpétue la tradition du commerce
                de proximité. Chaque jour, nous mettons un point d&apos;honneur à servir nos clients
                avec passion et authenticité, en valorisant les produits locaux et le savoir-faire de
                notre région.
              </p>
              <div className={styles.engagementHighlights}>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>🏡</span>
                  <span>Commerce familial</span>
                </div>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>🌾</span>
                  <span>Produits locaux</span>
                </div>
                <div className={styles.highlight}>
                  <span className={styles.highlightIcon}>🤝</span>
                  <span>Service personnalisé</span>
                </div>
              </div>
            </div>
            <div className={styles.engagementImage}>
              <div className={styles.landscapeImage}>
                <Image
                  src="/images/countryside.jpg"
                  alt="Paysage de Messey-sur-Grosne - Campagne bourguignonne"
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Prêt à vivre l&apos;expérience ?</h2>
            <p className={styles.ctaText}>
              Venez découvrir notre accueil chaleureux et nos services de qualité. Nous avons hâte
              de vous rencontrer !
            </p>
            <div className={styles.ctaButtons}>
              <button className="btn-md-primary">Réserver une table</button>
              <button className="btn-md-outlined">Nous contacter</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
