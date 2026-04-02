import expertise from '../content/expertise';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './Expertise.module.css';

// The hover accent colors cycle through these in order
const hoverColors = ['coral', 'lime', 'sky', 'mint', 'peach', 'lavender', 'coral', 'lime'];
const darkText = new Set(['lime', 'peach']); // colors needing dark text on hover

export default function Expertise() {
  const ref = useScrollReveal();

  return (
    <section id="expertise" className={styles.section}>
      <div className={`reveal ${styles.header}`} ref={ref}>
        <div className="section-label">Areas of Expertise</div>
        <h2>What I <em>Do Best</em></h2>
      </div>

      <div className={styles.grid}>
        {expertise.map((item, i) => (
          <div
            key={i}
            className={styles.box}
            style={{
              '--hover-bg': `var(--${hoverColors[i]})`,
              '--hover-text': darkText.has(hoverColors[i]) ? 'var(--ink)' : '#fff',
            }}
          >
            <div className={styles.icon}>{item.icon}</div>
            <div className={styles.title}>{item.title}</div>
            <ul className={styles.list}>
              {item.items.map((li) => (
                <li key={li}>{li}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
