import PageTemplate from '../components/PageTemplate';
import styles from './confidentialite.module.css';

export const metadata = {
  title: 'Politique de confidentialité | LeSotLyLaisse71',
  description:
    'Politique de confidentialité et protection des données personnelles - LeSotLyLaisse71',
};

export default function ConfidentialitePage() {
  return (
    <PageTemplate
      title="Politique de confidentialité"
      subtitle="Protection de vos données personnelles"
    >
      <div className={styles.container}>
        <section className={styles.section}>
          <h2>1. Collecte des données</h2>
          <p>
            LeSotLyLaisse71 s&apos;engage à protéger votre vie privée. Cette politique explique
            comment nous collectons, utilisons et protégeons vos données personnelles conformément
            au Règlement Général sur la Protection des Données (RGPD).
          </p>
          <p>
            Nous collectons uniquement les données nécessaires au bon fonctionnement de nos services
            :
          </p>
          <ul>
            <li>Informations de contact (nom, email, téléphone) pour les réservations</li>
            <li>Données de navigation (cookies, adresse IP) pour améliorer votre expérience</li>
            <li>Préférences et historique pour personnaliser nos services</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>2. Utilisation des données</h2>
          <p>Vos données personnelles sont utilisées pour :</p>
          <ul>
            <li>Gérer vos réservations et commandes</li>
            <li>Vous contacter concernant nos services</li>
            <li>Améliorer notre site web et nos services</li>
            <li>Vous envoyer des informations sur nos actualités (avec votre consentement)</li>
            <li>Respecter nos obligations légales</li>
          </ul>
          <p>
            <strong>Nous ne vendons jamais vos données à des tiers.</strong>
          </p>
        </section>

        <section className={styles.section}>
          <h2>3. Conservation des données</h2>
          <p>
            Vos données personnelles sont conservées pendant la durée nécessaire aux finalités pour
            lesquelles elles ont été collectées :
          </p>
          <ul>
            <li>Données de réservation : 3 ans après votre dernière visite</li>
            <li>Données de contact newsletter : jusqu&apos;à votre désinscription</li>
            <li>Données de navigation : 13 mois maximum</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>4. Vos droits (RGPD)</h2>
          <p>Conformément au RGPD, vous disposez des droits suivants :</p>
          <div className={styles.rightsGrid}>
            <div className={styles.rightCard}>
              <h3>✓ Droit d&apos;accès</h3>
              <p>Accéder à vos données personnelles</p>
            </div>
            <div className={styles.rightCard}>
              <h3>✓ Droit de rectification</h3>
              <p>Corriger vos données inexactes</p>
            </div>
            <div className={styles.rightCard}>
              <h3>✓ Droit à l&apos;effacement</h3>
              <p>Supprimer vos données</p>
            </div>
            <div className={styles.rightCard}>
              <h3>✓ Droit d&apos;opposition</h3>
              <p>Vous opposer au traitement</p>
            </div>
            <div className={styles.rightCard}>
              <h3>✓ Droit à la portabilité</h3>
              <p>Récupérer vos données</p>
            </div>
            <div className={styles.rightCard}>
              <h3>✓ Droit de limitation</h3>
              <p>Limiter le traitement</p>
            </div>
          </div>
          <p className={styles.contactInfo}>
            Pour exercer ces droits, contactez-nous à :{' '}
            <a href="mailto:contact@lesotlylaisse71.fr">contact@lesotlylaisse71.fr</a>
          </p>
        </section>

        <section className={styles.section}>
          <h2>5. Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour
            protéger vos données contre tout accès, modification, divulgation ou destruction non
            autorisés :
          </p>
          <ul>
            <li>Chiffrement SSL/TLS pour les transmissions de données</li>
            <li>Accès restreint aux données personnelles</li>
            <li>Sauvegardes régulières et sécurisées</li>
            <li>Formation du personnel à la protection des données</li>
          </ul>
        </section>

        <section className={styles.section}>
          <h2>6. Cookies</h2>
          <p>
            Notre site utilise des cookies pour améliorer votre expérience. Pour plus
            d&apos;informations, consultez notre <a href="/cookies">politique de cookies</a>.
          </p>
        </section>

        <section className={styles.section}>
          <h2>7. Modifications</h2>
          <p>
            Cette politique peut être mise à jour occasionnellement. La date de dernière
            modification est indiquée ci-dessous. Nous vous encourageons à consulter régulièrement
            cette page.
          </p>
          <p className={styles.lastUpdate}>
            Dernière mise à jour :{' '}
            {new Date().toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </section>

        <section className={styles.ctaSection}>
          <h2>Des questions ?</h2>
          <p>
            Si vous avez des questions concernant cette politique de confidentialité ou vos données
            personnelles, n&apos;hésitez pas à nous contacter.
          </p>
          <a href="mailto:contact@lesotlylaisse71.fr" className={styles.ctaButton}>
            Nous contacter
          </a>
        </section>
      </div>
    </PageTemplate>
  );
}
