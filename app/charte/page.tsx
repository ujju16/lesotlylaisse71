import PageTemplate from "../components/PageTemplate";
import styles from "./charte.module.css";

export default function CharteGraphiquePage() {
  return (
    <PageTemplate
      title="Charte Graphique Material Design"
      subtitle="Découvrez la palette de couleurs et les composants Material Design"
    >
      <div className={styles.container}>
        {/* Palette Primaire */}
        <section className="card-md" aria-labelledby="palette-primaire">
          <h2 className="title-md title-md-h2" id="palette-primaire">
            Palette Primaire - Brun Café
          </h2>

          <div
            className={styles.colorGrid}
            role="list"
            aria-label="Nuances de la palette primaire"
          >
            {[
              { shade: "50", hex: "#EFEBE9", name: "Très clair" },
              { shade: "100", hex: "#D7CCC8", name: "Clair" },
              { shade: "200", hex: "#BCAAA4", name: "Léger" },
              { shade: "300", hex: "#A1887F", name: "Moyen clair" },
              { shade: "400", hex: "#8D6E63", name: "Moyen" },
              { shade: "500", hex: "#795548", name: "Base", primary: true },
              { shade: "600", hex: "#6D4C41", name: "Moyen foncé" },
              { shade: "700", hex: "#5D4037", name: "Foncé" },
              { shade: "800", hex: "#4E342E", name: "Très foncé" },
              { shade: "900", hex: "#3E2723", name: "Ultra foncé" },
            ].map((color) => (
              <div
                key={color.shade}
                className={styles.colorCard}
                role="listitem"
              >
                <div
                  className={styles.colorSwatch}
                  style={{ background: color.hex }}
                  aria-hidden="true"
                ></div>
                <h3>{color.shade}</h3>
                <p className={styles.colorName}>{color.name}</p>
                <p className={styles.colorHex}>{color.hex}</p>
                {color.primary && (
                  <span className="badge-md" role="status">
                    Principale
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Palette Secondaire */}
        <section className="card-md" aria-labelledby="palette-secondaire">
          <h2 className="title-md title-md-h2" id="palette-secondaire">
            Palette Secondaire - Vert Lime
          </h2>

          <div
            className={styles.colorGrid}
            role="list"
            aria-label="Nuances de la palette secondaire"
          >
            {[
              { shade: "100", hex: "#DCEDC8", name: "Clair" },
              { shade: "300", hex: "#AED581", name: "Moyen clair" },
              { shade: "500", hex: "#8BC34A", name: "Base" },
              { shade: "700", hex: "#689F38", name: "Foncé", primary: true },
              { shade: "900", hex: "#33691E", name: "Très foncé" },
            ].map((color) => (
              <div
                key={color.shade}
                className={styles.colorCard}
                role="listitem"
              >
                <div
                  className={styles.colorSwatch}
                  style={{ background: color.hex }}
                  aria-hidden="true"
                ></div>
                <h3>{color.shade}</h3>
                <p className={styles.colorName}>{color.name}</p>
                <p className={styles.colorHex}>{color.hex}</p>
                {color.primary && (
                  <span className="badge-md-secondary" role="status">
                    Utilisé
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Palette Accent */}
        <section className="card-md" aria-labelledby="palette-accent">
          <h2 className="title-md title-md-h2" id="palette-accent">
            Palette Accent - Ambre
          </h2>

          <div
            className={styles.colorGrid}
            role="list"
            aria-label="Nuances de la palette accent"
          >
            {[
              { shade: "100", hex: "#FFECB3", name: "Clair" },
              { shade: "300", hex: "#FFD54F", name: "Moyen clair" },
              { shade: "500", hex: "#FFC107", name: "Base" },
              { shade: "600", hex: "#FFB300", name: "Accent", primary: true },
              { shade: "800", hex: "#FF8F00", name: "Foncé" },
            ].map((color) => (
              <div
                key={color.shade}
                className={styles.colorCard}
                role="listitem"
              >
                <div
                  className={styles.colorSwatch}
                  style={{ background: color.hex }}
                  aria-hidden="true"
                ></div>
                <h3>{color.shade}</h3>
                <p className={styles.colorName}>{color.name}</p>
                <p className={styles.colorHex}>{color.hex}</p>
                {color.primary && (
                  <span className="badge-md-accent" role="status">
                    Accent
                  </span>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Boutons Material Design */}
        <section className="card-md" aria-labelledby="boutons-section">
          <h2 className="title-md title-md-h2" id="boutons-section">
            Boutons Material Design
          </h2>
          <div
            className={styles.buttonGrid}
            role="group"
            aria-label="Exemples de boutons"
          >
            <button className="btn-md-primary" aria-label="Bouton primaire">
              Primary Button
            </button>
            <button className="btn-md-secondary" aria-label="Bouton secondaire">
              Secondary Button
            </button>
            <button className="btn-md-accent" aria-label="Bouton accent">
              Accent Button
            </button>
            <button className="btn-md-outlined" aria-label="Bouton contour">
              Outlined Button
            </button>
          </div>
        </section>

        {/* Badges */}
        <section className="card-md" aria-labelledby="badges-section">
          <h2 className="title-md title-md-h2" id="badges-section">
            Badges Material
          </h2>
          <div
            className={styles.badgeGrid}
            role="list"
            aria-label="Exemples de badges"
          >
            <span className="badge-md" role="listitem">
              Produit Local
            </span>
            <span className="badge-md-secondary" role="listitem">
              Bio
            </span>
            <span className="badge-md-accent" role="listitem">
              Fait Maison
            </span>
            <span className="badge-md" role="listitem">
              Nouveauté
            </span>
          </div>
        </section>

        {/* Élévations */}
        <section className="card-md" aria-labelledby="elevations-section">
          <h2 className="title-md title-md-h2" id="elevations-section">
            Élévations (Ombres)
          </h2>
          <div
            className={styles.elevationGrid}
            role="list"
            aria-label="Niveaux d'élévation"
          >
            <div
              className={`${styles.elevationCard} surface-md-1`}
              role="listitem"
              aria-label="Élévation niveau 1"
            >
              <p>Elevation 1</p>
              <small>Cards, Boutons</small>
            </div>
            <div
              className={`${styles.elevationCard} surface-md-2`}
              role="listitem"
              aria-label="Élévation niveau 2"
            >
              <p>Elevation 2</p>
              <small>Cards hover</small>
            </div>
            <div
              className={`${styles.elevationCard} surface-md-3`}
              role="listitem"
              aria-label="Élévation niveau 3"
            >
              <p>Elevation 3</p>
              <small>Menus, Modales</small>
            </div>
            <div
              className={`${styles.elevationCard} surface-md-4`}
              role="listitem"
              aria-label="Élévation niveau 4"
            >
              <p>Elevation 4</p>
              <small>Popovers</small>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
}
