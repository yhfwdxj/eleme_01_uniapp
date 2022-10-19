<template>
  <view class="location-container">
    <view class="cur-location">
      <view class="tips">
        <text>当前定位城市:</text>
      </view>
      <view class="cur-city" v-if="curCityList" @click="goToCity">
        <text class="text">{{curCityList.name}}</text>
      </view>
    </view>
    <view class="hot-loaction">
      <view class="tips2" @click="test">
        <text>热门城市:</text>
      </view>
      <view class="hot-city">
        <view v-for="(item,index) in hotCityList" :key="index" class="hot-city-list" @click="changeCur(item)">
          {{item.name}}
        </view>
      </view>
    </view>
    <view class="group-city" v-for="order,k,i in groupCityOrder" :key="i">
      <view class="group-text">
        <text v-if="i === 0">按首字母排序 &nbsp;</text>
        <text class="single">{{k}}:</text>
      </view>
      <view class="group-container" v-for="orderList,i in order" :key="i">
        <text class="city-name" @click="changeCur2(orderList)">{{orderList.name}}</text>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    computed,
    reactive
  } from 'vue'
  import {
    onLoad
  } from '@dcloudio/uni-app'
  import {
    useStore
  } from 'vuex'
  const store = useStore()
  onLoad(() => {
    store.dispatch('city/getCityList', 'guess')
    store.dispatch('city/getCityList', 'hot')
    store.dispatch('city/getCityList', 'group')
  })
  const curCityList = computed(() => store.state.city.curCityList)
  const hotCityList = computed(() => store.state.city.hotCityList)
  const groupCityList = computed(() => store.state.city.groupCityList)
  const groupCityOrder = computed(() => {
    let group = reactive({})
    for (let i = 65; i <= 90; i++) {
      if (groupCityList.value[String.fromCharCode(i)]) {
        group[String.fromCharCode(i)] = groupCityList.value[String.fromCharCode(i)]
      }
    }
    return group
  })
  const goToCity = () => {
    uni.navigateTo({
      url: '/subpkg/location/location?city_id=' + curCityList.value.id
    });
  }
  const changeCur = (item) => {
    uni.navigateTo({
      url: '/subpkg/location/location?city_id=' + item.id
    });
  }
  const changeCur2 = (item) => {
    uni.navigateTo({
      url: '/subpkg/location/location?city_id=' + item.id
    });
  }
</script>

<style lang="scss">
  %font-color {
    color: rgb(49, 157, 237);
    font-size: 40rpx;
  }

  %box-style {
    border-bottom: 2rpx solid rgb(228, 228, 228);
    padding-bottom: 20rpx;
    margin-bottom: 20rpx;
    margin-left: 10rpx;
  }

  .location-container {
    background-color: rgb(245, 245, 245);
    margin: 20rpx auto;

    .cur-location {
      margin-bottom: 20rpx;
      background-color: white;

      .tips {
        @extend %box-style
      }

      .cur-city {
        @extend %box-style;

        .text {
          @extend %font-color;

          ::after {
            content: '>';
            right: 10rpx;
            position: absolute;
            font-size: 40rpx;
          }
        }
      }
    }

    .hot-loaction {
      margin-top: 40rpx;
      background-color: white;
      padding-bottom: 5rpx;

      .tips2 {
        margin-left: 10rpx;
        border-top: 2rpx solid rgb(228, 228, 228);
        height: 80rpx;
        line-height: 80rpx;
      }

      .hot-city {
        font-size: 40rpx;
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-wrap: wrap;

        .hot-city-list {

          text-align: center;
          width: 180rpx;
          border: 1px solid rgb(228, 228, 228);
        }
      }
    }

    .group-city {
      margin-top: 40rpx;
      background-color: white;
      display: flex;

      flex-wrap: wrap;

      .group-text {
        margin-left: 10rpx;
        width: 100%;
      }

      .group-container {
        margin: 3% 1%;
        font-size: 35rpx;
        width: 30%;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border: 1px solid rgb(228, 228, 228);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

    }
  }
</style>
