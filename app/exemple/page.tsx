import PageTemplate from '../components/PageTemplate';
import styles from './exemple.module.css';

export default function ExemplePage() {
  return (
    <PageTemplate 
      title="Titre de votre page"
      subtitle="Une courte description de votre page (optionnel)"
    >
      <section className={styles.section}>
        <h2>Section 1</h2>
        <p>
          Ajoutez votre contenu ici. Vous pouvez utiliser des sections, 
          des images, des listes, etc.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Section 2</h2>
        <p>
          Le template s'occupe automatiquement de la navigation, 
          du titre et de la mise en page générale.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Section 3</h2>
        <ul>
          <li>Élément 1</li>
          <li>Élément 2</li>
          <li>Élément 3</li>
        </ul>
      </section>
    </PageTemplate>
  );
}
