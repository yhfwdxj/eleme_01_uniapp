<template>
  <view class="order-container" v-if="orderList.length>0">
    <view class="order">
      <view class="total-info" v-if="shop">
        <img :src="imgBaseUrl + shopImg" style="width: 80rpx;height: 80rpx;">
        <text>{{shop.name}}</text>
      </view>
      <view class="foods">
        <view class="foods-img">
          <view v-for="item,i in orderList" :key="i" class="img">
            <img :src="imgBaseUrl + item.image_path" style="width: 120rpx;height: 120rpx;">
          </view>
        </view>
        <view class="foods-num">
          <text>￥{{$store.getters['shopcart/total2']}}</text>
          <text>共{{orderList.length}}件</text>
        </view>
      </view>
      <view class="button">
        <view class="">
          <button class="buttons">评价</button>
        </view>
        <view class="">
          <button class="buttons" @click="again">再来一单</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    computed
  } from 'vue'
  import {
    useStore
  } from 'vuex'
  import {
    onLoad
  } from '@dcloudio/uni-app'
  import {
    request
  } from '@/utils/request.js'
  const store = useStore()
  let orderList = computed(() => store.state.shopcart.order)
  console.log(orderList);
  let shop = ref()
  let shopImg = ref()
  const imgBaseUrl = 'https://elm.cangdu.org/img/'
  onLoad(async () => {
    if (orderList.value.length > 0) {
      shop.value = await request({
        url: `shopping/restaurant/${orderList.value[0].shopId}`
      })
      shopImg.value = shop.value.image_path
    }
  })
  const again = () => {
    store.commit('shopcart/again')
    uni.navigateTo({
      url: `/subpkg/shop/shop?shop_id=${orderList.value[0].shopId}`
    })
  }
</script>

<style lang="scss">
  %littleText {
    font-size: 27rpx;
    color: rgb(186, 186, 186);
  }

  %box-shadows {
    border: 2rpx solid white;
    border-radius: 18rpx;
    box-shadow: 0rpx 0rpx 10rpx rgb(180, 180, 180);
  }

  .order-container {
    width: 90%;
    margin: 20rpx auto;

    .order {
      @extend %box-shadows;
      padding: 20rpx;

      .total-info {
        display: flex;
        align-items: center;
      }

      .foods {
        display: flex;
        justify-content: space-between;

        .foods-img {
          display: flex;
          align-items: center;

          .img {
            margin-right: 10rpx;
            border: 2rpx solid white;
            border-radius: 20rpx;
            overflow: hidden;
          }
        }

        .foods-num {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      }

      .button {
        display: flex;
        justify-content: flex-end;

        .buttons {
          border: 1rpx solid rgb(3, 181, 253);
          border-radius: 50rpx;
          color: rgb(3, 181, 253);
          font-size: 23rpx;
          margin-right: 10rpx;
        }
      }
    }
  }
</style>
