import { useState, useEffect } from "react"

function App() {

  const [api, setApi] = useState()
  const [puzzle, setPuzzle] = useState([])
  const [solution, setSolution] = useState([])

  useEffect(() => {
    fetch("https://sudoku-api.vercel.app/api/dosuku")
      .then(res => res.json())
      .then(res => setApi(res))
  }, [])

  const handleSolve = async () => {
    const solution = await api?.newboard.grids[0].solution
    setSolution(solution)
  }

  const handleValue = async () => {
    const value = await api?.newboard.grids[0].value
    setPuzzle(value)
  }

  const handleCol = () => {

  }

  return (
    <div>
      <div className="buttons">
        <button onClick={handleValue}>new table</button>
        <button onClick={handleSolve}>solve</button>
      </div>

      <div className="grid">
        {
          puzzle.map((row, rowIdx) => (
            <div key={rowIdx}>
              {row.map((col, colIdx) => (
                <input key={colIdx} type="text" value={col} onChange={handleCol} />
              ))}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default App;
