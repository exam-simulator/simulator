import { screen } from 'electron'

export default () => {
  const { width, height } = screen.getPrimaryDisplay().size
  let mainWidth = Math.round(width * 0.9)
  let mainHeight = Math.round(height * 0.9)
  return [mainWidth, mainHeight]
}
