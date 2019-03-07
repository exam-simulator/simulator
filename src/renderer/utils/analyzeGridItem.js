import theme from '../styles/theme'
import { lighten } from 'polished'

export default (question, answers, fillIns, orders, marked) => {
  const incomplete = answers.map((el, i) => {
    if (el.indexOf(true) === -1 && !fillIns[i] && !orders[i]) {
      return i
    }
  })
  if (marked.indexOf(question) !== -1) {
    return lighten(0.25, theme.tertiary)
  } else if (incomplete.indexOf(question) !== -1) {
    return theme.grey[1]
  } else {
    return lighten(0.1, theme.primary)
  }
}
