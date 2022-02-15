
const strainLetters = str => {
  const regex = /[^A-Za-z]/g;

  return str.replace(regex, "")
            .split("")
            .map(char => char.toLowerCase())
            .filter((char, idx, ctx) => ctx.indexOf(char) === idx)
}

export default strainLetters