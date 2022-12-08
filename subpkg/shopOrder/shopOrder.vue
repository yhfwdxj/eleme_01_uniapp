<template>
  <view class="order">
    <view class="waimai-style">
      <view class="style">
        <text>外卖配送</text>
      </view>
      <view class="address" v-if="address">
        <text>{{address.title}}</text>
        <text style="color: rgb(200, 200, 200);">></text>
      </view>
      <view class="time">
        <view class="">
          <text>立即送出</text>
        </view>
        <view class="data">
          <text style="color:rgb(25, 171, 238) ;">预计 {{curTime}} 送达</text>
        </view>
      </view>
      <view class="pay">
        <view class="">
          <text>支付方式</text>
        </view>
        <view class="alipay">
          <text style="color:rgb(25, 171, 238) ;">支付宝免密支付</text>
        </view>
      </view>
    </view>
    <view class="shop-info">
      <view class="shop-name">
        {{shop.name}}
      </view>
      <view class="foods" v-for="item2,i in list" :key="i">
        <view class="img-box">
          <img :src="'https://elm.cangdu.org/img/' + item2.image_path" :style="{height:120+'rpx',width:120 + 'rpx'}">
        </view>
        <view class="sale-info">
          <view class="name-desc">
            <view class="name">{{item2.name}}</view>
            <view class="desc">{{item2.description}}</view>
            <view class="num">
              x{{item2.num}}
            </view>
          </view>
          <view class="price-cart">
            <view class="price">
              ￥{{item2.price}}
            </view>
          </view>
        </view>
      </view>
      <view class="fee">
        <view class="baozhuang">
          <text>包装费</text>
          <text>￥0</text>
        </view>
        <view class="peisong">
          <text>配送费(蜂鸟配送)</text>
          <text>￥0</text>
        </view>
      </view>
      <view class="total">
        <view class="">
          <text>订单价格</text>
        </view>
        <view class="total-price">
          <text>小计￥</text>
          <text style="font-size: 60rpx;">{{$store.getters['shopcart/total']}}</text>
        </view>
      </view>
    </view>
    <view class="other">
      <view class="ps" @click="goRemark">
        <text>备注</text>
        <view class="ps-text">
          <text style="margin-right: 10rpx;" v-if="!remark">请填写口味偏好</text>
          <text style="margin-right: 10rpx;" v-else>{{remark}}</text>
          <text>></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    computed,
    ref
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
  let list = computed(() => store.state.shopcart.cart)
  let address = ref()
  let curTime = ref('')
  let shop = ref('')
  let shopId = ref('')
  let remark = computed(() => store.state.shopcart.remark)
  onLoad(async (options) => {
    shopId = options.id
    shop = await request({
      url: `shopping/restaurant/${options.id}`
    })
    console.log(shop);
    console.log(list);
    let time = new Date()
    time.setMinutes(time.getMinutes() + 30)
    let hours = time.getHours() > 9 ? time.getHours() : '0' + time.getHours()
    let minutes = time.getMinutes() > 9 ? time.getMinutes() : '0' + time.getMinutes()
    curTime.value = hours + ':' + minutes
    address.value = JSON.parse(uni.getStorageSync('curplace') || '[]')[0]
  })
  const goRemark = () => {
    uni.navigateTo({
      url: `/subpkg/remark/remark?shop_id=${shopId}`
    })
  }
</script>

<style lang="scss">
  %width-style {
    width: 90%;
    margin: auto;
    border: 2rpx solid white;
    border-radius: 18rpx;
    box-shadow: 0rpx 0rpx 10rpx rgb(180, 180, 180);
    padding: 15rpx;
    margin-top: 20rpx;
  }

  %time-pay {
    display: flex;
    justify-content: space-between;
    height: 60rpx;
    line-height: 60rpx;
    margin-right: 5rpx;
  }

  .order {
    .waimai-style {
      @extend %width-style;

      text {
        font-weight: 500;
      }

      .style {
        font-size: 40rpx;
        text-align: center;
        height: 80rpx;
        line-height: 80rpx;
        margin-bottom: 10rpx;
      }

      .address {
        display: flex;
        justify-content: space-between;
        font-size: 42rpx;
        height: 80rpx;
        line-height: 80rpx;
      }

      .time {
        @extend %time-pay;
      }

      .pay {
        @extend %time-pay;
      }
    }

    .shop-info {
      @extend %width-style;

      .shop-name {
        font-size: 40rpx;
        color: rgb(159, 159, 159);
        margin: 10rpx 0;
      }

      .foods {
        display: flex;

        .sale-info {
          display: flex;
          flex: 1;
          justify-content: space-between;

          .name-desc {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-left: 2%;
          }
        }
      }

      .fee {
        margin-top: 10rpx;
        padding-bottom: 30rpx;
        border-bottom: 2rpx solid rgb(200, 200, 200);

        .baozhuang {
          display: flex;
          justify-content: space-between;
          margin-bottom: 11rpx;
        }

        .peisong {
          display: flex;
          justify-content: space-between;
        }
      }

      .total {
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }

    .other {
      @extend %width-style;

      .ps {
        display: flex;
        justify-content: space-between;

        .ps-text {
          color: rgb(200, 200, 200);
        }
      }
    }
  }
</style>
