import TaskCard from './TaskCard'
import EmptyState from './EmptyState'
import styles from './TaskList.module.css'

function TaskList({ tasks, hasSearch, onToggleComplete, onEdit, onDeleteRequest }) {
  if (tasks.length === 0) {
    return <EmptyState hasSearch={hasSearch} />
  }

  return (
    <div className={styles.grid}>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </div>
  )
}

export default TaskList
