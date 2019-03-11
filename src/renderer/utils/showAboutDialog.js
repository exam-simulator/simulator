import { clipboard, remote } from 'electron'

const detail = `
Version: ${remote.app.getVersion()}
Date: ${new Date().toISOString()}
Electron: ${process.versions.electron}
Chrome: ${process.versions.chrome}
Node.js: ${process.versions.node}
V8: ${process.versions.v8}
OS: ${process.platform}
`

export default () =>
  remote.dialog.showMessageBox(
    remote.getCurrentWindow(),
    {
      type: 'info',
      buttons: ['Close', 'Copy'],
      title: 'Exam Simulator',
      message: 'Exam Simulator',
      detail,
      noLink: true,
      defaultId: 0,
      cancelId: 0
    },
    response => {
      if (response === 1) {
        clipboard.writeText(detail)
      }
    }
  )
