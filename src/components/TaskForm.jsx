import { useState, useEffect } from 'react'
import styles from './TaskForm.module.css'

const EMPTY_FORM = {
  title: '',
  description: '',
  priority: 'Medium',
  dueDate: '',
}

function todayStr() {
  const d = new Date()
  const month = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return d.getFullYear() + '-' + month + '-' + day
}

function TaskForm({ isOpen, editingTask, onSave, onCancel }) {
  const [formData, setFormData] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title,
        description: editingTask.description,
        priority: editingTask.priority,
        dueDate: editingTask.dueDate,
      })
    } else {
      setFormData(EMPTY_FORM)
    }
    setErrors({})
  }, [editingTask, isOpen])

  if (!isOpen) return null

  function validate() {
    const newErrors = {}
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required.'
    }
    if (formData.dueDate && formData.dueDate < todayStr()) {
      newErrors.dueDate = 'Due date cannot be in the past.'
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleChange(field, value) {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!validate()) return
    onSave({ ...formData, title: formData.title.trim() })
    setFormData(EMPTY_FORM)
    setErrors({})
  }

  function handleCancel() {
    setFormData(EMPTY_FORM)
    setErrors({})
    onCancel()
  }

  return (
    <div className={styles.overlay} onClick={handleCancel}>
      <form className={styles.form} onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2 className={styles.heading}>{editingTask ? 'Edit task' : 'Add new task'}</h2>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="title">
            Title <span className={styles.required}>*</span>
          </label>
          <input
            id="title"
            type="text"
            className={`${styles.input} ${errors.title ? styles.inputError : ''}`}
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            placeholder="Finish project report"
          />
          {errors.title && <span className={styles.errorText}>{errors.title}</span>}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            className={styles.textarea}
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Optional details"
            rows={3}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="priority">
              Priority
            </label>
            <select
              id="priority"
              className={styles.select}
              value={formData.priority}
              onChange={(e) => handleChange('priority', e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor="dueDate">
              Due date
            </label>
            <input
              id="dueDate"
              type="date"
              className={`${styles.input} ${errors.dueDate ? styles.inputError : ''}`}
              value={formData.dueDate}
              onChange={(e) => handleChange('dueDate', e.target.value)}
              min={todayStr()}
            />
            {errors.dueDate && <span className={styles.errorText}>{errors.dueDate}</span>}
          </div>
        </div>

        <div className={styles.actions}>
          <button type="button" className={styles.cancelBtn} onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className={styles.saveBtn}>
            {editingTask ? 'Save changes' : 'Add task'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default TaskForm
