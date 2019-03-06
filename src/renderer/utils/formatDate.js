import { format } from 'date-fns'

export default date => format(new Date(date), 'MM/dd/RRRR')
