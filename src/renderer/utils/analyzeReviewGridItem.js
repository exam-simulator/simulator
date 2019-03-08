import theme from '../styles/theme'
import { lighten } from 'polished'

export default (i, { correct, incorrect }) => {
  if (correct.indexOf(i) !== -1) {
    return lighten(0.1, theme.primary)
  } else if (incorrect.indexOf(i) !== -1) {
    return lighten(0.25, theme.secondary)
  } else {
    return theme.grey[1]
  }
}
