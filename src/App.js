import './App.scss';
import { Input, Container, AppBar, Toolbar, Box, Chip } from '@mui/material';
import { useState, useRef, useEffect } from 'react'
import CharInput from './components/CharInput'
import calculateSolutions from './util/calculateSolutions'

function App() {
  const charRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ]
  const [solutions, setSolutions] = useState([])
  const [guess, setGuess] = useState('')
  const [guess0, setGuess0] = useState('')
  const [guess1, setGuess1] = useState('')
  const [guess2, setGuess2] = useState('')
  const [guess3, setGuess3] = useState('')
  const [guess4, setGuess4] = useState('')
  const [yellowChars, setYellowChars] = useState('')
  const [blockedChars, setBlockedChars] = useState('')

  useEffect(() => {
    setSolutions(calculateSolutions(guess, yellowChars, blockedChars))
  }, [guess, yellowChars, blockedChars])

  useEffect(() => {
    setGuess([guess0 || ' ', guess1 || ' ', guess2 || ' ', guess3 || ' ', guess4 || ' '].join(''))
  }, [guess0, guess1, guess2, guess3, guess4])

  const onKeyUp = idx => e => {
    if (e.key === "Backspace" && charRefs[idx - 1]) {
      charRefs[idx - 1].current.focus()
    }
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

          <h3>Enter green letters:</h3>
          <div>
            <CharInput ref={charRefs[0]} value={guess0} onChange={e => setGuess0(e.currentTarget.value)} onKeyUp={onKeyUp(0)} />
            <CharInput ref={charRefs[1]} value={guess1} onChange={e => setGuess1(e.currentTarget.value)} onKeyUp={onKeyUp(1)} />
            <CharInput ref={charRefs[2]} value={guess2} onChange={e => setGuess2(e.currentTarget.value)} onKeyUp={onKeyUp(2)} />
            <CharInput ref={charRefs[3]} value={guess3} onChange={e => setGuess3(e.currentTarget.value)} onKeyUp={onKeyUp(3)} />
            <CharInput ref={charRefs[4]} value={guess4} onChange={e => setGuess4(e.currentTarget.value)} onKeyUp={onKeyUp(4)} />
          </div>
          <br />
          <br />
          <h3>Enter yellow letters:</h3>
          <div>
            <Input value={yellowChars} onChange={e => setYellowChars(e.currentTarget.value)} />
          </div>
          <br />
          <br />
          <h3>Enter unused letters:</h3>
          <div>
            <Input value={blockedChars} onChange={e => setBlockedChars(e.currentTarget.value)} />
          </div>
          <br />
          <br />
          <h3>Potential solutions (total: {solutions.length}):</h3>
          <Box sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between'
          }}>
            {solutions.slice(0, 100).map(solution => <Chip sx={{ margin: "5px"}} label={solution} variant="outlined" />)}
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default App;
