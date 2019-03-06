import isequal from 'lodash.isequal'

/**
 * Aggegate a report summarizing exam performance
 */
export default (exam, answers, fillIns, orders, time) => {
  const correct = []
  const incorrect = []
  const incomplete = []

  answers.forEach((el, i) => {
    const { variant, answer } = exam.test[i]
    if (el.indexOf(true) === -1 && el.length > 1) {
      incomplete.push(i)
    } else if (variant === 2 && !fillIns[i]) {
      incomplete.push(i)
    } else if (variant === 3 && !orders[i]) {
      incomplete.push(i)
    } else if (isequal(el, answer) || (el.length === 1 && !!el)) {
      correct.push(i)
    } else {
      incorrect.push(i)
    }
  })

  const score = Math.round((correct.length / exam.test.length) * 100)
  const status = score >= exam.pass
  const date = new Date()
  const elapsed = exam.time * 60 - time
  const report = {
    filename: exam.filename,
    title: exam.title,
    code: exam.code,
    pass: exam.pass,
    time: exam.time,
    status,
    score,
    correct,
    incorrect,
    incomplete,
    answers,
    fillIns,
    orders,
    date,
    elapsed
  }
  return report
}
