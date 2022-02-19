import './Guess.scss';
import { useState, useRef, useEffect } from 'react'
import CharInput from '../CharInput'
import { shape, string, arrayOf, number, func } from 'prop-types'; 
import replaceAt from '../../util/replaceAt'

const DEFAULT_GUESS = {
  letters: '',
  charDispositions: ['black', 'black', 'black', 'black', 'black']
}

function Guess({ guess, onChange, prev, idx }) {
  const charRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ]
  if (prev) {

  }

  const getDefaultChar = (guess, idx) => guess.letters ? guess.letters.toUpperCase().split('')[idx] : ''

  const [guessChar0, setGuessChar0] = useState(getDefaultChar(guess, 0))
  const [guessChar1, setGuessChar1] = useState(getDefaultChar(guess, 1))
  const [guessChar2, setGuessChar2] = useState(getDefaultChar(guess, 2))
  const [guessChar3, setGuessChar3] = useState(getDefaultChar(guess, 3))
  const [guessChar4, setGuessChar4] = useState(getDefaultChar(guess, 4))
  const [charDispositions, setCharDispositions] = useState(guess.charDispositions)

  const charCbs = [
    setGuessChar0,
    setGuessChar1,
    setGuessChar2,
    setGuessChar3,
    setGuessChar4
  ]

  useEffect(() => {
    charRefs[0].current.focus()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    onChange({
      letters: [
        guessChar0 ? guessChar0.toLowerCase() : ' ',
        guessChar1 ? guessChar1.toLowerCase() : ' ',
        guessChar2 ? guessChar2.toLowerCase() : ' ',
        guessChar3 ? guessChar3.toLowerCase() : ' ',
        guessChar4 ? guessChar4.toLowerCase() : ' '
      ].join(''),
      charDispositions: charDispositions,
      idx
    })
  }, [
    onChange,
    idx,
    guessChar0,
    guessChar1,
    guessChar2,
    guessChar3,
    guessChar4,
    charDispositions
  ])

  const onKeyUp = idx => e => {
    // const idx = parseInt(e.currentTarget.parentElement.dataset.idx)

    if (e.key === "Backspace" && charRefs[idx - 1]) {
      charRefs[idx - 1].current.focus()
    }
  }

  const letterChange = (letter, idx) => {    
    charCbs[idx](letter)

    if (charRefs[idx + 1] && letter) {
      charRefs[idx + 1].current.focus()
    }
  }

  const colorChange = (color, idx) => {
    setCharDispositions(prev => {
      prev = replaceAt(prev, idx, color)

      return prev
    })
  }

  return (
    <div>
      <CharInput
        key={0}
        idx={0}
        ref={charRefs[0]}
        value={guessChar0}
        onUpdateLetter={letterChange}
        onUpdateColor={colorChange}
        onKeyUp={onKeyUp(0)}
        color={charDispositions[0]}
      />
      <CharInput
        key={1}
        idx={1}
        ref={charRefs[1]}
        value={guessChar1}
        onUpdateLetter={letterChange}
        onUpdateColor={colorChange}
        onKeyUp={onKeyUp(1)}
        color={charDispositions[1]}
      />
      <CharInput
        key={2}
        idx={2}
        ref={charRefs[2]}
        value={guessChar2}
        onUpdateLetter={letterChange}
        onUpdateColor={colorChange}
        onKeyUp={onKeyUp(2)}
        color={charDispositions[2]}
      />
      <CharInput
        key={3}
        idx={3}
        ref={charRefs[3]}
        value={guessChar3}
        onUpdateLetter={letterChange}
        onUpdateColor={colorChange}
        onKeyUp={onKeyUp(3)}
        color={charDispositions[3]}
      />
      <CharInput
        key={4}
        idx={4}
        ref={charRefs[4]}
        value={guessChar4}
        onUpdateLetter={letterChange}
        onUpdateColor={colorChange}
        onKeyUp={onKeyUp(4)}
        color={charDispositions[4]}
      />
    </div>
  );
}

Guess.propTypes = {
  guess: shape({
    letters: string,
    yellow: arrayOf(number),
    black: arrayOf(number)
  }),
  onChange: func.isRequired
}

Guess.defaultProps = {
  guess: DEFAULT_GUESS
}

export default Guess;
