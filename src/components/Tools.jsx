import tools from '../content/tools';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './Tools.module.css';

export default function Tools() {
  const ref = useScrollReveal();

  return (
    <section id="tools" className={styles.section}>
      <div className={`reveal`} ref={ref}>
        <div className={`section-label ${styles.label}`}>Technical Proficiencies</div>
        <h2 className={styles.heading}>Tools &amp; <em>Tech Stack</em></h2>
      </div>

      <div className={styles.grid}>
        {tools.map((group) => (
          <div key={group.groupTitle} className={styles.group}>
            <div className={styles.groupTitle}>{group.groupTitle}</div>
            <div className={styles.list}>
              {group.items.map((tool) => (
                <div key={tool} className={styles.item}>{tool}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
