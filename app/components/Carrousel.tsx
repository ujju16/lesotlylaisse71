'use client';

import Image from 'next/image';
import styles from './Carrousel.module.css';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = Array.from({ length: 13 }, (_, i) => `/photo${i + 1}.jpg`);

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
    <div className={styles.carrousel}>
      <button className={styles.prev} onClick={prev} aria-label="Précédent">
        &#8592;
      </button>
      <div className={styles.imageWrapper}>
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
              alt={`Photo ${current + 1}`}
              width={600}
              height={400}
              className={styles.image}
              priority
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <button className={styles.next} onClick={next} aria-label="Suivant">
        &#8594;
      </button>
    </div>
  );
}
