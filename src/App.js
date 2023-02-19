import { useState } from "react";
import axios from "axios";
import Confetti from "react-confetti";

function App() {
  const [puzzle, setPuzzle] = useState([]);
  const [solution, setSolution] = useState([]);
  const [visible, setVisible] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleFetchPuzzle = () => {
    axios.get("https://sudoku-api.vercel.app/api/dosuku").then((res) => {
      const data = res.data;
      setPuzzle(data.newboard.grids[0].value);
      setSolution(data.newboard.grids[0].solution);
      setVisible(false);
      setIsCompleted(false);
    });
  };

  const handleSolution = () => {
    if (puzzle.length > 0) {
      setVisible((prev) => !prev);

      let solutionForCompare = solution.toString();
      let puzzleForCompare = puzzle.toString();

      if (solutionForCompare === puzzleForCompare) {
        setIsCompleted(true);
        setVisible(true);
      }
    }
  };

  const handleCol = (rowIdx, colIdx, value) => {
    value = parseInt(value);

    if (value >= 0 && value <= 9) {
      const newGrid = [...puzzle];
      newGrid[rowIdx][colIdx] = value;
      setPuzzle(newGrid);
    }
  };

  const handleMap = (data) => {
    return data?.map((row, rowIdx) => (
      <div key={rowIdx}>
        {row.map((col, colIdx) => (
          <div className="" key={colIdx}>
            <input
              className="w-10 border border-black outline-none text-center"
              type="number"
              value={col}
              onChange={(e) => handleCol(rowIdx, colIdx, e.target.value)}
            />
          </div>
        ))}
      </div>
    ));
  };

  return (
    <div>
      <div className="text-center">
        {isCompleted && <Confetti className="w-full" />}
        <button
          className="p-5 rounded border border-black mr-5 text-lg"
          onClick={handleFetchPuzzle}
        >
          new sudoku
        </button>
        <button
          className="p-5 rounded border border-black text-lg"
          onClick={handleSolution}
        >
          solve
        </button>
        <p className="text-2xl p-5">
          get your sudoku table by clicking new sudoku, then u can access to
          solution
        </p>
      </div>

      <div className="flex justify-center">
        <div className="">
          <h1 className="text-center p-3 text-2xl">sudoku</h1>
          <div className="grid grid-cols-9 w-3/4 mx-auto">
            {handleMap(puzzle)}
          </div>
        </div>

        <div>
          <h1 className="text-center p-3 text-2xl">solution</h1>
          {visible && (
            <div className="grid grid-cols-9 w-3/4 mx-auto">
              {handleMap(solution)}
            </div>
          )}
        </div>
      </div>
      {isCompleted && (
        <div className="p-10 mt-20 text-4xl text-center">
          <p>Well done, you have completed the sudoku.</p>
          <p>you can start again by pressing the new sudoku</p>
        </div>
      )}
    </div>
  );
}

export default App;
