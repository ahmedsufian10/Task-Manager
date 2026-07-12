import styles from './TaskCard.module.css'

function formatDate(dateStr) {
  if (!dateStr) return 'No due date'
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function isOverdue(dateStr, completed) {
  if (!dateStr || completed) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const due = new Date(dateStr + 'T00:00:00')
  return due < today
}

function TaskCard({ task, onToggleComplete, onEdit, onDeleteRequest }) {
  const overdue = isOverdue(task.dueDate, task.completed)

  return (
    <div className={`${styles.card} ${task.completed ? styles.completed : ''}`}>
      <div className={styles.cardHeader}>
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className={styles.checkbox}
          />
          <span className={styles.customCheckbox} />
        </label>
        <h3 className={`${styles.title} ${task.completed ? styles.strikethrough : ''}`}>
          {task.title}
        </h3>
        <span className={`${styles.badge} ${styles[task.priority.toLowerCase()]}`}>
          {task.priority}
        </span>
      </div>

      {task.description && <p className={styles.description}>{task.description}</p>}

      <div className={styles.footer}>
        <span className={`${styles.dueDate} ${overdue ? styles.overdue : ''}`}>
          {formatDate(task.dueDate)}
          {overdue ? ' - Overdue' : ''}
        </span>
        <div className={styles.actions}>
          <button className={styles.editBtn} onClick={() => onEdit(task)} aria-label="Edit task">
            Edit
          </button>
          <button
            className={styles.deleteBtn}
            onClick={() => onDeleteRequest(task.id)}
            aria-label="Delete task"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}

export default TaskCard
