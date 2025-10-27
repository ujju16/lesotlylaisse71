import PageTemplate from '../components/PageTemplate';
import styles from './charte.module.css';

export default function CharteGraphiquePage() {
  return (
    <PageTemplate 
      title="Charte Graphique Material Design"
      subtitle="Découvrez la palette de couleurs et les composants Material Design"
    >
      <div className={styles.container}>
        {/* Palette Primaire */}
        <section className="card-md">
          <h2 className="title-md title-md-h2">Palette Primaire - Brun Café</h2>
          
          <div className={styles.colorGrid}>
            {[
              { shade: '50', hex: '#EFEBE9', name: 'Très clair' },
              { shade: '100', hex: '#D7CCC8', name: 'Clair' },
              { shade: '200', hex: '#BCAAA4', name: 'Léger' },
              { shade: '300', hex: '#A1887F', name: 'Moyen clair' },
              { shade: '400', hex: '#8D6E63', name: 'Moyen' },
              { shade: '500', hex: '#795548', name: 'Base', primary: true },
              { shade: '600', hex: '#6D4C41', name: 'Moyen foncé' },
              { shade: '700', hex: '#5D4037', name: 'Foncé' },
              { shade: '800', hex: '#4E342E', name: 'Très foncé' },
              { shade: '900', hex: '#3E2723', name: 'Ultra foncé' },
            ].map(color => (
              <div key={color.shade} className={styles.colorCard}>
                <div className={styles.colorSwatch} style={{ background: color.hex }}></div>
                <h3>{color.shade}</h3>
                <p className={styles.colorName}>{color.name}</p>
                <p className={styles.colorHex}>{color.hex}</p>
                {color.primary && <span className="badge-md">Principale</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Palette Secondaire */}
        <section className="card-md">
          <h2 className="title-md title-md-h2">Palette Secondaire - Vert Lime</h2>
          
          <div className={styles.colorGrid}>
            {[
              { shade: '100', hex: '#DCEDC8', name: 'Clair' },
              { shade: '300', hex: '#AED581', name: 'Moyen clair' },
              { shade: '500', hex: '#8BC34A', name: 'Base' },
              { shade: '700', hex: '#689F38', name: 'Foncé', primary: true },
              { shade: '900', hex: '#33691E', name: 'Très foncé' },
            ].map(color => (
              <div key={color.shade} className={styles.colorCard}>
                <div className={styles.colorSwatch} style={{ background: color.hex }}></div>
                <h3>{color.shade}</h3>
                <p className={styles.colorName}>{color.name}</p>
                <p className={styles.colorHex}>{color.hex}</p>
                {color.primary && <span className="badge-md-secondary">Utilisé</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Palette Accent */}
        <section className="card-md">
          <h2 className="title-md title-md-h2">Palette Accent - Ambre</h2>
          
          <div className={styles.colorGrid}>
            {[
              { shade: '100', hex: '#FFECB3', name: 'Clair' },
              { shade: '300', hex: '#FFD54F', name: 'Moyen clair' },
              { shade: '500', hex: '#FFC107', name: 'Base' },
              { shade: '600', hex: '#FFB300', name: 'Accent', primary: true },
              { shade: '800', hex: '#FF8F00', name: 'Foncé' },
            ].map(color => (
              <div key={color.shade} className={styles.colorCard}>
                <div className={styles.colorSwatch} style={{ background: color.hex }}></div>
                <h3>{color.shade}</h3>
                <p className={styles.colorName}>{color.name}</p>
                <p className={styles.colorHex}>{color.hex}</p>
                {color.primary && <span className="badge-md-accent">Accent</span>}
              </div>
            ))}
          </div>
        </section>

        {/* Boutons Material Design */}
        <section className="card-md">
          <h2 className="title-md title-md-h2">Boutons Material Design</h2>
          <div className={styles.buttonGrid}>
            <button className="btn-md-primary">Primary Button</button>
            <button className="btn-md-secondary">Secondary Button</button>
            <button className="btn-md-accent">Accent Button</button>
            <button className="btn-md-outlined">Outlined Button</button>
          </div>
        </section>

        {/* Badges */}
        <section className="card-md">
          <h2 className="title-md title-md-h2">Badges Material</h2>
          <div className={styles.badgeGrid}>
            <span className="badge-md">Produit Local</span>
            <span className="badge-md-secondary">Bio</span>
            <span className="badge-md-accent">Fait Maison</span>
            <span className="badge-md">Nouveauté</span>
          </div>
        </section>

        {/* Élévations */}
        <section className="card-md">
          <h2 className="title-md title-md-h2">Élévations (Ombres)</h2>
          <div className={styles.elevationGrid}>
            <div className={`${styles.elevationCard} surface-md-1`}>
              <p>Elevation 1</p>
              <small>Cards, Boutons</small>
            </div>
            <div className={`${styles.elevationCard} surface-md-2`}>
              <p>Elevation 2</p>
              <small>Cards hover</small>
            </div>
            <div className={`${styles.elevationCard} surface-md-3`}>
              <p>Elevation 3</p>
              <small>Menus, Modales</small>
            </div>
            <div className={`${styles.elevationCard} surface-md-4`}>
              <p>Elevation 4</p>
              <small>Popovers</small>
            </div>
          </div>
        </section>
      </div>
    </PageTemplate>
  );
}
