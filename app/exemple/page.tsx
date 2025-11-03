import PageTemplate from "../components/PageTemplate";
import styles from "./exemple.module.css";

export default function ExemplePage() {
  return (
    <PageTemplate
      title="Titre de votre page"
      subtitle="Une courte description de votre page (optionnel)"
    >
      <section className={styles.section} aria-labelledby="section1-heading">
        <h2 id="section1-heading">Section 1</h2>
        <p>
          Ajoutez votre contenu ici. Vous pouvez utiliser des sections, des
          images, des listes, etc.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="section2-heading">
        <h2 id="section2-heading">Section 2</h2>
        <p>
          Le template s&apos;occupe automatiquement de la navigation, du titre
          et de la mise en page générale.
        </p>
      </section>

      <section className={styles.section} aria-labelledby="section3-heading">
        <h2 id="section3-heading">Section 3</h2>
        <ul role="list">
          <li>Élément 1</li>
          <li>Élément 2</li>
          <li>Élément 3</li>
        </ul>
      </section>
    </PageTemplate>
  );
}
