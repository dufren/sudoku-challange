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
  const [visible, setVisible] = useState(true);

  const handleFetchPuzzle = () => {
    axios.get("https://sudoku-api.vercel.app/api/dosuku").then((res) => {
      const data = res.data;
      setPuzzle(data.newboard.grids[0].value);
      setSolution(data.newboard.grids[0].solution);
    });
    handleSolution();
  };

  const handleSolution = () => {
    setVisible(!visible);
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
        <button disabled={!solution.length} onClick={handleSolution}>
          solve
        </button>
        <p>first get ur table then u can access to solution</p>
      </div>
      <div className="main">
        <div>
          <h1>sudoku</h1>
          <div className="grid">
            {puzzle?.map((row, rowIdx) => (
              <div key={rowIdx} className="row">
                {row.map((col, colIdx) => (
                  <div key={colIdx} className="col">
                    <input type="text" value={col} onChange={handleCol} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1>solution</h1>
          {visible && (
            <div className="grid-solution">
              {solution?.map((row, rowIdx) => (
                <div key={rowIdx} className="row">
                  {row.map((col, colIdx) => (
                    <div key={colIdx} className="col">
                      <input type="text" value={col} onChange={handleCol} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
