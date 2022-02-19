const replaceAt = (arr, idx, val) => arr.slice(0, idx).concat([val]).concat(arr.slice(idx+1))

export default replaceAt