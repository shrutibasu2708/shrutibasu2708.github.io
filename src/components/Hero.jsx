import { badge, headline, summary, ctas, stats } from '../content/hero';
import styles from './Hero.module.css';

const accentColors = ['coral', 'lime', 'sky', 'mint'];

export default function Hero() {
  return (
    <section className={styles.hero} id="home">
      <div className={styles.bgText} aria-hidden="true">SB</div>

      <div className={styles.left}>
        <div className={styles.badge}>
          <span className={styles.dot} />
          {badge.text}
        </div>

        <h1 className={styles.h1}>
          {headline.map((part, i) => {
            if (part.type === 'outline') {
              return <span key={i} className={styles.outline}>{part.text}</span>;
            }
            if (part.type === 'coral') {
              return <span key={i} className={styles.coral}>{part.text}</span>;
            }
            return <span key={i}>{part.text}</span>;
          })}
        </h1>

        <p className={styles.summary}>{summary}</p>

        <div className={styles.actions}>
          {ctas.map((cta) => (
            <a
              key={cta.href}
              href={cta.href}
              className={`btn btn-${cta.variant}`}
            >
              {cta.label}
            </a>
          ))}
        </div>
      </div>

      <div className={styles.right}>
        {stats.map((stat, i) => (
          <div
            key={i}
            className={styles.stat}
            style={{ '--accent': `var(--${accentColors[i]})` }}
          >
            <span className={styles.statBig}>{stat.big}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
