import path from 'path'

export default path.resolve(__static, process.platform === 'darwin' ? 'icon.icns' : 'icon.ico')
