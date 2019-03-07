/**
 * Create data structures supporting exam
 * @param exam {object} - exam about to be taken
 * @returns {array} - multi-dimensional array
 */
export default exam => {
  const answers = [] // arrays of booleans track user responses
  const fillIns = [] // strings answers fill in the blank
  const orders = [] // arrays of sequences for list order questions
  const intervals = [] // time spend on each question
  exam.test.forEach(el => {
    answers.push(Array(el.choices.length).fill(false))
    fillIns.push('')
    orders.push(null)
    intervals.push(0)
  })
  return [answers, fillIns, orders, intervals]
}
