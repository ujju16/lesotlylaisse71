import styles from './PageTemplate.module.css';

interface PageTemplateProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function PageTemplate({ title, subtitle, children, className }: PageTemplateProps) {
  return (
    <main className={`${styles.main} ${className || ''}`}>
      <div className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      <div className={styles.content}>{children}</div>
    </main>
  );
}
