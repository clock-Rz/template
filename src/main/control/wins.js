import { BrowserWindow } from 'electron'
import { join } from 'path'
import { is } from '@electron-toolkit/utils'   

//callback : args (app/BorwserWindow(Instance object) )
const createWin = function (options, router, callback) {
  const win = new BrowserWindow({
    show: false,
    autoHideMenuBar: true,
    webPreferences: {
      webviewTag: true,
      preload: join(__dirname, `../preload/index.js`),
      sandbox: false
    },
    x: 1920,
    y: 0,
    alwaysOnTop: true,
    ...options
  })

  win.on('ready-to-show', () => {
    win.show()
  })

  win.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    win.webContents.openDevTools()
    win.loadURL(process.env['ELECTRON_RENDERER_URL'] + `#${router}`)
  } else {
    win.loadFile(join(__dirname, '../renderer/index.html'), { hash: router })
  }

  callback && callback(app, win)

  return win
}

export default {
  createWin
}
