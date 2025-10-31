import PageTemplate from '../components/PageTemplate';
import styles from './mentions-legales.module.css';

export const metadata = {
  title: 'Mentions légales | LeSotLyLaisse71',
  description:
    'Mentions légales du restaurant LeSotLyLaisse71 - Informations légales et réglementaires',
};

export default function MentionsLegalesPage() {
  return (
    <PageTemplate title="Mentions légales" subtitle="Informations légales et réglementaires">
      <div className={styles.legalContainer}>
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>📋 Éditeur du site</h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Établissement</span>
                <span className={styles.value}>LeSotLyLaisse71</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Forme juridique</span>
                <span className={styles.value}>[À compléter]</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>SIRET</span>
                <span className={styles.value}>[À compléter]</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Adresse</span>
                <span className={styles.value}>
                  Messey Sur Grosne
                  <br />
                  71390 Saône-et-Loire, France
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Téléphone</span>
                <span className={styles.value}>03 XX XX XX XX</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Email</span>
                <span className={styles.value}>contact@lesotlylaisse71.fr</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>🌐 Hébergement du site</h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Hébergeur</span>
                <span className={styles.value}>Vercel Inc.</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Adresse</span>
                <span className={styles.value}>
                  440 N Barranca Ave #4133
                  <br />
                  Covina, CA 91723, USA
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Site web</span>
                <span className={styles.value}>
                  <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">
                    vercel.com
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>💻 Développement</h2>
          </div>
          <div className={styles.cardContent}>
            <div className={styles.infoGrid}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Développeur</span>
                <span className={styles.value}>ujju16</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>GitHub</span>
                <span className={styles.value}>
                  <a href="https://github.com/ujju16" target="_blank" rel="noopener noreferrer">
                    @ujju16
                  </a>
                </span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Technologies</span>
                <span className={styles.value}>Next.js 15, TypeScript, React 19</span>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.textCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>©️ Propriété intellectuelle</h2>
          </div>
          <div className={styles.cardContent}>
            <p>
              L&apos;ensemble du contenu présent sur ce site web est la propriété exclusive de
              LeSotLyLaisse71. Toute reproduction, distribution, modification ou publication, même
              partielle, est strictement interdite sans accord préalable écrit.
            </p>
            <p>
              Le code source de ce site est disponible sous licence MIT sur{' '}
              <a
                href="https://github.com/ujju16/lesotlylaisse71"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
              .
            </p>
          </div>
        </div>

        <div className={styles.textCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>🔒 Données personnelles (RGPD)</h2>
          </div>
          <div className={styles.cardContent}>
            <p>
              Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
              Informatique et Libertés, vous disposez des droits suivants :
            </p>
            <ul className={styles.list}>
              <li>Droit d&apos;accès à vos données personnelles</li>
              <li>Droit de rectification et de suppression</li>
              <li>Droit d&apos;opposition au traitement</li>
              <li>Droit à la portabilité de vos données</li>
            </ul>
            <p className={styles.highlight}>
              Pour exercer ces droits, contactez-nous à :{' '}
              <strong>contact@lesotlylaisse71.fr</strong>
            </p>
          </div>
        </div>

        <div className={styles.textCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>⚖️ Responsabilité</h2>
          </div>
          <div className={styles.cardContent}>
            <p>
              LeSotLyLaisse71 décline toute responsabilité concernant les dommages directs ou
              indirects pouvant résulter de l&apos;accès au site ou de son utilisation.
            </p>
            <p>
              Les informations sont fournies à titre indicatif et peuvent contenir des
              inexactitudes. Le site est mis à jour régulièrement.
            </p>
          </div>
        </div>

        <div className={styles.footer}>
          <p className={styles.footerText}>
            <strong>Questions ou réclamations ?</strong> Contactez-nous à{' '}
            <a href="mailto:contact@lesotlylaisse71.fr">contact@lesotlylaisse71.fr</a>
          </p>
          <p className={styles.lastUpdate}>
            Dernière mise à jour :{' '}
            {new Date().toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
        </div>
      </div>
    </PageTemplate>
  );
}
