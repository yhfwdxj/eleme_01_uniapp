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
  let geohash = ref('')
  onLoad((options) => {
    id = options.city_id
    geohash = options.geohash
    console.log(geohash);
  })
  const props = defineProps(['placeholder'])
  const emit = defineEmits(['searchContext', 'searchRestaurants'])
  const keyword = ref('')
  let res = ref('')
  let res2 = ref('')
  const search = async () => {
    if (id && keyword.value) {
      // res = await request({
      //   url: `v1/pois?city_id=${id}&keyword=${keyword.value}&type=search`
      // })
      res = await uni.request({
        url: `http://apis.map.qq.com/ws/place/v1/search?key=PVABZ-4IO6D-4WK47-PKUCM-TD4DV-WOF6U&keyword=${encodeURI(keyword.value)}&boundary=nearby(${geohash},1000,1)`,
        method: 'get'
      })

      emit('searchContext', res)
    } else {
      res = await request(({
        url: `v4/restaurants?geohash=${geohash}&keyword=${keyword.value}`
      }))
      emit('searchRestaurants', res)
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
