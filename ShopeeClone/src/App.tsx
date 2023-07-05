import { ToastContainer } from 'react-toastify'
import './App.css'
import useRoutElements from './useRoutElements'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElemets = useRoutElements() // custom Hook

  return (
    <div>
      {routeElemets}
      <ToastContainer />
    </div>
  )
}

export default App
