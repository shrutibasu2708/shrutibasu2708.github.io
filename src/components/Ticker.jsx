import ticker from '../content/ticker';
import styles from './Ticker.module.css';

// Duplicate items so the seamless loop works (translateX -50%)
const items = [...ticker, ...ticker];

export default function Ticker() {
  return (
    <div className={styles.ticker} aria-hidden="true">
      <div className={styles.inner}>
        {items.map((text, i) => (
          <span key={i} className={styles.item}>
            {text}
            <span className={styles.sep}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
