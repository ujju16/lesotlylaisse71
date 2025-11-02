'use client';

import Image from 'next/image';
import styles from './Carrousel.module.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = Array.from({ length: 13 }, (_, i) => `/images/carousel/photo${i + 1}.webp`);

export default function Carrousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrent((prev) => (prev + 1) % images.length);
    }, 8000); // Ralenti à 8 secondes

    return () => clearInterval(interval);
  }, []);

  const next = () => {
    setDirection(1);
    setCurrent((current + 1) % images.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((current - 1 + images.length) % images.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  return (
    <div
      className={styles.carrousel}
      role="region"
      aria-label="Carrousel d'images du restaurant"
      aria-live="polite"
    >
      <button
        className={styles.prev}
        onClick={prev}
        aria-label="Image précédente"
        aria-controls="carousel-image"
      >
        &#8592;
      </button>
      <div className={styles.imageWrapper} id="carousel-image">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={current}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 },
            }}
            className={styles.motionWrapper}
          >
            <Image
              src={images[current]}
              alt={`Photo ${current + 1} sur ${images.length} - LeSotLyLaisse71 Restaurant`}
              width={600}
              height={400}
              className={styles.image}
              priority
            />
          </motion.div>
        </AnimatePresence>
        <div className={styles.indicators} role="tablist" aria-label="Navigation du carrousel">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
              className={index === current ? styles.indicatorActive : styles.indicator}
              role="tab"
              aria-selected={index === current}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      </div>
      <button
        className={styles.next}
        onClick={next}
        aria-label="Image suivante"
        aria-controls="carousel-image"
      >
        &#8594;
      </button>
    </div>
  );
}
