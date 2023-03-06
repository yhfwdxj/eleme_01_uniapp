<template>
  <view class="user-container">
    <view class="userInfo" @click="goLogin">
      <view class="avatar">
        <img src="../../static/头像-01.png" style="width: 100rpx; height: 100rpx;">
      </view>
      <view class="login">
        <text style="font-size: 38rpx;">登录/注册</text>
      </view>
    </view>
    <view class="money">
      <view style="text-align: center;">
        <view class="count">
          <text style="color: orange;font-size: 60rpx;">0.00</text>
          <text>元</text>
        </view>
        <view class="">
          <text>我的钱包</text>
        </view>
      </view>
      <view style="text-align: center;">
        <view class="count">
          <text style="color: skyblue;font-size: 60rpx;">0</text>
          <text>个</text>
        </view>
        <view class="">
          <text>我的卡券</text>
        </view>
      </view>
      <view style="text-align: center;">
        <view class="count">
          <text style="color: red;font-size: 60rpx;">0</text>
          <text>个</text>
        </view>
        <view class="">
          <text>我的红包</text>
        </view>
      </view>
    </view>
    <view class="other-info">
      <view class="go-order">
        <view class="other-common">
          <img src="../../static/_订单.png" class="img-common">
          <text class="text-common">我的订单</text>
        </view>
        <view>></view>
      </view>
      <view class="none">
        <view class="other-common">
          <img src="../../static/24gl-bag(1).png" class="img-common">
          <text class="text-common">积分商城</text>
        </view>
        <view>></view>
      </view>
      <view class="none">
        <view class="other-common">
          <img src="../../static/会员卡.png" class="img-common">
          <text class="text-common">饿了么会员卡</text>
        </view>
        <view>></view>
      </view>
    </view>
  </view>

</template>

<script setup>
  import {
    ref
  } from 'vue'

  const goLogin = () => {
    uni.navigateTo({
      url: '/subpkg/login/login'
    })
  }
</script>
<style lang="scss">
  %moneyfontsize {
    font-size: 60rpx;
  }

  .user-container {
    margin: auto;
    background-color: rgb(238, 238, 238);

    .userInfo {
      display: flex;
      align-items: center;
      height: 250rpx;
      background-color: white;

      &::after {
        content: '>';
      }

      .avatar {
        margin-left: 5%;
      }

      .login {
        width: 75%;
      }
    }

    .money {
      display: flex;
      justify-content: space-around;
      margin-top: 10rpx;
      min-height: 200rpx;
      align-items: center;
      background-color: white;
      margin: 30rpx 0;

      .count {}
    }

    .other-info {
      margin: auto;
      background-color: white;

      .go-order {
        display: flex;
        justify-content: space-between;
        margin: 0 2%;
      }

      .none {
        display: flex;
        justify-content: space-between;
        margin: 0 2%;
      }
    }
  }

  .other-common {
    display: flex;
    margin: 20rpx 0;
    align-items: center;

    .text-common {
      font-size: 36rpx;
    }

    .img-common {
      width: 46rpx;
      height: 46rpx;
    }
  }
</style>
