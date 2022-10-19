<template>
  <view class="my-search">
    <view class="search">
      <input type="search" :placeholder="placeholder" class="input-search" v-model="keyword">
    </view>
    <view class="text-container" @click="search">
      <text>搜索</text>
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
  import {
    request
  } from '@/utils/request.js'
  let id = ref('')
  onLoad((options) => {
    id = options.city_id
  })
  const props = defineProps(['placeholder'])
  const emit = defineEmits(['searchContext'])
  const keyword = ref('')
  let res = ref('')
  const search = async () => {
    if (id && keyword.value) {
      res = await request({
        url: `v1/pois?city_id=${id}&keyword=${keyword.value}&type=search`
      })
      emit('searchContext', res)
    }
  }
</script>

<style lang="scss">
  .my-search {
    display: flex;
    justify-content: space-between;
    border: 2rpx solid gray;
    width: 90%;
    margin-left: 5%;
    border-radius: 36rpx;
    background-color: #ffffff;
    height: 60rpx;

    .search {
      width: 80%;
      border-radius: 36rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .input-search {
        margin-left: 20rpx;
      }
    }

    .text-container {
      width: 20%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(253, 138, 75);
      border-radius: 36rpx;
      color: white;
    }
  }
</style>
