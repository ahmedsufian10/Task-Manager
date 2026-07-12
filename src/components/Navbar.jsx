import styles from './Navbar.module.css'

function Navbar({ onAddClick }) {
  return (
    <div className={styles.navbar}>
      <span className={styles.brand}>TaskFlow</span>
      <button className={styles.addBtn} onClick={onAddClick}>
        + New task
      </button>
    </div>
  )
}

export default Navbar
