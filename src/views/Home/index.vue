<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- 头部组件 -->
    <AppHeader />
    <!-- 频道组件 -->
    <HomeChannel />
    <!-- 轮播组件 -->
    <HomeSwipe />
    <!-- 内容组件 -->
    <ContentMain :list="data.list" />
    <!-- 底部组件 -->
    <BottomTabbar />
    <!-- 返回顶部 -->
    <van-back-top bottom="10vh" />
  </div>
</template>

<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import BottomTabbar from '@/components/BottomTabbar.vue'
import ContentMain from '@/components/ContentMain.vue'
import HomeChannel from '@/views/Home/components/HomeChannel.vue'
import HomeSwipe from '@/views/Home/components/HomeSwipe.vue'

import axios from 'axios';
import { onMounted, reactive } from 'vue'
import { InitData } from '@/type//home_main'

const data = reactive(new InitData())

onMounted(() => {
  getData()
})

const getData = () => axios ({
  url: '/videosList',
  method: 'get'
}).then(res => {
  data.list = res.data.result
})

</script>

<style scoped lang="scss">
.van-grid {
  padding: 0 0 14% 0;
  .van-grid-item {
    // width: 50%;
    ::v-deep .main{
      width: 50%;
    }
    ::v-deep .van-image {
      position: relative;
      ::v-deep .imgText {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        color: #fff;
        ::v-deep span {
          &:nth-of-type(2) {
            float: right;
          }
        }
      }
    }
    ::v-deep .contentDesc {
      width: 99%;
      font-size: 12px;
      white-space: nowrap;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}
</style>
