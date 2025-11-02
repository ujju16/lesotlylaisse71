'use client';

import { useState, FormEvent } from 'react';
import styles from './Reservation.module.css';

export default function ReservationPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: 2,
          message: '',
        });
      } else {
        setError('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch {
      setError('Impossible de soumettre votre réservation. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.reservationPage}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1 className={styles.title}>Réserver une table</h1>
          <p className={styles.subtitle}>Nous serons ravis de vous accueillir</p>
        </header>

        <div className={styles.card}>
          {success && (
            <div className={styles.successMessage} role="alert" aria-live="polite">
              ✅ Votre réservation a été envoyée avec succès ! Nous vous contacterons bientôt.
            </div>
          )}

          {error && <div className={styles.errorMessage} role="alert" aria-live="assertive">❌ {error}</div>}

          <form className={styles.form} onSubmit={handleSubmit} aria-label="Formulaire de réservation">
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.label}>Nom complet *</label>
              <input
                id="name"
                type="text"
                className={styles.input}
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                aria-required="true"
              />
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email *</label>
                <input
                  id="email"
                  type="email"
                  className={styles.input}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  aria-required="true"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>Téléphone *</label>
                <input
                  id="phone"
                  type="tel"
                  className={styles.input}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                  aria-required="true"
                />
              </div>
            </div>

            <div className={styles.row}>
              <div className={styles.formGroup}>
                <label htmlFor="date" className={styles.label}>Date *</label>
                <input
                  id="date"
                  type="date"
                  className={styles.input}
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  min={new Date().toISOString().split('T')[0]}
                  required
                  aria-required="true"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="time" className={styles.label}>Heure *</label>
                <select
                  id="time"
                  className={styles.select}
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  required
                  aria-required="true"
                >
                  <option value="">Choisir une heure</option>
                  <option value="12:00">12:00</option>
                  <option value="12:30">12:30</option>
                  <option value="13:00">13:00</option>
                  <option value="13:30">13:30</option>
                  <option value="19:00">19:00</option>
                  <option value="19:30">19:30</option>
                  <option value="20:00">20:00</option>
                  <option value="20:30">20:30</option>
                  <option value="21:00">21:00</option>
                </select>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="guests" className={styles.label}>Nombre de personnes *</label>
              <select
                id="guests"
                className={styles.select}
                value={formData.guests}
                onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) })}
                required
                aria-required="true"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'personne' : 'personnes'}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="message" className={styles.label}>Message (optionnel)</label>
              <textarea
                id="message"
                className={styles.textarea}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Demandes spéciales, allergies, etc."
                aria-describedby="message-help"
              />
              <span id="message-help" className="sr-only">Ajoutez ici toute information supplémentaire concernant votre réservation</span>
            </div>

            <button type="submit" className={styles.submitButton} disabled={loading} aria-busy={loading}>
              {loading ? 'Envoi en cours...' : 'Réserver'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
