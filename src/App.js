import { useState, useEffect } from "react"

function App() {
  const [api, setApi] = useState()
  const [puzzle, setPuzzle] = useState([])

  useEffect(() => {
    fetch("https://sudoku-api.vercel.app/api/dosuku")
      .then(res => res.json())
      .then(res => setApi(res))
  }, [])

  const handleSolve = async () => {
    const solution = await api?.newboard.grids[0].solution
  }

  const handleValue = async () => {
    const value = await api?.newboard.grids[0].value
  }

  return (
    <div className="App">
    </div>
  );
}

export default App;
