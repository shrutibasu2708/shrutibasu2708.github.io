import contact from '../content/contact';
import useScrollReveal from '../hooks/useScrollReveal';
import styles from './Contact.module.css';

export default function Contact() {
  const ref = useScrollReveal();

  return (
    <section id="contact" className={styles.section}>
      <div className={`reveal`} ref={ref}>
        <div className={`section-label ${styles.label}`}>Let&apos;s Talk</div>
        <h2 className={styles.heading}>
          {contact.headline[0]}<br />
          <em>{contact.headline[1]}</em>
        </h2>
        <p className={styles.sub}>{contact.sub}</p>
      </div>

      <div className={styles.grid}>
        {contact.items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className={styles.item}
            {...(item.external ? { target: '_blank', rel: 'noreferrer' } : {})}
          >
            <span className={styles.icon}>{item.icon}</span>
            <div>
              <div className={styles.itemLabel}>{item.label}</div>
              <div className={styles.itemValue}>{item.value}</div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
