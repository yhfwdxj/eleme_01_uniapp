<template>
  <view style="background-color: rgb(245, 245, 245);">
    <view class="header-container">
      <view class="location" @click="goCityList">
        <view class="location-name" v-if="location">{{location}}</view>
        <view v-else>请选择送餐地址</view>
        <view class="top-border" />
      </view>
      <view class="shop-cart-message">
        <view class="cart">
          <img src="../../static/_购物车.png" alt="" :style="{width:40+'rpx' ,height:40+'rpx'}">
        </view>
        <view class="message">
          <img src="../../static/留言.png" alt="" :style="{width:40+'rpx' ,height:40+'rpx'}">
        </view>
      </view>
    </view>
    <view class="search-box" @click="goSearch">
      <my-search :placeholder='placeholder'></my-search>
    </view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000" class="swiper2">
      <swiper-item>
        <view class="nav">
          <view class="nav-list" v-for="item,index in data1" :key="index">
            <img :src="item.image_url" @click="swiper">
            <text>{{item.title}}</text>
          </view>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="nav">
          <view class="nav-list" v-for="item,index in data2" :key="index">
            <img :src="item.image_url" @click="swiper">
            <text>{{item.title}}</text>
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="recommend-shop">
      <my-restaurants v-bind='resList'></my-restaurants>
    </view>
  </view>
</template>
<script setup>
  import {
    ref,
    computed,
    reactive
  } from 'vue'
  import {
    onLoad,
    onShow,
    onReachBottom
  } from '@dcloudio/uni-app'
  import {
    useStore
  } from 'vuex'
  import {
    request
  } from '@/utils/request.js'
  const store = useStore()
  store.dispatch('city/getCityList', 'guess')
  let resList = reactive({
    curCityList: '',
    curRest: ''
  })
  resList.curCityList = computed(() => store.state.city.curCityList)
  resList.curRest = computed(() => store.state.restaurants.restList)
  let data1 = ref()
  let data2 = ref()
  let location = ref('')
  let latitude = ref()
  let longitude = ref()
  let curPlace = ref()
  let geohash = ref()
  const goSearch = () => {
    uni.navigateTo({
      url: `/subpkg/search/search?geohash=${ geohash.value}`
    })
  }
  onLoad(async () => {
    let res = await request({
      url: 'v2/index_entry'
    })
    res = res.map(item => {
      return {
        ...item,
        image_url: 'https://fuss10.elemecdn.com' + item.image_url
      }
    })
    data1.value = res.splice(0, 8)
    data2.value = res
  })
  onShow(() => {
    curPlace = JSON.parse(uni.getStorageSync('address') || '{}')
    if (curPlace.id) {
      latitude.value = curPlace.location.lat
      longitude.value = curPlace.location.lng
      location.value = curPlace.title
      geohash.value = `${latitude.value},${longitude.value}`
      store.dispatch('restaurants/getRestaurants', {
        latitude,
        longitude,
        order_by: 4,
        limit: 10
      })
    } else {
      uni.navigateTo({
        url: `/subpkg/city/city`
      })
    }
  })
  let offset = 10
  onReachBottom(() => {
    store.dispatch('restaurants/getRestaurants', {
      latitude,
      longitude,
      order_by: 4,
      limit: 10,
      offset
    })
    offset += 10
  })
  const goCityList = () => {
    uni.navigateTo({
      url: '/subpkg/city/city'
    })
  }
  const placeholder = ref('请输入商家或美食')
  const swiper = () => {
    uni.navigateTo({
      url: `/subpkg/swiperShop/swiperShop?latitude=${latitude.value}&longitude=${longitude.value}`
    })
  }
  // https://fuss10.elemecdn.com
</script>
<style lang="scss">
  %header-bgc {
    background-color: rgb(207, 27, 30);
  }

  @mixin flex {
    display: flex;
    justify-content: space-between;
  }

  .swiper2 {
    height: 350rpx;

    .nav {
      display: flex;
      justify-content: space-around;
      flex-wrap: wrap;
      width: 100%;
      margin-top: 10rpx;

      .nav-list {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;

        image {
          width: 100rpx;
          height: 100rpx;
        }
      }
    }
  }

  .search-box {
    @extend %header-bgc;
    padding-top: 10rpx;
    height: 80rpx
  }

  .header-container {
    @include flex();
    padding-top: 20rpx;
    @extend %header-bgc;
    height: 60rpx;

    .location {
      margin-left: 3%;
      display: flex;
      width: 60%;

      .location-name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .top-border {
        position: relative;
        top: 16rpx;
        border-top: 10rpx solid #5b5b5b;
        border-bottom: 10rpx solid transparent;
        border-left: 10rpx solid transparent;
        border-right: 10rpx solid transparent;
      }
    }

    .shop-cart-message {
      display: flex;
      width: 160rpx;
      justify-content: space-around;
      line-height: 60rpx;
    }
  }
</style>