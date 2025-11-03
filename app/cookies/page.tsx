import PageTemplate from "../components/PageTemplate";
import styles from "./cookies.module.css";

export const metadata = {
  title: "Politique de cookies | LeSotLyLaisse71",
  description:
    "Politique d'utilisation des cookies sur le site LeSotLyLaisse71",
};

export default function CookiesPage() {
  return (
    <PageTemplate
      title="Politique de cookies"
      subtitle="Comment nous utilisons les cookies"
    >
      <div className={styles.container}>
        <section className={styles.section} aria-labelledby="quest-ce-heading">
          <h2 id="quest-ce-heading">🍪 Qu&apos;est-ce qu&apos;un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte stocké sur votre appareil
            (ordinateur, smartphone, tablette) lorsque vous visitez un site web.
            Les cookies permettent au site de mémoriser vos actions et
            préférences pendant une période donnée.
          </p>
          <p>
            Ils sont essentiels au bon fonctionnement de nombreux sites web et
            permettent d&apos;améliorer votre expérience de navigation.
          </p>
        </section>

        <section
          className={styles.section}
          aria-labelledby="types-cookies-heading"
        >
          <h2 id="types-cookies-heading">📊 Types de cookies utilisés</h2>

          <div
            className={styles.cookieTypes}
            role="list"
            aria-label="Types de cookies"
          >
            <div className={styles.cookieCard} role="listitem">
              <div className={styles.cookieIcon} aria-hidden="true">
                🔒
              </div>
              <h3>Cookies essentiels</h3>
              <span className={styles.badge} role="status">
                Obligatoires
              </span>
              <p>
                Ces cookies sont indispensables au fonctionnement du site. Ils
                permettent la navigation et l&apos;utilisation des
                fonctionnalités de base (gestion de session, sécurité).
              </p>
              <p className={styles.duration}>Durée : Session</p>
            </div>

            <div className={styles.cookieCard} role="listitem">
              <div className={styles.cookieIcon} aria-hidden="true">
                📈
              </div>
              <h3>Cookies analytiques</h3>
              <span
                className={`${styles.badge} ${styles.badgeOptional}`}
                role="status"
              >
                Optionnels
              </span>
              <p>
                Ils nous aident à comprendre comment les visiteurs interagissent
                avec notre site (pages visitées, temps passé, etc.) pour
                améliorer nos services.
              </p>
              <p className={styles.duration}>Durée : 13 mois</p>
            </div>

            <div className={styles.cookieCard} role="listitem">
              <div className={styles.cookieIcon} aria-hidden="true">
                🎯
              </div>
              <h3>Cookies de préférence</h3>
              <span
                className={`${styles.badge} ${styles.badgeOptional}`}
                role="status"
              >
                Optionnels
              </span>
              <p>
                Ces cookies permettent au site de mémoriser vos choix (langue,
                région) pour vous offrir une expérience personnalisée.
              </p>
              <p className={styles.duration}>Durée : 6 mois</p>
            </div>

            <div className={styles.cookieCard} role="listitem">
              <div className={styles.cookieIcon} aria-hidden="true">
                🎪
              </div>
              <h3>Cookies marketing</h3>
              <span
                className={`${styles.badge} ${styles.badgeOptional}`}
                role="status"
              >
                Optionnels
              </span>
              <p>
                Utilisés pour afficher des publicités pertinentes et mesurer
                l&apos;efficacité de nos campagnes publicitaires.
              </p>
              <p className={styles.duration}>Durée : 12 mois</p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="gestion-heading">
          <h2 id="gestion-heading">⚙️ Gestion de vos préférences</h2>
          <p>
            Vous pouvez à tout moment accepter ou refuser les cookies (sauf les
            cookies essentiels) via les paramètres de votre navigateur ou notre
            bandeau de consentement.
          </p>

          <div className={styles.browserGuide}>
            <h3>Configuration par navigateur :</h3>
            <ul role="list">
              <li>
                <strong>Chrome :</strong> Paramètres → Confidentialité et
                sécurité → Cookies
              </li>
              <li>
                <strong>Firefox :</strong> Options → Vie privée et sécurité →
                Cookies
              </li>
              <li>
                <strong>Safari :</strong> Préférences → Confidentialité →
                Cookies
              </li>
              <li>
                <strong>Edge :</strong> Paramètres → Confidentialité → Cookies
              </li>
            </ul>
          </div>

          <div
            className={styles.warning}
            role="note"
            aria-label="Avertissement"
          >
            <strong>⚠️ Attention :</strong> La désactivation de certains cookies
            peut affecter le fonctionnement du site et limiter votre expérience
            utilisateur.
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="liste-cookies-heading"
        >
          <h2 id="liste-cookies-heading">📋 Liste détaillée des cookies</h2>

          <div
            className={styles.cookieTable}
            role="table"
            aria-label="Liste des cookies utilisés"
          >
            <div className={styles.tableHeader} role="row">
              <span role="columnheader">Nom</span>
              <span role="columnheader">Type</span>
              <span role="columnheader">Durée</span>
              <span role="columnheader">Finalité</span>
            </div>

            <div className={styles.tableRow} role="row">
              <span className={styles.cookieName} role="cell">
                session_id
              </span>
              <span className={styles.typeEssential} role="cell">
                Essentiel
              </span>
              <span role="cell">Session</span>
              <span role="cell">Gestion de la session utilisateur</span>
            </div>

            <div className={styles.tableRow} role="row">
              <span className={styles.cookieName} role="cell">
                csrf_token
              </span>
              <span className={styles.typeEssential} role="cell">
                Essentiel
              </span>
              <span role="cell">Session</span>
              <span role="cell">Protection contre les attaques CSRF</span>
            </div>

            <div className={styles.tableRow} role="row">
              <span className={styles.cookieName} role="cell">
                cookie_consent
              </span>
              <span className={styles.typeEssential} role="cell">
                Essentiel
              </span>
              <span role="cell">12 mois</span>
              <span role="cell">Mémorisation de vos préférences cookies</span>
            </div>

            <div className={styles.tableRow} role="row">
              <span className={styles.cookieName} role="cell">
                _ga
              </span>
              <span className={styles.typeAnalytics} role="cell">
                Analytique
              </span>
              <span role="cell">13 mois</span>
              <span role="cell">Google Analytics - Analyse du trafic</span>
            </div>

            <div className={styles.tableRow} role="row">
              <span className={styles.cookieName} role="cell">
                user_prefs
              </span>
              <span className={styles.typePreference} role="cell">
                Préférence
              </span>
              <span role="cell">6 mois</span>
              <span role="cell">Préférences utilisateur (langue, région)</span>
            </div>
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="droits-cookies-heading"
        >
          <h2 id="droits-cookies-heading">🔐 Vos droits</h2>
          <p>
            Conformément au RGPD, vous disposez de droits concernant vos données
            personnelles collectées via les cookies. Pour plus
            d&apos;informations, consultez notre{" "}
            <a href="/confidentialite">politique de confidentialité</a>.
          </p>
        </section>

        <section
          className={styles.ctaSection}
          aria-labelledby="questions-cookies-heading"
        >
          <h2 id="questions-cookies-heading">Questions sur les cookies ?</h2>
          <p>
            Pour toute question concernant notre utilisation des cookies,
            contactez-nous.
          </p>
          <a
            href="mailto:contact@lesotlylaisse71.fr"
            className={styles.ctaButton}
            aria-label="Nous contacter par email"
          >
            Nous contacter
          </a>
          <p className={styles.lastUpdate}>
            Dernière mise à jour :{" "}
            <time dateTime={new Date().toISOString()}>
              {new Date().toLocaleDateString("fr-FR", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </p>
        </section>
      </div>
    </PageTemplate>
  );
}
