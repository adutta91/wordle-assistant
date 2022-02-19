import words from '../assets/wordle-words.json'

const calculateSolutions = (guesses) => {
  if (!guesses.length) return []
  const validateGreenLetter = (word, guess, idx) => word[idx] === guess[idx]

  const validateYellowLetter = (word, guess, idx) => word.includes(guess[idx]) && word[idx] !== guess[idx]

  const validateBlackLetter = (word, guess, idx) => {
    const allowedLetters = guess.charDispositions.map((color, i) => {
      return ["green", "yellow"].includes(color) ? guess.letters[i] : ""
    }).filter(Boolean)

    return !word.includes(guess.letters[idx]) || allowedLetters.includes(guess.letters[idx])
  }

  // green letters
  return words.filter(word => {
    let valid = true

    guesses.forEach(guess => {
      const letters = guess.letters.toLowerCase()

      guess.charDispositions.forEach((color, idx) => {
        switch(color) {
          case "green":
            valid = valid && validateGreenLetter(word, letters, idx)
            break;
          case "black":
            valid = valid && validateBlackLetter(word, guess, idx)
            break;
          case "yellow":
            valid = valid && validateYellowLetter(word, letters, idx)
            break;
          default:
            break;
        }
      })
    })

    return valid
  })
}

export default calculateSolutions