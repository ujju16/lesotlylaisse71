import PageTemplate from '../components/PageTemplate';
import styles from './mentions-legales.module.css';

export const metadata = {
  title: 'Mentions légales | LeSotLyLaisse71',
  description: 'Mentions légales du restaurant LeSotLyLaisse71 - Informations légales et réglementaires',
};

export default function MentionsLegalesPage() {
  return (
    <PageTemplate 
      title="Mentions légales" 
      subtitle="Informations légales et réglementaires"
    >
      <div className={styles.legalContainer}>
        
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>1. Éditeur du site</h2>
          <div className={styles.content}>
            <p><strong>Nom de l&apos;établissement :</strong> LeSotLyLaisse71</p>
            <p><strong>Forme juridique :</strong> [À compléter]</p>
            <p><strong>SIRET :</strong> [À compléter]</p>
            <p><strong>Adresse :</strong> Messey Sur Grosne, 71390 Saône-et-Loire, France</p>
            <p><strong>Téléphone :</strong> 03 XX XX XX XX</p>
            <p><strong>Email :</strong> contact@lesotlylaisse71.fr</p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>2. Hébergement du site</h2>
          <div className={styles.content}>
            <p><strong>Hébergeur :</strong> Vercel Inc.</p>
            <p><strong>Adresse :</strong> 440 N Barranca Ave #4133, Covina, CA 91723, USA</p>
            <p><strong>Site web :</strong> <a href="https://vercel.com" target="_blank" rel="noopener noreferrer">https://vercel.com</a></p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>3. Développement</h2>
          <div className={styles.content}>
            <p><strong>Développeur :</strong> ujju16</p>
            <p><strong>GitHub :</strong> <a href="https://github.com/ujju16" target="_blank" rel="noopener noreferrer">@ujju16</a></p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>4. Propriété intellectuelle</h2>
          <div className={styles.content}>
            <p>
              L&apos;ensemble du contenu présent sur ce site est la propriété exclusive de LeSotLyLaisse71. 
              Toute reproduction est interdite sans accord préalable.
            </p>
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>5. Données personnelles</h2>
          <div className={styles.content}>
            <p>
              Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification et de suppression 
              de vos données. Contact : contact@lesotlylaisse71.fr
            </p>
          </div>
        </section>

        <div className={styles.lastUpdate}>
          <p><em>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>
        </div>

      </div>
    </PageTemplate>
  );
}
