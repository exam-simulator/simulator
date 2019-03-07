export default ({
  exam: { title, code, filename, image },
  answers,
  question,
  time,
  fillIns,
  orders,
  marked
}) => {
  const date = new Date()
  const completed = answers.reduce((acc, val, i) => {
    if (val.indexOf(true) !== -1 || fillIns[i] || orders[i]) {
      acc += 1
    }
    return acc
  }, 0)

  const session = {
    filename,
    image,
    title,
    code,
    completed,
    answers,
    fillIns,
    orders,
    marked,
    question,
    time,
    date
  }
  return session
}
