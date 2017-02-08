const url = require('url');
const path = require('path');
const webpack = require('webpack');
const config  = require('./webpack/renderer')
const { app, BrowserWindow } = require('electron');

let window = null;

function openWindow(err) {
    if (err) console.error(err);
    window = new BrowserWindow({ width: 800, height: 600 });
    window.openDevTools();
    window.loadURL(url.format({
      pathname: path.join(__dirname, 'pages', 'index.html'),
      protocol: 'file:',
      slashes: true
    }));     
    window.on('closed', () => window = null );
}

function startupApplication() {
    webpack(config).run(openWindow);
}

app.on('ready', startupApplication);

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
  if (window === null) {
    startupApplication();
  }
})