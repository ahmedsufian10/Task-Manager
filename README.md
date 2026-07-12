# TaskFlow, React Task Manager

Week 2 Task submission for The Tech Pulses MERN Stack Internship.
A single page Task Manager built with React and Vite, using LocalStorage for persistence. No backend, no UI libraries.

## Setup

```
npm install
npm run dev
```

Open the printed local URL, typically http://localhost:5173.

## Build

```
npm run build
npm run preview
```

## Project structure

```
src/
  App.jsx                 Top level state (tasks, filters, search, modals) and layout
  main.jsx                React entry point
  index.css               Design tokens and global styles
  components/
    Navbar.jsx
    Dashboard.jsx          Stat cards, Total, Completed, Pending
    TaskList.jsx           Maps tasks to TaskCard, renders EmptyState when empty
    TaskCard.jsx           Single task card, badge, checkbox, edit and delete
    TaskForm.jsx           Add and Edit form, shared component, with validation
    FilterTabs.jsx         All, Pending, Completed
    SearchBar.jsx          Real time title search
    ConfirmModal.jsx       Custom delete confirmation, no window.confirm
    EmptyState.jsx
  hooks/
    useLocalStorage.js     Custom hook wrapping localStorage get and set with JSON parsing
```

## Features implemented

- Add, edit, delete, and complete toggle for tasks, full CRUD
- Title required, due date cannot be in the past, validated on submit
- Priority badges, Low green, Medium orange, High red
- Tasks sorted by due date
- Custom confirmation modal before delete
- Filter tabs, All, Pending, Completed, with active tab highlighted
- Real time search by title
- Live dashboard stats
- LocalStorage persistence via useLocalStorage, survives page refresh
- Empty state for no tasks or no search matches
- Fully responsive from 375px to 1280px and up, smooth hover and modal transitions
- No UI libraries, Google Fonts only, Poppins and Inter

## Notes

- LocalStorage key: taskflow.tasks
- Every component was written and understood individually and can be explained in review.
