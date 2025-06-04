import React, {useState, useEffect, useMemo} from 'react';
import './App.css';

function App() {
  const wordToGuess = "banana".toUpperCase();
  const [value, setValue] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [lettersToGuessed, setLettersToGuessed] = useState(new Map());

  const initGame = () => {
    setAttempts(0);
    const letters = wordToGuess.split("");
    const temporaryLettersToGuessed = new Map();
    letters.forEach((letter) => {
      temporaryLettersToGuessed.set(letter, false);
    });
    setLettersToGuessed(temporaryLettersToGuessed);
  }
  useEffect(() => {
    initGame();
  }, []);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const newValue = event.key.toUpperCase();
    setValue(newValue);
    setAttempts((prev) => prev + 1);
    const newLettersToGuessed = new Map(lettersToGuessed);
    if (lettersToGuessed.has(newValue)) {
      newLettersToGuessed.set(newValue, true);
      setLettersToGuessed(newLettersToGuessed);
    }
  }

  const currentStatus = useMemo(() => {
    const isWon = Array.from(lettersToGuessed.values()).every((value) => value === true);
    const isLost = attempts >= 6 && !isWon;
    return isLost ? "lost" : isWon ? "won" : "playing";
  }, [lettersToGuessed, attempts]);
  
  
  return (
    <div className="App">
      <div className="game-container">
          <div className="word-container">
            {wordToGuess.split("").map((l) => <><span>{lettersToGuessed.get(l) ? l : "_"}</span><span>{" "}</span></>)}
          </div>
          <div className="input-container">
            <input type="text" value={value} onKeyDown={handleKeyDown} maxLength={1} disabled={currentStatus !== "playing"} />
          </div>
          <p>Attempts: { attempts }</p>
      </div>
      <div className="message-container">
        <p>You {currentStatus === "won" ? "won" : currentStatus === "lost" ? "lost" : "are playing  "}</p>
      </div>
    </div>
  );
}

export default App;
