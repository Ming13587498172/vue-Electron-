<template>
  <div class="box">
    <div class="comment" v-for="item in list" :key="item.id">
      <van-row>
        <van-col span="4">
          <van-image round width="3rem" height="3rem" src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg" />
        </van-col>
        <van-col span="20">
          <p>
            {{ item.username }}
            <van-tag type="primary">LV6</van-tag>
            <van-tag type="primary" v-if="upName === item.username">UP</van-tag>
          </p>
          <p>{{ item.content }}</p>
          <p>
            <span>{{ item.date }}</span>
            <span>
              <van-icon name="good-job-o" />
            </span>
            <span>
              <van-icon name="good-job-o" />
            </span>
            <span  @click="showPopup">回复</span>
          </p>
        </van-col>
      </van-row>
    </div>

    <van-popup v-model:show="show" position="bottom" :style="{ height: '8%' }" >
      <template #default>
        <van-cell-group inset>
          <van-field v-model="value" right-icon="comment-o" />
        </van-cell-group>
      </template>
    </van-popup>

    <van-back-top />
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { PropType } from 'vue'
import { commentInt } from '@/type/video_play'

defineProps({
  list: {
    type: Array as PropType<commentInt[]>,
    required: true
  },
  upName: {
    type: String
  }
})

const show = ref(false)
const value = ref('')

const showPopup = () => {
  show.value = true;
}

</script>

<style scoped lang="scss">
.box {
  padding: 0 0 6% 0;

  .comment {
    padding: 2%;

    .van-row {
      .van-col {
        &:nth-of-type(2) {
          p {
            &:nth-of-type(1) {
              font-size: 14px;
              color: #FF6699;

              .van-tag {
                width: 20px;
                height: 10px;
                font-size: 8px;
                line-height: 10px;
                vertical-align: super;
                margin: 0 2%;

                &:nth-of-type(1) {
                  background: #F85A54;
                }

                &:nth-of-type(2) {
                  background: #FF88B0;
                }
              }
            }

            &:nth-of-type(2) {
              padding: 2% 0;
            }

            &:nth-of-type(3) {
              color: #999;
              font-size: 14px;

              span {
                margin: 0 2%;

                &:nth-of-type(3) {
                  .van-icon {
                    transform: rotateX(180deg);
                  }
                }
              }
            }
          }
        }
      }
    }

  }
}
</style>
