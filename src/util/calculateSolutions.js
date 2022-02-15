import words from '../assets/wordle-words.json'
import strainLetters from './strainLetters'

const calculateSolutions = (guess, chars, blocked) => {
  const solutions = []
  console.log(`guess -------->>>>>>>>`, guess)

  const greenLettersConflict = word => {
    for (let i = 0; i < guess.length; i++) {
      const char = guess[i]
      if (char !== " " && word[i] !== char) {
        return true
      }
    }

    return false
  }

  const missingYellowLetters = word => !strainLetters(chars).every(char => word.includes(char))
  const containsBlockedLetters = word => strainLetters(blocked).some(char => word.includes(char))

  const isPossibleSolution = word => {
    if (greenLettersConflict(word) || missingYellowLetters(word) || containsBlockedLetters(word)) {
      return false
    }

    return true
  }

  words.forEach(word => {
    if (isPossibleSolution(word)) {
      solutions.push(word)
    }
  })
  
  return solutions
}

export default calculateSolutions