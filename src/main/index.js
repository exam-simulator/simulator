import { app, BrowserWindow } from 'electron'
import { autoUpdater } from 'electron-updater'
import mainWinDimensions from 'common/mainWinDimensions'
import mainWinContent from 'common/mainWinContent'
import mainWinIcon from 'common/mainWinIcon'
import mainWinMenu from 'common/mainWinMenu'

let mainWin

const gotTheLock = app.requestSingleInstanceLock()

const inDev = process.env.NODE_ENV === 'development'

autoUpdater.checkForUpdatesAndNotify()

function createMainWin() {
  const [width, height] = mainWinDimensions()

  mainWin = new BrowserWindow({
    width,
    height,
    title: 'Exam Simulator',
    icon: mainWinIcon,
    webPreferences: {
      nodeIntegration: true
    }
  })

  mainWin.loadURL(mainWinContent(inDev))

  mainWin.setMenu(mainWinMenu())

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

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', () => {
    if (mainWin) {
      if (mainWin.isMinimized()) {
        mainWin.restore()
      }
      mainWin.focus()
    }
  })
  app.on('ready', createMainWin)
}

app.on('window-all-closed', () => app.quit())
