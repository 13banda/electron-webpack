const { app, BrowserWindow, shell,ipcMain } = require( 'electron');

const path = require('path');
const url = require('url');
let win
function createWindow() {
  // Create the browser window.
 win = new BrowserWindow({ width: 800, height: 600,backgroundColor: '#2e2c29',titleBarStyle:'hidden',
 webPreferences: {
    nodeIntegration: true,
   preload: path.join(__dirname, 'preload.js')
}})
 const startUrl = process.env.ELECTRON_START_URL || url.format({
            pathname: path.join(__dirname, '/../../build/index.html'),
            protocol: 'file:',
            slashes: true
        });
 // and load the index.html of the app.
win.loadURL(startUrl)


win.setMenuBarVisibility(false)

  // Open the DevTools.
  //win.webContents.openDevTools()
  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
  // Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()

  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
}

app.on('ready',createWindow);

app.on('web-contents-created', (event, contents) => {
  contents.on('new-window', (event, navigationUrl) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    event.preventDefault()

    shell.openExternal(navigationUrl)
  })
})
