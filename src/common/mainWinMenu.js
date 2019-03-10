import { Menu, shell } from 'electron'

const template = [
  { label: 'File', submenu: [{ role: 'quit' }] },
  {
    label: 'Edit',
    submenu: [{ role: 'cut' }, { role: 'copy' }, { role: 'paste' }]
  },
  {
    label: 'View',
    submenu: [
      { role: 'reload' },
      { role: 'forcereload' },
      { type: 'separator' },
      { role: 'resetzoom' },
      { role: 'zoomin' },
      { role: 'zoomout' },
      { type: 'separator' },
      { role: 'togglefullscreen' },
      { role: 'minimize' }
    ]
  },
  {
    label: 'Help',
    submenu: [
      {
        label: 'Documentation',
        click: () => shell.openExternal('https://exam-simulator.gitbook.io/exam-simulator/')
      }
    ]
  }
]

export default () => Menu.buildFromTemplate(template)
