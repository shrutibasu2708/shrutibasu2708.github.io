import { logo, navLinks, navCta } from '../content/nav';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        {logo.first} <span className={styles.logoAccent}>{logo.last}</span>
      </div>

      <div className={styles.links}>
        {navLinks.map((link) => (
          <a key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </a>
        ))}
        <a href={navCta.href} className={`${styles.link} ${styles.cta}`}>
          {navCta.label}
        </a>
      </div>
    </nav>
  );
}
