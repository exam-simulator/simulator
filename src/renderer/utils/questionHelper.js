export default (source, array, question) => {
  let newQuestion
  if (source === 0) {
    newQuestion = array[0]
  } else if (source === 1) {
    let i = array.indexOf(question + 1)
    if (i === 0) {
      newQuestion = false
    }
    newQuestion = array[i - 1]
  } else if (source === 2) {
    let i = array.indexOf(question - 1)
    if (i === array.length - 1) {
      newQuestion = false
    }
    newQuestion = array[i + 1]
  } else if (source === 3) {
    newQuestion = array[array.length - 1]
  }
  return newQuestion
}
