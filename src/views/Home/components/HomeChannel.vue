<template>
  <div>
    <van-tabs v-model:active="active">
      <van-tab :title="item.text" v-for="item in data.list" :key="item.id"></van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import axios from 'axios'
import { InitData } from '@/type/home'
 
const active = ref(0)
const data = reactive(new InitData())

onMounted(() => {
  getNavLsit()
})

const getNavLsit = () => axios({
  url: '/navList',
  method: 'get'
}).then(res => {
  data.list = res.data.result
})


</script>

<style scoped lang="scss">
</style>
