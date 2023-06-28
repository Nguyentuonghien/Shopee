import './App.css'
import useRoutElements from './useRoutElements'

function App() {
  const routeElemets = useRoutElements() // custom Hook

  return <div>{routeElemets}</div>
}

export default App
