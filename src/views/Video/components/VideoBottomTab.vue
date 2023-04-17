<template>
  <div>
    <van-tabs ref="tab" v-model:active="active">
      <van-tab title="推荐">
        <ContentMain :list="recommendList" />
      </van-tab>
      <van-tab title="评论">
        <ContentComment :list="commentList" :upName="upName" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps, onMounted, onUnmounted } from 'vue'
import ContentMain from '@/components/ContentMain.vue'
import ContentComment from '@/components/ContentComment.vue'
import type { PropType } from 'vue'
import { commentInt } from '@/type/video_play'
import { ListInt } from '@/type/home_main'

defineProps({
  recommendList: {
    type: Array as PropType<ListInt[]>,
    required: true
  },
  commentList: {
    type: Array as PropType<commentInt[]>,
    required: true
  },
  upName: {
    type: String
  }
})


const active = ref(0)
let timer = ref()
const tab = ref()

onMounted(() => {
  // 开启定时器
  timer.value = setTimeout(() => {
    // tab重绘，解决tab栏下划线位置异常
    tab.value.resize()
  }, 600)
})

// 在页面销毁之前先销毁定时器
onUnmounted(() => {
  clearTimeout(timer.value)
  timer.value=""
})

</script>

<style scoped lang="scss">

</style>
