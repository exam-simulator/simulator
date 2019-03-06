import { app, BrowserWindow } from 'electron'
import mainWinDimensions from 'common/mainWinDimensions'
import mainWinContent from 'common/mainWinContent'

let mainWin

const inDev = process.env.NODE_ENV === 'development'

function createMainWin() {
  const [width, height] = mainWinDimensions()

  mainWin = new BrowserWindow({
    width,
    height,
    title: 'Exam Simulator',
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWin.loadURL(mainWinContent(inDev))

  installReactDevtools(inDev)

  mainWin.on('close', () => {
    mainWin = null
  })
}

function installReactDevtools(inDev) {
  if (inDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS
    } = require('electron-devtools-installer')
    mainWin.webContents.openDevTools({ mode: 'detach' })

    installExtension(REACT_DEVELOPER_TOOLS)
      .then(name => console.log(`Installed -->  ${name}`))
      .catch(console.log)
  }
}

app.on('ready', createMainWin)
app.on('window-all-closed', () => app.quit())
