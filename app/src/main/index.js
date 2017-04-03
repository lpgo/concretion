'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'
import SerialPort from 'serialport'

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:${require('../../../config').port}`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 600,
    width: 800
  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // eslint-disable-next-line no-console
  console.log('mainWindow opened')
  console.log(process.version)
  console.log(process.versions['electron'])
}



app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

ipcMain.on('getPorts', (event, arg) => {
  console.log('main get ports');
  SerialPort.list(function (err, ports) {
    console.log(err);
    event.sender.send('getPorts', ports);
  })
})

