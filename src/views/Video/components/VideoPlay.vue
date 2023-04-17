<template>
  <meta name="referrer" content="never">
  <div>
    <video controls class="video" :poster="videoInfo.poster" :src="videoInfo.videoSrc"></video>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps({
  videoInfo: {
    type: Object,
    required: true
  }
})

</script>

<style scoped lang="scss">
.video {
  width: 100%;
}
</style>
