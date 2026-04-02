import volunteer from '../content/volunteer';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './Volunteer.module.css';

const iconColors = ['coral', 'lime', 'sky', 'mint'];
const darkIcon = new Set(['lime']);

export default function Volunteer() {
  const ref = useScrollReveal();

  return (
    <section id="volunteer" className={styles.section}>
      <div className={`reveal`} ref={ref}>
        <div className="section-label">Giving Back</div>
        <h2>Volunteer <em>Experience</em></h2>
      </div>

      <div className={styles.grid}>
        {volunteer.map((item, i) => (
          <div key={i} className={styles.card} data-cursor-grow>
            <div
              className={styles.icon}
              style={{
                background: `var(--${iconColors[i]})`,
                color: darkIcon.has(iconColors[i]) ? 'var(--ink)' : undefined,
              }}
            >
              {item.icon}
            </div>
            <div className={styles.content}>
              <div className={styles.org}>{item.org}</div>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.desc}>{item.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
