<template>
  <div>
    <van-grid :column-num="2">
      <van-grid-item v-for="item in list" :key="item.id" icon="photo-o" text="文字" @click="handleClick(item)">
        <van-image :src="'https://images.weserv.nl/?url=' + item.imgSrc" >
          <p class="imgText">
            <span>
              <van-icon name="video-o" />{{ item.playCount }}
            </span>
            <span>
              <van-icon name="notes-o" />{{ item.commentCount }}
            </span>
          </p>
        </van-image>
        <p class="contentDesc">{{ item.desc }}</p>
      </van-grid-item>
    </van-grid>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'
import type { PropType } from 'vue'
import { ListInt } from '@/type/home_main'

const router = useRouter()

defineProps({
  list: {
    type: Array as PropType<ListInt[]>,
    required: true
  }
})

const handleClick = (val: ListInt) => {
  router.push(`/Video/${val.id}`)
}

</script>

<style scoped lang="scss">
.van-grid {
  padding: 0 0 14% 0;
  .van-grid-item {
    width: 50%;
    .van-image {
      position: relative;
      width: 100%;
      height: 100%;
      .imgText {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        color: #fff;
        span {
          &:nth-of-type(2) {
            float: right;
          }
        }
      }
    }
    .contentDesc {
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
