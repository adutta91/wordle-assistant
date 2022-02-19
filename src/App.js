import './App.scss';
import { Container, AppBar, Toolbar, Box } from '@mui/material';
import { useState, useEffect } from 'react'
import Guess from './components/Guess'
import Solutions from './components/Solutions'
import calculateSolutions from './util/calculateSolutions'
import replaceAt from './util/replaceAt'

const MAX_WORD_LENGTH = 5;

function App() {
  const [solutions, setSolutions] = useState([])
  const [currentGuessKey, setCurrentGuessKey] = useState(0)
  const [previousGuesses, setPreviousGuesses] = useState([])

  useEffect(() => {
    setSolutions(calculateSolutions(previousGuesses))
  }, [previousGuesses])

  const submitGuess = guess => {
    if (guess.letters.split(' ').join('').length === MAX_WORD_LENGTH) {
      setPreviousGuesses(prevGuesses => prevGuesses.concat([guess]))
      setCurrentGuessKey(prev => prev + 1)
    }
  }

  const editGuess = guess => {
    if (JSON.stringify(guess) === JSON.stringify(previousGuesses[guess.idx])) {
      return
    }

    setPreviousGuesses(prevGuesses => {
      const newGuesses = replaceAt(prevGuesses, guess.idx, guess)

      return newGuesses
    })
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{
          margin: "0 auto"
        }}>
          <h1>Wordle Assistant</h1>
        </Toolbar>
      </AppBar>
      <Container>
        <Box sx={{
          maxWidth: "500px",
          margin: "50px auto",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}>

          <h3>Enter your guesses:</h3>
          {previousGuesses.map((prevGuess, idx) => (
            <Guess prev idx={idx} key={`prev-${idx}`} guess={prevGuess} onChange={editGuess} />
          ))}

          {/* Current Guess */}
          <Guess key={currentGuessKey} onChange={submitGuess} />
          
          <br />
          <br />

          <Solutions solutions={solutions} />
        </Box>
      </Container>
    </>
  );
}

export default App;
