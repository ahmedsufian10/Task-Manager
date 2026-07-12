import styles from './FilterTabs.module.css'

const FILTERS = ['All', 'Pending', 'Completed']

function FilterTabs({ activeFilter, onFilterChange }) {
  return (
    <div className={styles.tabs} role="tablist">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          role="tab"
          aria-selected={activeFilter === filter}
          className={`${styles.tab} ${activeFilter === filter ? styles.active : ''}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  )
}

export default FilterTabs
