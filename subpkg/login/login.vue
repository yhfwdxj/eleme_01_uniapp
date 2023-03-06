<template>
  <view class="login-container">
    <view class="container">
      <input type="text" v-model="account" placeholder="账号:">
    </view>
    <view class="container">
      <input type="safe-password" v-model="password" placeholder="密码:">
    </view>
    <view class="container">
      <input type="text" placeholder="验证码:" v-model="captchas">
      <view class="code">
        <img :src="code" style="width: 100rpx;height: 100rpx;">
        <view class="change" @click="changeCode">换一张</view>
      </view>
    </view>
  </view>
  <view class="tips">
    <view class="tipss">提示:&nbsp;未注册过的账号将会自动注册</view>
    <view class="tipss">注册过的用户即可凭账号密码登录</view>
  </view>
  <view class="button">
    <button type="primary" @click="login">登录</button>
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
  } from '../../utils/request.js'
  const account = ref()
  const password = ref()
  const captchas = ref()
  const code = ref()
  onLoad(() => {
    getCaptchas()
  })
  const getCaptchas = async () => {
    let res = await request({
      url: 'v1/captchas',
      method: 'post'
    })
    code.value = res.code
  }
  const changeCode = () => {
    getCaptchas()
  }
  const login = async () => {
    let res = await request({
      url: 'v2/login',
      method: 'post',
      data: {
        username: account.value,
        password: password.value,
        captcha_code: captchas.value
      }
    })
    console.log(res);
  }
</script>

<style lang="scss">
  .login-container {

    .container {
      border-bottom: 2rpx solid rgb(241, 241, 241);
      display: flex;
      margin: 30rpx;
      align-items: center;
      justify-content: space-between;
      min-height: 100rpx;

      .code {
        display: flex;
        align-items: center;

        .change {
          margin-left: 20rpx;
          color: rgb(48, 96, 252);
        }
      }
    }
  }

  .tips {
    margin: 50rpx 30rpx;

    .tipss {
      margin-bottom: 30rpx;
      color: red;
    }
  }

  .button {
    width: 90%;
    margin: auto;
  }
</style>
