import { useState, useEffect } from 'react'
import './App.css'
import './Bingo.css'; // Optional: use this for styling the game.
function App() {
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const generateBingoNumbers = () => {
    let values = [
      'Harris: "Coach Walz"',
      'Trump: "nobody\'s knows/done more for than me"',
      'Harris: "Let me be clear..."',
      'Trump: abortion after birth',
      '"Weird"',
      '"Hannibal Lecter"',
      'Harris brings up Trump\'s felonies',
      'Trump says something positive about a dictator',
      '"Project 2025"',
      'Trump mispronounces "Kamala"',
      'Trump disparages immigrants',
      'Harris: "We\'re not going back!"',
      'Harris laughs',
      '"Rocket man"',
      'Trump: "tremendous"',
      'Trump brings up the assassination attempt',
      'Moderators try to gain back control of debate',
      '"Jan. 6/the insurrection"',
      'Harris: "working families"',
      'Trump brings up surgeries in school',
      'Trump makes up a word',
      'Harris mentions being a prosecutor',
      'Trump plays accordion with his hands',
      'Harris rolls eyes/ side eyes Trump',
      'Trump insults a moderator',
    ];

    values = shuffleArray(values);
    // Generate a 5x5 grid of random numbers
    const bingoGrid = [];
    for (let i = 0; i < 5; i++) {
      const row = [];
      for (let j = 0; j < 5; j++) {
        //row.push(Math.floor(Math.random() * 100) + 1); // Random numbers between 1 and 100
        row.push(values.pop());
      }
      bingoGrid.push(row);
    }
    return bingoGrid;
  };

  const [bingoNumbers, setBingoNumbers] = useState(generateBingoNumbers());
  const [selectedNumbers, setSelectedNumbers] = useState(new Array(5).fill(0).map(() => new Array(5).fill(false)));

  console.log('bingoNumbers', bingoNumbers)
  // Toggle the selection state of a number
  const handleNumberClick = (rowIndex, colIndex) => {
    const newSelectedNumbers = [...selectedNumbers];
    newSelectedNumbers[rowIndex][colIndex] = !newSelectedNumbers[rowIndex][colIndex];
    setSelectedNumbers(newSelectedNumbers);
  };

  const checkBingo = () => {
    const hasRowBingo = selectedNumbers.some(row => row.every(cell => cell));
    const hasColumnBingo = selectedNumbers[0].some((_, colIndex) =>
      selectedNumbers.every(row => row[colIndex])
    );
    const hasDiagonalBingo =
      selectedNumbers.every((row, rowIndex) => row[rowIndex]) ||
      selectedNumbers.every((row, rowIndex) => row[4 - rowIndex]);

    return hasRowBingo || hasColumnBingo || hasDiagonalBingo;
  };

  const handleReset = () => {
    setBingoNumbers(generateBingoNumbers());
    setSelectedNumbers(new Array(5).fill(0).map(() => new Array(5).fill(false)));
  };

  return (
    <div className="bingo-game">
      <h1>Election Bingo</h1>
      <div className="bingo-grid">
        {bingoNumbers.map((row, rowIndex) => (
          <div key={rowIndex} className="bingo-row">
            {row.map((number, colIndex) => (
              <div
                key={colIndex}
                className={`bingo-cell ${selectedNumbers[rowIndex][colIndex] ? 'selected' : ''}`}
                onClick={() => handleNumberClick(rowIndex, colIndex)}
              >
                {number}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button onClick={handleReset}>Reset Game</button>
      {checkBingo() && <div className="bingo-winner">Bingo! You Win!</div>}
    </div>
  );
}

export default App
