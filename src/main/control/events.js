import { app, ipcMain, BrowserWindow } from 'electron'
import createWin from './wins'

export default function () {
  // createWin.createRank()
  createWin.createWin({
    x:0,
    y:0,
    width:800,
    height:900
  },'/')

  ipcMain.on('exitApp', () => {
    // app.exit(0)
    app.quit()
  })

  app.on('before-quit', (event) => {
    for (const currentWin of BrowserWindow.getAllWindows()) {
      currentWin.webContents.send('app-quit')
    }
  })
}
