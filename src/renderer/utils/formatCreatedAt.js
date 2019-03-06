import { formatDistance } from 'date-fns'

export default date =>
  formatDistance(new Date(date), new Date()).replace(/about|over|almost|less/, '')
