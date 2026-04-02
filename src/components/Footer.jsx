import site from '../content/site';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={styles.brand}>{site.name}</span>
      <p className={styles.tagline}>{site.tagline}</p>
      <p className={styles.copy}>© {site.year} · {site.location}</p>
    </footer>
  );
}
