<template>
  <header class="app-header">
    <!-- logo -->
    <a class="logo" href="#" @click="handleLogo">
      <i class="iconfont Navbar_logo"></i>
    </a>
    <!-- 搜索 -->
    <a class="search" href="#">
      <i class="iconfont ic_search_tab"></i>
    </a>
    <!-- 头像 -->
    <a class="face" href="#" @click="handleLogin">
      <img src="@/assets/images/login.png" />
    </a>
    <!-- 下载按钮 -->
    <div class="down-app" @click="handleDialog">下载 APP</div>
  </header>
</template>

<script setup lang="ts">
// eslint-disable-next-line @typescript-eslint/no-var-requires
const remote = require("@electron/remote")

// ==============================      主进程与渲染进程之间通信      ===============================
// 消息接收/发送等操作
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = require("electron")
ipcRenderer.send('msg1', '来自渲染进程index发送的异步消息') // send --> 异步API发送消息
// 根据名称进行接收
ipcRenderer.on('msg1Re', (e: object, res: string) => {
  console.log(res)
})
// sendSync --> 同步API发送消息  同时定义变量接收传来的消息
let val = ipcRenderer.sendSync('msg2', '来自渲染进程index发送的同步消息')
console.log(val)
// ===============================================================================================

// 打开新窗口 --- 登录窗口
const handleLogin = () => {
  let loginWin = new remote.BrowserWindow({
    parent: remote.getCurrentWindow(),
    width: 375,
    height: 667,
    resizable: false,
    show: false,
    modal: true, //  默认false(允许)，打开子窗口时是否允许操作父窗口
    icon: './src/assets/logo.png',
    title: 'First-Electron',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: true
    }
  })

  // ==============================      渲染进程与渲染进程之间通信      ==============================
  ipcRenderer.send('msg3', { msg: '来自渲染进程index向渲染进程login发送的异步消息', WinId: loginWin.id }) // send --> 异步API发送消息
  // 根据名称进行接收
  ipcRenderer.on('msg3Re', (e: object, res: string) => {
    console.log(res)
  })
  // ================================================================================================

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  require("@electron/remote/main").enable(loginWin.webContents)
  loginWin.loadURL('http://192.168.1.110:8080/Login')

  loginWin.on('ready-to-show', () => {
    loginWin.show()
  })

  loginWin.on('close', () => {
    loginWin = null
  })

  // loginWin.webContents.openDevTools({ mode: 'detach' })
}

// electron 打开Dialog
const handleDialog = () => {
  remote.dialog.showOpenDialog({
    title: '测试Electron-Dialog',
    filters: [
      { name: '图片文件', extensions: ['jpg', 'png', 'gif', 'jpeg', 'webp', 'svg', 'ico'] },
      { name: '媒体文件', extensions: ['mkv', 'avi', 'mp4'] },
      { name: '代码文件', extensions: ['html', 'js', 'json', 'vue', 'css', 'ts', 'txt'] },
      { name: '所有文件', extensions: ['*'] }
    ],
    /**
     * openFile  ------  允许选择文件
     * openDirectory  ------  允许选择文件夹
     * multiSelections  ------  允许多选
     * showHiddenFiles  ------  显示对话框中的隐藏文件
     */
    properties: ['openFile', 'multiSelections', 'showHiddenFiles']
  }).then((res: { canceled: boolean, filePaths: Array<[]> }) => {
    console.log(res)
    console.log('是否点击了取消按钮', res.canceled)
    console.log('文件路径', res.filePaths)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }).catch((err: any) => {
    remote.dialog.showErrorBox('自定义标题', err)
  })
}

// 打开通知卡
const handleLogo = () => {
  let option = {
    title: 'BiliBili提示',
    body: '这只是个通知卡，无任何功能',
    icon: '../assets/logo.png'
  }

  let myNotification = new window.Notification(option.title, option)
  myNotification.addEventListener('click', () => {
    console.log('点击了通知卡')
  })
}


</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  align-items: center;
  padding: 2vw 3vw;
  background-color: #fff;

  .logo {
    flex: 1;

    .Navbar_logo {
      color: #fb7299;
      font-size: 7.46667vw;
    }
  }

  .search {
    padding: 0 2vw;

    .ic_search_tab {
      color: #ccc;
      font-size: 5.86667vw;
    }
  }

  .face {
    padding: 0 4vw;

    img {
      width: 6.4vw;
    }
  }

  .down-app {
    font-size: 3vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fb7299;
    color: #fff;
    border-radius: 5px;
    padding: 5px 10px;
  }
}
</style>
