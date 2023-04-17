// eslint-disable-next-line @typescript-eslint/no-var-requires
const { app, BrowserWindow, Menu, ipcMain, globalShortcut } = require('electron')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const remote = require("@electron/remote/main") //1 

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true'

let mainId = null
let timer

// 创建窗口
const createWindow = () => {
  let win = new BrowserWindow({
    width: 375,
    height: 667,
    // frame:false, // 无边框且禁止拖动
    // transparent: true, // 窗口是否透明 ----- 当打开开发者工具时，窗口将不透明
    // autoHideMenuBar: true,  //  窗口菜单栏是否隐藏 ----- 用户单击 Alt 键时显示
    resizable: false, // 是否禁止窗口拉伸
    show: false, // 窗口创建完是否立刻显示
    icon: './src/assets/logo.png', //  设置窗口图标
    // title: 'First-Electron', // 设置窗口标题 ----- 如果html里边设置了title标签 或 package.json里设置了name，electron窗口设置的title就会被覆盖掉。
    // 网页功能设置
    webPreferences: {
      nodeIntegration: true,  // 允许node集成环境
      contextIsolation: false, // 可以使用require方法
      enableRemoteModule: true, //  可以使用remote方法
    }
  })

  mainId = win.id
  win.setSize(375, 667)

  // 自定义菜单 ----- 菜单模板
  const menuTemp = [
    {
      label: '文件',
      submenu: [
        {
          label: '关闭窗口'
        },
        {
          type: 'separator'
        },
        {
          label: '退出'
        }
      ]
    },
    {
      label: '编辑',
      submenu: [
        {
          label: '撤销',
        },
        {
          label: '恢复'
        },
        {
          type: 'separator'
        },
        {
          label: '剪切',
          role: 'cut'
        },
        {
          label: '复制',
          role: 'copy'
        },
        {
          label: '粘贴',
          role: 'paste'
        },
      ]
    },
    {
      label: '选择',
      submenu: [
        {
          label: '全选'
        }
      ]
    },
    {
      label: '查看'
    },
    {
      label: '帮助',
      submenu: [
        {
          label: '关于',
          role: 'about'
        }
      ]
    },
  ]
  // 实例化模板
  const menu = Menu.buildFromTemplate(menuTemp)
  // 将菜单添加到应用里
  Menu.setApplicationMenu(menu)

  remote.initialize()//2
  remote.enable(win.webContents)//3

  win.loadURL('http://192.168.1.110:8080/')

  // 在加载页面时，渲染进程第一次完成绘制时，如果窗口还没有被显示，渲染进程会发出 ready-to-show 事件
  win.on('ready-to-show', () => {
    win.show()
  })

  // 打开开发者工具
  // 默认状态，开发者工具的位置是上一次工具打开的位置
  // win.webContents.openDevTools()
  // 指定打开的位置状态 {mode:'xxxx'} left、right、bottom、detach
  // win.webContents.openDevTools({ mode: 'detach' })

  win.on('close', () => {
    win = null
  })
}

// app加载成功后调用
app.on('ready', createWindow)
// 另一种方法调用
// app.whenReady().then(() => { //  得到一个当Electron已初始化后fulfill 的 Promise
//   createWindow()
// })
app.on('ready', () => {
  // 全局快捷键的注册
  globalShortcut.register('ctrl + a', () => { //  返回一个布尔值
    console.log('ctrl + a 快捷键注册成功')
  })
  // 判断快捷键是否创建成功  布尔值
  console.log(globalShortcut.isRegistered('ctrl + a'))
})
// 当所有的窗口都被关闭时触发
/**
 * will-quit  -----   关闭所有窗口且应用即将退出
 * window-all-closed  -----   关闭所有窗口且应用未退出，如果调用了app.quit()会先尝试关闭所有的窗口再触发will-quit事件
 */
// app.on('will-quit', () => {
//   console.log('browser-window-focus')
// })
app.on('window-all-closed', () => {
  clearTimeout(timer)
  // 注销指定快捷键
  globalShortcut.unregister('ctrl + a')
  // 注销所有快捷键
  globalShortcut.unregisterAll()
  // 退出应用
  app.quit()
})

// ==========================================================================
// 主进程与渲染进程 接收/发送消息等操作
// 根据名称进行接收
ipcMain.on('msg1', (e, res) => { // 异步接收/发送
  console.log(res)
  e.sender.send('msg1Re', '来自主进程的异步消息')
})
ipcMain.on('msg2', (e, res) => { // 同步接收/发送
  console.log(res)
  e.returnValue = '来自主进程的同步消息'
})
// 渲染进程与渲染进程 
ipcMain.on('msg3', (e, res) => {  //  渲染index -> 渲染login
  const mainWindow = BrowserWindow.fromId(res.WinId)
  // 发送消息给渲染进程login
  timer = setTimeout(() => {
    mainWindow.webContents.send('msg4Re', res.WinId)
  }, 200)
  // mainWindow.webContents.send('msg4Re', res.msg)
})
ipcMain.on('msg4', (e, res) => {  //  渲染login -> 渲染index
  if(res.msg === '登录成功') {
    BrowserWindow.fromId(res.WinId).close()
  }
  const mainWindow = BrowserWindow.fromId(mainId)
  // 发送消息给渲染进程index
  mainWindow.webContents.send('msg3Re', res)
})
