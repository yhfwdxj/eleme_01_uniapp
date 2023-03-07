<template>
  <view class="search-result" v-if="searchRest">
    <text>搜索结果:</text>
  </view>
  <view class="shop-list" v-for="item,i in curRest" :key="i" @click="goShop(item)">
    <view class="img-info">
      <img :src="imgBaseUrl + item.image_path" alt="" srcset="" class="shop-img">
    </view>
    <view class="shop-info">
      <view class="shop-name">
        {{item.name}}
      </view>
      <view class="little-info">
        <view class="star">
          <my-star :rating="item.rating"></my-star>
          <text class="rating">{{item.rating}}分</text>
        </view>
        <view class="sale-time">
          <view class="sale-info">
            <text>月售:{{item.recent_order_num}}</text>
            <text>{{item.order_lead_time}}</text>
            <text>{{item.distance}}</text>
          </view>
        </view>
        <view class="fee">
          <text>起送￥{{item.float_minimum_order_amount}}</text>&nbsp;
          <text>{{item.piecewise_agent_fee.tips}}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    computed,
    watch
  } from 'vue'
  const props = defineProps(['curCityList', 'curRest', 'searchRest'])
  const imgBaseUrl = 'https://elm.cangdu.org/img/'
  // const imgBaseUrl = '/img/'
  let curCityList = computed(() => props.curCityList)
  let curRest = computed(() => props.curRest)
  let searchRest = computed(() => props.searchRest)
  let rating = curRest.rating
  watch(searchRest, (newValue, oldValue) => {
    if (searchRest.value) {
      curRest = searchRest
    }
  }, {
    immediate: true
  })
  const goShop = (item) => {
    uni.navigateTo({
      url: `/subpkg/shop/shop?shop_id=${item.id}`
    })
  }
</script>

<style lang="scss">
  .search-result {
    margin: 10rpx;
  }

  .shop-list {
    display: flex;
    justify-content: space-around;
    margin: 20rpx 0rpx;
    border-bottom: 2rpx solid rgb(206, 206, 206);

    .img-info {

      .shop-img {
        width: 300rpx;
        height: 200rpx;
      }
    }

    .shop-info {
      width: 55%;

      .shop-name {
        font-size: 38rpx;
      }

      .little-info {
        font-size: 25rpx;

        .star {
          margin-top: 10rpx;
          display: flex;
          height: 50rpx;

          .rating {
            margin-left: 6rpx;
          }
        }

        .sale-time {
          .sale-info {
            display: flex;
            justify-content: space-between;
          }
        }

        .fee {
          margin-top: 10rpx;
        }
      }
    }
  }
</style>
