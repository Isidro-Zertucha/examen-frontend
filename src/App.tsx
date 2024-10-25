import { ThemeProvider } from '@mui/material'
import './App.css'
import {TaskList} from './components/'
import theme from './styles/theme/theme'

function App() {
  
  return (
    <>
      <ThemeProvider theme={theme}>
      <TaskList></TaskList>      
      </ThemeProvider>
    </>
  )
}

export default App
