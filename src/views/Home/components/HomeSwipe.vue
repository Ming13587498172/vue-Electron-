<template>
  <div>
    <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
      <van-swipe-item v-for="item in data.list" :key="item.imgSrc">
        <img :src="'https://images.weserv.nl/?url=' + item.imgSrc" alt="">
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script setup lang="ts">
import axios from 'axios';
import { onMounted, reactive } from 'vue'
import { InitData } from '@/type/swiper'

const data = reactive(new InitData())

onMounted(() => {
  getSwiperList()
})

const getSwiperList = () => axios ({
  url: '/swiperList',
  method: 'get'
}).then(res => {
  data.list = res.data.result
})

</script>

<style scoped lang="scss">
.my-swipe .van-swipe-item {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
