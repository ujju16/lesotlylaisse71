"use client";

import Image from "next/image";
import Carrousel from "./components/Carrousel";
import styles from "./page.module.css";
import { motion } from "framer-motion";

// Animation variants - Smooth in/out
const titleVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeInOut" as const,
    },
  },
};

const valueCardVariants = {
  fromLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeInOut" as const,
      },
    },
  },
  fromBottom: {
    hidden: { opacity: 0, y: 80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeInOut" as const,
        delay: 0.15,
      },
    },
  },
  fromRight: {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeInOut" as const,
        delay: 0.3,
      },
    },
  },
};

const serviceCardVariants = {
  fromLeft: {
    hidden: { opacity: 0, x: -100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeInOut" as const,
      },
    },
  },
  fromTop: {
    hidden: { opacity: 0, y: -80 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeInOut" as const,
        delay: 0.15,
      },
    },
  },
  fromRight: {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: "easeInOut" as const,
        delay: 0.3,
      },
    },
  },
};

const jumbotronVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: "easeInOut" as const,
    },
  },
};

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero Section avec Carrousel plein écran */}
      <motion.section
        className={styles.hero}
        initial="hidden"
        animate="visible"
        variants={jumbotronVariants}
        aria-label="Section d'accueil principal"
      >
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
              Restaurant • Bar • Tabac - Un lieu de convivialité à Messey Sur
              Grosne
            </motion.p>
            <motion.div
              className={styles.heroCta}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              role="group"
              aria-label="Actions principales"
            >
              <button className="btn-md-accent" aria-label="Réserver une table">
                Réserver une table
              </button>
              <button
                className="btn-md-outlined"
                aria-label="Découvrir nos services"
              >
                Découvrir nos services
              </button>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Section Notre Philosophie - L'Humain d'Abord */}
      <section className={styles.section} aria-labelledby="philosophy-heading">
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel} aria-hidden="true">
              Notre Philosophie
            </span>
            <h2 className={styles.sectionTitle} id="philosophy-heading">
              L&apos;humain et le service de qualité
            </h2>
            <p className={styles.sectionSubtitle}>
              Chez LeSotLyLaisse71, nous mettons l&apos;accent sur
              l&apos;humain, un service attentionné et les produits locaux de
              nos environs. Chaque visite est une expérience chaleureuse et
              authentique.
            </p>
          </div>

          <div
            className={styles.valuesGrid}
            role="list"
            aria-label="Nos valeurs"
          >
            <motion.div
              className="card-md"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={valueCardVariants.fromLeft}
              role="listitem"
            >
              <div className={styles.valueIcon} aria-hidden="true">
                🤝
              </div>
              <h3 className="title-md title-md-h3">Accueil Chaleureux</h3>
              <p>
                Notre équipe vous accueille avec le sourire et prend le temps de
                vous connaître. Ici, vous n&apos;êtes pas un numéro, vous êtes
                un invité.
              </p>
            </motion.div>

            <motion.div
              className="card-md"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={valueCardVariants.fromBottom}
              role="listitem"
            >
              <div className={styles.valueIcon} aria-hidden="true">
                ⭐
              </div>
              <h3 className="title-md title-md-h3">Service de Qualité</h3>
              <p>
                Un service attentif et professionnel pour que chaque moment
                passé chez nous soit agréable, que ce soit pour un café rapide
                ou un repas en famille.
              </p>
            </motion.div>

            <motion.div
              className="card-md"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={valueCardVariants.fromRight}
              role="listitem"
            >
              <div className={styles.valueIcon} aria-hidden="true">
                🌾
              </div>
              <h3 className="title-md title-md-h3">Produits Locaux</h3>
              <p>
                Nous travaillons avec des producteurs de la région pour vous
                offrir des produits frais, de saison et pleins de saveurs
                bourguignonnes.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Nos Services */}
      <section
        className={`${styles.section} ${styles.sectionAlt}`}
        aria-labelledby="services-heading"
      >
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionLabel} aria-hidden="true">
              Nos Services
            </span>
            <h2 className={styles.sectionTitle} id="services-heading">
              Trois espaces, une même convivialité
            </h2>
          </div>

          <div
            className={styles.servicesGrid}
            role="list"
            aria-label="Liste de nos services"
          >
            <motion.div
              className={styles.serviceCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={serviceCardVariants.fromLeft}
              role="listitem"
              aria-labelledby="service-restaurant"
            >
              <div className={styles.serviceIcon} aria-hidden="true">
                🍽️
              </div>
              <h3 id="service-restaurant">Restaurant</h3>
              <p>
                Cuisine traditionnelle bourguignonne préparée avec passion.
                Produits frais du terroir et recettes généreuses qui réchauffent
                le cœur.
              </p>
              <div className={styles.badgeContainer}>
                <span className="badge-md-accent" role="status">
                  Ouvert le midi seulement
                </span>
              </div>
            </motion.div>

            <motion.div
              className={styles.serviceCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={serviceCardVariants.fromTop}
              role="listitem"
              aria-labelledby="service-bar"
            >
              <div className={styles.serviceIcon} aria-hidden="true">
                🍺
              </div>
              <h3 id="service-bar">Bar</h3>
              <p>
                Un comptoir chaleureux pour vos pauses café, apéros entre amis
                ou moments de détente. Ambiance conviviale garantie.
              </p>
              <div className={styles.badgeContainer}>
                <span className="badge-md-secondary" role="status">
                  Ambiance conviviale
                </span>
              </div>
            </motion.div>

            <motion.div
              className={styles.serviceCard}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={serviceCardVariants.fromRight}
              role="listitem"
              aria-labelledby="service-presse"
            >
              <div
                className={`${styles.serviceIcon} ${styles.tabacIcon}`}
                aria-hidden="true"
              ></div>
              <h3 id="service-presse">Presse</h3>
              <p>
                Tous vos services de proximité : presse, jeux, cigarettes et
                bien plus. Un lieu essentiel au quotidien des habitants.
              </p>
              <div className={styles.badgeContainer}>
                <span className="badge-md-secondary" role="status">
                  Du mardi au dimanche
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section Engagement Local */}
      <section className={styles.section} aria-labelledby="engagement-heading">
        <div className={styles.container}>
          <div className={styles.engagementBanner}>
            <div className={styles.engagementContent}>
              <span className={styles.sectionLabel} aria-hidden="true">
                Notre Engagement
              </span>
              <h2 className={styles.sectionTitle} id="engagement-heading">
                Ancré dans la vie locale
              </h2>
              <p>
                Au cœur de Messey-sur-Grosne, notre établissement perpétue la
                tradition du commerce de proximité. Chaque jour, nous mettons un
                point d&apos;honneur à servir nos clients avec passion et
                authenticité, en valorisant les produits locaux et le
                savoir-faire de notre région.
              </p>
              <div
                className={styles.engagementHighlights}
                role="list"
                aria-label="Nos engagements"
              >
                <div className={styles.highlight} role="listitem">
                  <span className={styles.highlightIcon} aria-hidden="true">
                    🏡
                  </span>
                  <span>Commerce familial</span>
                </div>
                <div className={styles.highlight} role="listitem">
                  <span className={styles.highlightIcon} aria-hidden="true">
                    🌾
                  </span>
                  <span>Produits locaux</span>
                </div>
                <div className={styles.highlight} role="listitem">
                  <span className={styles.highlightIcon} aria-hidden="true">
                    🤝
                  </span>
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
                  style={{ objectFit: "cover" }}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section CTA */}
      <section className={styles.ctaSection} aria-labelledby="cta-heading">
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle} id="cta-heading">
              Prêt à vivre l&apos;expérience ?
            </h2>
            <p className={styles.ctaText}>
              Venez découvrir notre accueil chaleureux et nos services de
              qualité. Nous avons hâte de vous rencontrer !
            </p>
            <div
              className={styles.ctaButtons}
              role="group"
              aria-label="Actions de contact"
            >
              <button
                className="btn-md-primary"
                aria-label="Réserver une table"
              >
                Réserver une table
              </button>
              <button className="btn-md-outlined" aria-label="Nous contacter">
                Nous contacter
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
