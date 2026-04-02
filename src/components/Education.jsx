import education from '../content/education';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './Education.module.css';

export default function Education() {
  const ref = useScrollReveal();

  return (
    <section id="education" className={styles.section}>
      <div className={`reveal`} ref={ref}>
        <div className="section-label">Education</div>
        <h2>Academic <em>Background</em></h2>
      </div>

      <div className={styles.grid}>
        {education.map((item, i) => (
          <div
            key={i}
            className={styles.card}
            style={i === 0 ? { background: 'var(--coral)', color: '#fff' } : { background: 'var(--bg)' }}
          >
            <div className={styles.degree}>{item.degree}</div>
            <div className={styles.school}>{item.school} · {item.location}</div>
            <div className={styles.detail}>{item.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
