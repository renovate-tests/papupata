import React from 'react'
import './App.css'
import TodoList from './TodoList'

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Todo list with papupata</h1>
      <TodoList />
    </div>
  )
}

export default App
