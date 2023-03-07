<template>
  <view class="location-container" v-if="curCity">
    <view class="cur-city">
      <view>当前城市:{{curCity.name}}</view>
      <view style="margin-right: 10rpx;color: blue;" @click="changeCity">
        <text>切换城市</text>
      </view>
    </view>
    <view class="input">
      <my-search :placeholder='placeholder' @searchContext='searchContext' :cityId='cityId' :geohash='geohash'>
      </my-search>
    </view>
    <view class="search-result" v-if="res">
      <view class="search-list" v-for="item,i in res" :key="i" @click="curAddress(item)">
        <view class="name">{{item.name}}</view>
        <view class="address">{{item.address}}</view>
      </view>
    </view>
    <view class="search-result" v-else>
      <view class="history">
        <text>历史选择地址:</text>
      </view>
      <view class="search-list" v-for="item,i in curplace" :key="i" @click="goIndex(item)">
        <view class="name">{{item.name}}</view>
        <view class="address">{{item.address}}</view>
      </view>
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
    useStore
  } from 'vuex'
  import {
    request
  } from '@/utils/request.js'
  const store = useStore()
  let curCity = ref(0)
  let geohash = ref('')
  let cityId = ref('')
  onLoad(async (options) => {
    cityId.value = options.city_id
    geohash.value = options.geohash
    curCity.value = await request({
      url: `v1/cities/${cityId.value}`
    })
    let allplace = JSON.parse(uni.getStorageSync('curplace') || '[]')
    curplace.value = allplace
  })
  let res = ref()
  const placeholder = ref('请输入地址')
  const searchContext = (emit) => {
    if (emit.data) {
      res.value = emit.data.data
    } else {
      uni.showToast({
        title: '无返回内容',
        icon: 'error'
      })
    }
  }
  const changeCity = () => {
    uni.navigateTo({
      url: `/subpkg/city/city`
    })
  }
  let curplace = ref([])
  let setflag = true
  const curAddress = (item) => {
    let allplace = JSON.parse(uni.getStorageSync('curplace') || '[]')
    let setPlace = new Map()
    allplace.push(item)
    let res = allplace.filter((item2) => {
      return !setPlace.has(item2.id) && setPlace.set(item2.id, item2.id)
    })
    console.log(res);
    uni.setStorageSync('curplace', JSON.stringify(res))
    uni.removeStorageSync('address');
    uni.setStorageSync('address', JSON.stringify(item))
    uni.switchTab({
      url: "/pages/index/index"
    })
  }
  const goIndex = (item) => {
    uni.removeStorageSync('address');
    uni.setStorageSync('address', JSON.stringify(item))
    uni.switchTab({
      url: "/pages/index/index"
    })
  }
</script>

<style lang="scss">
  .location-container {
    .cur-city {
      margin-top: 10rpx;
      margin-left: 10rpx;
      display: flex;
      justify-content: space-between;
    }

    .input {
      margin-top: 20rpx;
    }

    .search-result {
      margin-top: 20rpx;

      .history {
        margin: 20rpx 10rpx;
        border-bottom: 2rpx solid rgb(228, 228, 228);
        font-size: 40rpx;
      }

      .search-list {
        margin: 10rpx 15rpx;
        border-bottom: 2rpx solid rgb(228, 228, 228);

        .name {
          font-size: 36rpx;
        }

        .address {
          font-size: 30rpx;
          color: rgb(153, 153, 153)
        }
      }
    }
  }
</style>
