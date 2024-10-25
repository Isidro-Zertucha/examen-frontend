import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Task } from './interfaces/task'
import {TaskItem, TaskList} from './components/'

function App() {
  const [count, setCount] = useState(0)
  const [Tasks, setTasks] = useState<Task[]>([])

  const exampleTask:Task = {
    id: 3,
    title: "Botar basura",
    completed: false
  }
  
  //<TaskItem task={exampleTask}></TaskItem>
  return (
    <>
      <TaskList></TaskList>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      
    </>
  )
}

export default App
