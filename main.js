require('dotenv').config()
const path = require('path')
const { app, BrowserWindow, Menu } = require('electron')

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1920,
      height: 1080,
      minWidth: 1080,
      minHeight: 720,
      center: true
    })
  
    Menu.setApplicationMenu(null);
    
    // open devtool if in dev env
    if (process.env.NODE_ENV === 'development'){
        win.webContents.openDevTools()
    }

    win.loadURL('http://localhost:3000')
}

app.whenReady().then(() => {
    createWindow()
})
