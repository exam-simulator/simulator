export default (source, marked, question) => {
  let newQuestion
  if (source === 0) {
    newQuestion = marked[0]
  } else if (source === 1) {
    let i = marked.indexOf(question + 1)
    if (i === 0) {
      newQuestion = false
    }
    newQuestion = marked[i - 1]
  } else if (source === 2) {
    let i = marked.indexOf(question - 1)
    if (i === marked.length - 1) {
      newQuestion = false
    }
    newQuestion = marked[i + 1]
  } else if (source === 3) {
    newQuestion = marked[marked.length - 1]
  }
  return newQuestion
}
