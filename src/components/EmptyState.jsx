import styles from './EmptyState.module.css'

function EmptyState({ hasSearch }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.icon}>{'{ }'}</div>
      <h3 className={styles.title}>
        {hasSearch ? 'No matching tasks' : 'No tasks yet'}
      </h3>
      <p className={styles.subtitle}>
        {hasSearch
          ? 'Try a different search term or clear the search bar.'
          : 'Click New task to add your first task.'}
      </p>
    </div>
  )
}

export default EmptyState
