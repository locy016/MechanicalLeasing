'use strict'

import { app, protocol, BrowserWindow, ipcMain } from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
// import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
const isDevelopment = process.env.NODE_ENV !== 'production'

// eslint-disable-next-line import/first
import { getConfigure, getInformation, setInformation, getDevices, getNotices, setNotices, getNoticeBySN } from './data-driven.js'

// Electron框架组件
const electron = require('electron')
// eslint-disable-next-line no-unused-vars
const { dialog } = require('electron')
const Menu = electron.Menu
const globalShortcut = electron.globalShortcut
// 引用fs，基于Node.js解析文件
// eslint-disable-next-line no-unused-vars
const fs = require('fs')

const docxtemplater = require('docxtemplater')
const pizzip = require('pizzip')

let win

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])

async function createWindow () {
  Menu.setApplicationMenu(null) // 隐藏菜单栏
  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 900,
    title: '工程机械设备租赁管理',
    frame: true,
    webPreferences: {
      webSecurity: false, // 取消跨域限制
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: true,
      contextIsolation: false // !process.env.ELECTRON_NODE_INTEGRATION
    }
  })

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
}

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
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // try {
    //   await installExtension(VUEJS_DEVTOOLS)
    // } catch (e) {
    //   console.error('Vue Devtools failed to install:', e.toString())
    // }
  }
  createWindow()
})

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

function exit () {
  // 注销所有快捷键
  globalShortcut.unregisterAll()
  app.quit()
}

// 注册全局快捷键
app.whenReady().then(() => {
  // 注册Ctrl+F1快捷键事件
  globalShortcut.register('CommandOrControl+F1', () => {
    exit()
  })
})

// 监听渲染进程通信
ipcMain.on('getConfigure', (event) => {
  getConfigure(res => {
    event.sender.send('getConfigure', res)
  })
})

// 监听渲染进程通信
ipcMain.on('getInformation', (event) => {
  getInformation(res => {
    event.sender.send('getInformation', res)
  })
})

ipcMain.on('setInformation', (event, json) => {
  setInformation(json, res => {
    event.sender.send('setInformation', res)
  })
})

ipcMain.on('getDevices', (event) => {
  getDevices(res => {
    event.sender.send('getDevices', res)
  })
})

ipcMain.on('getNotices', (event) => {
  getNotices(res => {
    event.sender.send('getNotices', res)
  })
})

ipcMain.on('setNotices', (event, json) => {
  setNotices(json, res => {
    event.sender.send('setNotices', res)
  })
})

ipcMain.on('imptDocx', (event) => {
  dialog.showOpenDialog({ filters: [{ name: 'docx', extensions: ['docx'] }], properties: ['openFile'] }).then(res => {
    if (!res.canceled) {
      console.log('文件信息', res.filePaths[0])
      const content = fs.readFileSync(res.filePaths[0])
      const path = (process.env.WEBPACK_DEV_SERVER_URL) ? 'template/' : 'resources/template/' // 数据库文件的路径
      fs.writeFileSync(path + 'notice.docx', content)
      event.sender.send('imptDocx', { msg: '文件已保存。' })
    }
  })
})

ipcMain.on('outDocx', (event, SerialNumber) => {
  if (SerialNumber) {
    dialog.showSaveDialog({ properties: ['createDirectory '] }).then(res => {
      if (res.canceled) {
        // 取消保存事件
      } else {
        // 输出数据
        getNoticeBySN(SerialNumber, data => {
          console.log('查询结果', data)
          const path = (process.env.WEBPACK_DEV_SERVER_URL) ? 'template/' : 'resources/template/' // 数据库文件的路径
          const content = fs.readFileSync(path + 'notice.docx', 'binary')
          // eslint-disable-next-line new-cap
          const zip = new pizzip(content)
          // eslint-disable-next-line new-cap
          const doc = new docxtemplater()
          doc.loadZip(zip)
          doc.setData({
            UnitName: data.UnitName,
            Tel: data.Tel,
            Phone: data.Phone,
            DeviceName: data.DeviceName,
            DeviceModel: data.DeviceModel,
            DeviceNumber: data.DeviceNumber,
            RecordNumber: data.RecordNumber,
            ProductionUnit: data.ProductionUnit,
            PropertyUnit: data.PropertyUnit,
            SerialNumber: data.SerialNumber,
            ProjectName: data.ProjectName,
            ProjectAddress: data.ProjectAddress,
            UserUnit: data.UserUnit,
            InstallDate: data.InstallDate,
            SafetyOfficer: data.SafetyOfficer,
            ProjectDate: data.ProjectDate
          })
          try {
            doc.render()
          } catch (err) {
            console.log('提交数据出现异常：', err)
          }
          var buf = doc.getZip().generate({ type: 'nodebuffer' })
          fs.writeFileSync(res.filePath + '.docx', buf)
        })
      }
    }).catch(_err => {
      console.log('_err', _err)
    })
  }
})
