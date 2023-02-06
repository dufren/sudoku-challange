import { useState } from "react";
import axios from "axios";

const initialState = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

function App() {
  const [puzzle, setPuzzle] = useState(initialState);
  const [solution, setSolution] = useState([]);

  const handleFetchPuzzle = () => {
    axios
      .get(
        "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{value}}}"
      )
      .then((res) => {
        const data = res.data;
        setPuzzle(data.newboard.grids[0].value);
      });
  };

  const handleFetchSolution = () => {
    axios
      .get(
        "https://sudoku-api.vercel.app/api/dosuku?query={newboard(limit:1){grids{solution}}}"
      )
      .then((res) => {
        const data = res.data;
        setSolution(data.newboard.grids[0].solution);
      });
  };

  const handleCol = (rowIdx, colIdx, value) => {
    const newGrid = [...puzzle];
    newGrid[rowIdx][colIdx] = value;
    setPuzzle(newGrid);
  };

  return (
    <div className="app">
      <div className="buttons">
        <button onClick={handleFetchPuzzle}>new table</button>
        <button onClick={handleFetchSolution}>solve</button>
      </div>

      <div className="grid">
        {puzzle.map((row, rowIdx) => (
          <div key={rowIdx} className="row">
            {row.map((col, colIdx) => (
              <div key={colIdx} className="col">
                <input
                  type="text"
                  value={col}
                  onChange={(e) => handleCol(rowIdx, colIdx, e.target.value)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
