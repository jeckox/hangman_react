import React, {useState, useEffect} from 'react';
import './App.css';

function App() {
  const wordToGuess = "banana";
  const [value, setValue] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [lettersToGuessed, setLettersToGuessed] = useState<Map<string, boolean>>(new Map());

  const initGame = () => {
    setAttempts(0);
    const letters = wordToGuess.split("");
    const temporaryLettersToGuessed = new Map();
    for (const letter of letters) {
      temporaryLettersToGuessed.set(letter, false);
    }
    setLettersToGuessed(temporaryLettersToGuessed);
    console.log(lettersToGuessed);
  }
  useEffect(() => {
    initGame();
  }, []);
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    setValue(event.key);
    setAttempts((prev) => prev + 1);
    console.log(lettersToGuessed.entries());
  }
  return (
    <div className="App">
        <div className="word-container">
          <p>{ attempts }</p>
          <p>{ lettersToGuessed.entries() }</p>
        </div>
      <input type="text" value={value} onKeyDown={handleKeyDown} maxLength={1}/>
    </div>
  );
}

export default App;
