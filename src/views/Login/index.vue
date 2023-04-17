<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="box">
    <div class="main">
      <van-image :src="require('@/assets/images/bilibili.webp')" />
    </div>
    <div class="main">
      <van-form ref="LoginForm" :model="ruleForm" validate-trigger="onSubmit" @submit="onSubmit">
        <van-cell-group inset>
          <van-field v-model="ruleForm.username" name="username" label="用户名" placeholder="请输入用户名"
            :rules="userForm.username" />
          <van-field v-model="ruleForm.password" type="password" name="password" label="密码" placeholder="请输入密码"
            :rules="userForm.password" />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button block type="primary" color="#fd7299" native-type="submit">提交</van-button>
        </div>
        <p>
          <span>注册</span>
          <span>忘记密码</span>
        </p>
      </van-form>
    </div>
    <div class="main">
      <van-image :src="require('@/assets/images/Login_Bottom.jpg')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { LoginData } from '@/type/login'
import type { FormInstance } from 'vant'
import { showFailToast, showSuccessToast } from 'vant'
import { reactive, ref } from 'vue'

const { ruleForm } = reactive(new LoginData())
const LoginForm = ref<FormInstance>()
let WinId: number

// ==============================      渲染进程与渲染进程之间通信      ==============================
// 消息接收/发送等操作
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { ipcRenderer } = require("electron")
ipcRenderer.send('msg4', '来自渲染进程login向渲染进程index发送的异步消息') // send --> 异步API发送消息
// 根据名称进行接收
// eslint-disable-next-line @typescript-eslint/no-explicit-any
ipcRenderer.on('msg4Re', (e: object, res: number) => {
  WinId = res
})
// ================================================================================================


// 表单验证
const userForm = reactive({
  username: [
    { required: true, message: '用户名不能为空' },
    // {
    //   validator: (val: string) => {
    //     return val === 'admin'
    //   },
    //   // message: '用户名或密码错误！'
    // }
  ],
  password: [
    { required: true, message: '密码不能为空' },
    // {
    //   validator: (val: string) => {
    //     return val === '123456'
    //   },
    //   // message: '用户名或密码错误！'
    // }
  ],
})

// 登录
const onSubmit = async (formVal: { username: string; password: string; }) => {
  try {
    // await LoginForm.value?.validate()
    if (formVal.username !== 'admin' || formVal.password !== '123456') {
      showFailToast('用户名或密码错误！')
    } else {
      showSuccessToast('登录成功！')
      ipcRenderer.send('msg4', { msg: '登录成功', WinId: WinId })
    }
  } catch (err) {
    console.log(err, 'err')
  }
}

</script>

<style scoped lang="scss">
.box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .main {
    width: 100%;
    height: 100%;

    &:nth-of-type(1) {
      height: 20%;
    }

    &:nth-of-type(2) {
      height: 40%;
      display: flex;
      justify-content: center;
      align-items: center;

      .van-form {
        p {
          padding: 0 6%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #ff6494;
          font-weight: 700;
        }
      }
    }

    &:nth-of-type(3) {
      height: 40%;
    }

    .van-image {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
