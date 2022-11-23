<template>
  <view class="star" @click="test">
    <view class="none">
      <img src="/static/none.png" alt="" srcset="" v-for="item,i in 5" :key="i" class="none-img" mode="widthFix">
    </view>
    <view class="have1" :style="'width:' + rating*150/5 + 'rpx'">
      <view class="have2">
        <img src="/static/have.png" alt="" srcset="" v-for="item,i in 5" :key="i" class="have-img" mode="widthFix">
      </view>
    </view>
  </view>
</template>

<script setup>
  const props = defineProps(['rating'])
  const rating = props.rating
  const test = () => {
    console.log(rating);
  }
</script>

<style lang="scss">
  %star-wh {
    width: 30rpx;
    height: 50rpx;
  }

  .star {
    .none {
      display: flex;
      width: 150rpx;
      height: 50rpx;

      .none-img {
        @extend %star-wh;
      }
    }

    .have1 {
      display: flex;
      position: relative;
      top: -53rpx;

      .have2 {
        width: 150rpx;
        height: 50rpx;
        white-space: nowrap;
        overflow: hidden;

        .have-img {
          @extend %star-wh;
        }
      }
    }
  }
</style>
