<template>
  <view style="background-color: rgb(245, 245, 245);">
    <view class="header-container">
      <view class="location" @click="goCityList">
        <text>{{curCityList.name}}</text>
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
    <view class="search-box">
      <my-search></my-search>
    </view>
    <swiper :indicator-dots="true" :autoplay="true" :interval="5000" :duration="1000">
      <swiper-item>
        <view class="nav">
          <view class="nav-list" v-for="item,index in data1" :key="index">
            <img :src="item.image_url" alt="">
            <text>{{item.title}}</text>
          </view>
        </view>
      </swiper-item>
      <swiper-item>
        <view class="nav">
          <view class="nav-list" v-for="item,index in data2" :key="index">
            <img :src="item.image_url" alt="">
            <text>{{item.title}}</text>
          </view>
        </view>
      </swiper-item>
    </swiper>
    <view class="recommend-shop">
    </view>
  </view>
</template>
<script setup>
  import {
    inject,
    ref,
    computed
  } from 'vue'
  import {
    onLoad
  } from '@dcloudio/uni-app'
  import {
    useStore
  } from 'vuex'
  const store = useStore()
  const request = inject('request')
  store.dispatch('city/getCityList', 'guess')
  const curCityList = computed(() => store.state.city.curCityList)
  let data1 = ref()
  let data2 = ref()
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
  const goCityList = () => {
    uni.navigateTo({
      url: '/subpkg/city/city'
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

  swiper {
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

    .location {
      margin-left: 15rpx;
      height: 50%;
      display: flex;
      justify-content: center;

      text {
        position: relative;
        line-height: 30rpx;

        ::after {
          content: '';
          position: absolute;
          top: 10rpx;
          border-top: 10rpx solid #5b5b5b;
          border-bottom: 10rpx solid transparent;
          border-left: 10rpx solid transparent;
          border-right: 10rpx solid transparent;
        }
      }

    }

    .shop-cart-message {
      display: flex;
      width: 160rpx;
      justify-content: space-around;
    }
  }
</style>
