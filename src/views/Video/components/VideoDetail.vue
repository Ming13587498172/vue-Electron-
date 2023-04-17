<template>
  <div>
    <div class="detail">
      <h5>{{ videoInfo.videoTitle }}</h5>
      <van-cell is-link>
        <template #title>
          <van-image round width="2rem" height="2rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
          {{ videoInfo.author }}
        </template>
        <template #right-icon>
          <span>
            <i>{{ videoInfo.playCount }}观看</i>
            <i>
              <van-icon name="good-job" />
              {{ videoInfo.likeCount }}
            </i>
            <i>
              <van-icon name="star" />
              {{ videoInfo.favCount }}
            </i>
          </span>
        </template>
      </van-cell>
    </div>
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
.detail {
  padding: 2% 4% 0 4%;
  .van-cell {
    padding: 2% 0 0 0;
    .van-cell__title {
      .van-image {
        vertical-align: middle;
      }
    }
    span {
      width: 70%;
      text-align: right;
      i {
        &:nth-of-type(2) {
          margin: 0 4%;
        }

        &:nth-of-type(3) {
          padding: 0 4% 0 0;
        }
      }
    }
  }
}
</style>
