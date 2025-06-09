import Image from 'next/image';
import styles from './Carrousel.module.css';
import { useState } from 'react';

const images = Array.from({ length: 13 }, (_, i) => `/photo${i + 1}.jpg`);

export default function Carrousel() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % images.length);
  const prev = () => setCurrent((current - 1 + images.length) % images.length);

  return (
    <div className={styles.carrousel}>
      <button className={styles.prev} onClick={prev} aria-label="Précédent">&#8592;</button>
      <div className={styles.imageWrapper}>
        <Image
          src={images[current]}
          alt={`Photo ${current + 1}`}
          width={600}
          height={400}
          className={styles.image}
          priority
        />
      </div>
      <button className={styles.next} onClick={next} aria-label="Suivant">&#8594;</button>
    </div>
  );
}
