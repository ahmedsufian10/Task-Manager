import { useState, useMemo } from 'react'
import useLocalStorage from './hooks/useLocalStorage'
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import FilterTabs from './components/FilterTabs'
import SearchBar from './components/SearchBar'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'
import ConfirmModal from './components/ConfirmModal'
import './index.css'

function makeId() {
  return Date.now() + '-' + Math.random().toString(36).slice(2, 9)
}

function App() {
  const [tasks, setTasks] = useLocalStorage('taskflow.tasks', [])

  const [activeFilter, setActiveFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  const [deleteTargetId, setDeleteTargetId] = useState(null)

  function handleAddTask(formData) {
    const newTask = {
      id: makeId(),
      ...formData,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [...prev, newTask])
    setIsFormOpen(false)
  }

  function handleUpdateTask(formData) {
    setTasks((prev) =>
      prev.map((t) => (t.id === editingTask.id ? { ...t, ...formData } : t)),
    )
    setEditingTask(null)
    setIsFormOpen(false)
  }

  function handleSave(formData) {
    if (editingTask) {
      handleUpdateTask(formData)
    } else {
      handleAddTask(formData)
    }
  }

  function handleToggleComplete(id) {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)),
    )
  }

  function requestEdit(task) {
    setEditingTask(task)
    setIsFormOpen(true)
  }

  function requestDelete(id) {
    setDeleteTargetId(id)
  }

  function confirmDelete() {
    setTasks((prev) => prev.filter((t) => t.id !== deleteTargetId))
    setDeleteTargetId(null)
  }

  function cancelDelete() {
    setDeleteTargetId(null)
  }

  function openAddForm() {
    setEditingTask(null)
    setIsFormOpen(true)
  }

  function closeForm() {
    setEditingTask(null)
    setIsFormOpen(false)
  }

  const filteredTasks = useMemo(() => {
    let result = tasks

    if (activeFilter === 'Pending') {
      result = result.filter((t) => !t.completed)
    } else if (activeFilter === 'Completed') {
      result = result.filter((t) => t.completed)
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter((t) => t.title.toLowerCase().includes(q))
    }

    return [...result].sort((a, b) => {
      if (!a.dueDate) return 1
      if (!b.dueDate) return -1
      return a.dueDate.localeCompare(b.dueDate)
    })
  }, [tasks, activeFilter, searchQuery])

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.completed).length
    const pending = total - completed
    return { total, completed, pending }
  }, [tasks])

  return (
    <div className="app">
      <Navbar onAddClick={openAddForm} />

      <main className="main">
        <div className="layout">
          <Dashboard total={stats.total} completed={stats.completed} pending={stats.pending} />

          <div className="content">
            <div className="controls">
              <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            <TaskList
              tasks={filteredTasks}
              hasSearch={searchQuery.trim().length > 0}
              onToggleComplete={handleToggleComplete}
              onEdit={requestEdit}
              onDeleteRequest={requestDelete}
            />
          </div>
        </div>
      </main>

      <TaskForm
        isOpen={isFormOpen}
        editingTask={editingTask}
        onSave={handleSave}
        onCancel={closeForm}
      />

      <ConfirmModal
        isOpen={deleteTargetId !== null}
        title="Delete task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  )
}

export default App
