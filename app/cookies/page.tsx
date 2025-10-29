import PageTemplate from '../components/PageTemplate';
import styles from './cookies.module.css';

export const metadata = {
  title: 'Politique de cookies | LeSotLyLaisse71',
  description: 'Politique d\'utilisation des cookies sur le site LeSotLyLaisse71',
};

export default function CookiesPage() {
  return (
    <PageTemplate 
      title="Politique de cookies" 
      subtitle="Comment nous utilisons les cookies"
    >
      <div className={styles.container}>
        
        <section className={styles.section}>
          <h2>🍪 Qu&apos;est-ce qu&apos;un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, smartphone, tablette) 
            lorsque vous visitez un site web. Les cookies permettent au site de mémoriser vos actions et 
            préférences pendant une période donnée.
          </p>
          <p>
            Ils sont essentiels au bon fonctionnement de nombreux sites web et permettent d&apos;améliorer 
            votre expérience de navigation.
          </p>
        </section>

        <section className={styles.section}>
          <h2>📊 Types de cookies utilisés</h2>
          
          <div className={styles.cookieTypes}>
            <div className={styles.cookieCard}>
              <div className={styles.cookieIcon}>🔒</div>
              <h3>Cookies essentiels</h3>
              <span className={styles.badge}>Obligatoires</span>
              <p>
                Ces cookies sont indispensables au fonctionnement du site. Ils permettent la navigation 
                et l&apos;utilisation des fonctionnalités de base (gestion de session, sécurité).
              </p>
              <p className={styles.duration}>Durée : Session</p>
            </div>

            <div className={styles.cookieCard}>
              <div className={styles.cookieIcon}>📈</div>
              <h3>Cookies analytiques</h3>
              <span className={`${styles.badge} ${styles.badgeOptional}`}>Optionnels</span>
              <p>
                Ils nous aident à comprendre comment les visiteurs interagissent avec notre site 
                (pages visitées, temps passé, etc.) pour améliorer nos services.
              </p>
              <p className={styles.duration}>Durée : 13 mois</p>
            </div>

            <div className={styles.cookieCard}>
              <div className={styles.cookieIcon}>🎯</div>
              <h3>Cookies de préférence</h3>
              <span className={`${styles.badge} ${styles.badgeOptional}`}>Optionnels</span>
              <p>
                Ces cookies permettent au site de mémoriser vos choix (langue, région) pour 
                vous offrir une expérience personnalisée.
              </p>
              <p className={styles.duration}>Durée : 6 mois</p>
            </div>

            <div className={styles.cookieCard}>
              <div className={styles.cookieIcon}>🎪</div>
              <h3>Cookies marketing</h3>
              <span className={`${styles.badge} ${styles.badgeOptional}`}>Optionnels</span>
              <p>
                Utilisés pour afficher des publicités pertinentes et mesurer l&apos;efficacité 
                de nos campagnes publicitaires.
              </p>
              <p className={styles.duration}>Durée : 12 mois</p>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>⚙️ Gestion de vos préférences</h2>
          <p>
            Vous pouvez à tout moment accepter ou refuser les cookies (sauf les cookies essentiels) 
            via les paramètres de votre navigateur ou notre bandeau de consentement.
          </p>
          
          <div className={styles.browserGuide}>
            <h3>Configuration par navigateur :</h3>
            <ul>
              <li>
                <strong>Chrome :</strong> Paramètres → Confidentialité et sécurité → Cookies
              </li>
              <li>
                <strong>Firefox :</strong> Options → Vie privée et sécurité → Cookies
              </li>
              <li>
                <strong>Safari :</strong> Préférences → Confidentialité → Cookies
              </li>
              <li>
                <strong>Edge :</strong> Paramètres → Confidentialité → Cookies
              </li>
            </ul>
          </div>

          <div className={styles.warning}>
            <strong>⚠️ Attention :</strong> La désactivation de certains cookies peut affecter 
            le fonctionnement du site et limiter votre expérience utilisateur.
          </div>
        </section>

        <section className={styles.section}>
          <h2>📋 Liste détaillée des cookies</h2>
          
          <div className={styles.cookieTable}>
            <div className={styles.tableHeader}>
              <span>Nom</span>
              <span>Type</span>
              <span>Durée</span>
              <span>Finalité</span>
            </div>
            
            <div className={styles.tableRow}>
              <span className={styles.cookieName}>session_id</span>
              <span className={styles.typeEssential}>Essentiel</span>
              <span>Session</span>
              <span>Gestion de la session utilisateur</span>
            </div>
            
            <div className={styles.tableRow}>
              <span className={styles.cookieName}>csrf_token</span>
              <span className={styles.typeEssential}>Essentiel</span>
              <span>Session</span>
              <span>Protection contre les attaques CSRF</span>
            </div>
            
            <div className={styles.tableRow}>
              <span className={styles.cookieName}>cookie_consent</span>
              <span className={styles.typeEssential}>Essentiel</span>
              <span>12 mois</span>
              <span>Mémorisation de vos préférences cookies</span>
            </div>
            
            <div className={styles.tableRow}>
              <span className={styles.cookieName}>_ga</span>
              <span className={styles.typeAnalytics}>Analytique</span>
              <span>13 mois</span>
              <span>Google Analytics - Analyse du trafic</span>
            </div>
            
            <div className={styles.tableRow}>
              <span className={styles.cookieName}>user_prefs</span>
              <span className={styles.typePreference}>Préférence</span>
              <span>6 mois</span>
              <span>Préférences utilisateur (langue, région)</span>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>🔐 Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez de droits concernant vos données personnelles collectées 
            via les cookies. Pour plus d&apos;informations, consultez notre{' '}
            <a href="/confidentialite">politique de confidentialité</a>.
          </p>
        </section>

        <section className={styles.ctaSection}>
          <h2>Questions sur les cookies ?</h2>
          <p>
            Pour toute question concernant notre utilisation des cookies, contactez-nous.
          </p>
          <a href="mailto:contact@lesotlylaisse71.fr" className={styles.ctaButton}>
            Nous contacter
          </a>
          <p className={styles.lastUpdate}>
            Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </section>

      </div>
    </PageTemplate>
  );
}
