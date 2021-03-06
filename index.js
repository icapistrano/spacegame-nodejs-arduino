'use strict';
require('electron-reload')(__dirname);

const { app, BrowserWindow } = require('electron')

const path = require('path');
// global.window = path.resolve(__dirname);


function createWindow () {
  const win = new BrowserWindow({
    fullscreen:true,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        // enableRemoteModule: true
    }
  })

  // win.setMenu(null);
  win.webContents.openDevTools();

  win.loadFile('static/main.html');
}

app.on('ready', () => {

    createWindow();

})
