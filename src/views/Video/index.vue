<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <!-- 头部组件 -->
    <AppHeader />
    <!-- 返回 -->
    <van-nav-bar :title="data.list.videoTitle" left-text="返回" left-arrow @click-left="onClickLeft" />
    <!-- 视频播放 -->
    <VideoPlay :videoInfo="data.list" />
    <!-- 视频详情 -->
    <VideoDetail :videoInfo="data.list" />
    <!-- 底部推荐与评论 -->
    <VideoBottomTab :recommendList="data.recommendList" :commentList="data.commentList" :upName="data.list.author" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from "vue"
import { useRoute } from "vue-router"
import axios from "axios"
import { InitData } from "@/type/video_play"
import AppHeader from "@/components/AppHeader.vue"
import VideoPlay from '@/views/Video/components/VideoPlay.vue'
import VideoDetail from '@/views/Video/components/VideoDetail.vue'
import VideoBottomTab from '@/views/Video/components/VideoBottomTab.vue'

const route = useRoute()
const data = reactive(new InitData())

onMounted(() => {
  getData()
  getRecommend()
  getComments()
})

const getData = () => axios({
  url: '/videoDetail',
  method: "get",
  params: { id: route.params.id }
}).then((res) => {
  data.list = res.data.result
})

const getRecommend = () => axios({
  url: '/recommendList',
  method: "get"
}).then((res) => {
  data.recommendList = res.data.result
})

const getComments = () => axios({
  url: '/commentsList',
  method: "get"
}).then((res) => {
  data.commentList = res.data.result.items
})

const onClickLeft = () => {
  history.back()
}

</script>

<style scoped>
</style>
