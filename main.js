const path = require('path')
const dotenv = require('dotenv');
const { app, BrowserWindow, Menu } = require('electron')

dotenv.config({ path: path.join(__dirname, '.env.local') })

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1920,
      height: 1080,
      minWidth: 1080,
      minHeight: 720,
      icon: __dirname + '/src/app/favicon.ico',
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
