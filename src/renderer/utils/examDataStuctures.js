export default exam => {
  const answers = []
  const fillIns = []
  const orders = []
  exam.test.forEach(el => {
    answers.push(Array(el.choices.length).fill(false))
    fillIns.push('')
    orders.push(null)
  })
  return [answers, fillIns, orders]
}
