<template>
  <view class="adress-container">
    <view class="address" v-for="item,i in location" :key="i">
      <text :class="i===active?'active':''" @click="changeActive(i,item)">{{item.address}}</text>
    </view>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  import {
    onLoad
  } from '@dcloudio/uni-app'
  let location = ref()
  let active = ref(0)
  onLoad(() => {
    location.value = JSON.parse(uni.getStorageSync('curplace') || '[]')
    console.log(location.value);
  })
  const changeActive = (i, item) => {
    location.value.map((item, index) => {
      if (index === i) {
        location.value.unshift(location.value.splice(i, 1)[0])
        console.log(location.value);
        uni.setStorageSync('curplace', JSON.stringify(location.value))
      }
    })
    uni.setStorageSync('address', JSON.stringify(item.address))
  }
</script>

<style lang="scss">
  .adress-container {
    margin-top: 1%;

    .address {
      height: 80rpx;
      display: flex;
      align-items: center;
      border: 2rpx solid rgb(200, 200, 200);
      flex-direction: row;
      font-size: 30rpx;

      .active {
        &::before {
          content: '默认';
          background-color: rgb(251, 240, 225);
          color: rgb(228, 132, 63);
          margin-right: 10rpx;
          margin-left: 10rpx;
        }
      }
    }
  }
</style>
