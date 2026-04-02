import experience from '../content/experience';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './Experience.module.css';

const metaColors = ['coral', 'lime', 'sky', 'mint', 'peach'];
const darkMeta = new Set(['lime', 'peach']);

export default function Experience() {
  const ref = useScrollReveal();

  return (
    <section id="experience" className={styles.section}>
      <div className={`reveal ${styles.header}`} ref={ref}>
        <div className="section-label">Professional Experience</div>
        <h2>Where I&apos;ve <em>Made an Impact</em></h2>
      </div>

      <div className={styles.cards}>
        {experience.map((job, i) => {
          const color = metaColors[i];
          const isDark = darkMeta.has(color);
          return (
            <div key={i} className={styles.card} data-cursor-grow>
              <div
                className={styles.meta}
                style={{
                  background: `var(--${color})`,
                  color: isDark ? 'var(--ink)' : '#fff',
                }}
              >
                <div>
                  <div className={styles.company}>{job.company}</div>
                  <div className={styles.location}>{job.location}</div>
                  <div className={styles.date}>{job.date}</div>
                </div>
                <div
                  className={styles.badge}
                  style={{
                    background: isDark ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.25)',
                    borderColor: isDark ? 'rgba(0,0,0,0.2)' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  {job.badge}
                </div>
              </div>

              <div className={styles.body}>
                <div className={styles.role}>{job.role}</div>

                {job.metrics.length > 0 && (
                  <div className={styles.metrics}>
                    {job.metrics.map((m) => (
                      <span key={m} className={styles.metric}>{m}</span>
                    ))}
                  </div>
                )}

                <ul className={styles.bullets}>
                  {job.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>

                <div className={styles.tags}>
                  {job.tags.map((t) => (
                    <span key={t} className={styles.tag}>{t}</span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
