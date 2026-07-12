import styles from './Dashboard.module.css'

function Dashboard({ total, completed, pending }) {
  return (
    <div className={styles.sidebar}>
      <div className={styles.card}>
        <div className={styles.value}>{total}</div>
        <div className={styles.label}>Total</div>
      </div>
      <div className={`${styles.card} ${styles.accent}`}>
        <div className={styles.value}>{completed}</div>
        <div className={styles.label}>Done</div>
      </div>
      <div className={styles.card}>
        <div className={styles.value}>{pending}</div>
        <div className={styles.label}>Pending</div>
      </div>
    </div>
  )
}

export default Dashboard
