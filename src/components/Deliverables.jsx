import deliverables from '../content/deliverables';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './Deliverables.module.css';

const topColors = ['coral', 'sky', 'lime', 'mint', 'peach', 'lavender'];
const darkTop = new Set(['lime', 'peach']);

export default function Deliverables() {
  const ref = useScrollReveal();

  return (
    <section id="deliverables" className={styles.section}>
      <div className={styles.headerRow}>
        <div className={`reveal`} ref={ref}>
          <div className="section-label">Portfolio of Work</div>
          <h2>Selected <em>Deliverables</em></h2>
        </div>
        <div className={styles.note}>
          📎 Add your campaign screenshots, ad creative &amp; assets here!
        </div>
      </div>

      <div className={styles.grid}>
        {deliverables.map((item, i) => {
          const color = topColors[i];
          return (
            <div key={i} className={styles.card} data-cursor-grow>
              <div
                className={styles.top}
                style={{ background: `var(--${color})` }}
              >
                <span className={styles.emoji}>{item.emoji}</span>
                <span
                  className={styles.placeholder}
                  style={{ color: darkTop.has(color) ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.6)' }}
                >
                  Add Image
                </span>
              </div>
              <div className={styles.body}>
                <div className={styles.org}>{item.org}</div>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.desc}>{item.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
