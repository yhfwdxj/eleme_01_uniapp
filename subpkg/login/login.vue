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
  <view class="tips" @click="valid">
    <view class="tipss">提示:&nbsp;小程序的登录是用mock模拟的</view>
    <view class="tipss">账号格式应是手机号，而密码固定为123456</view>
    <view class="tipss">验证码则是H5端登录要用的</view>
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
    useStore
  } from 'vuex'
  import {
    onLoad
  } from '@dcloudio/uni-app'
  import {
    request
  } from '../../utils/request.js'
  const store = useStore()
  const account = ref(13512345678)
  const password = ref("123456")
  const captchas = ref()
  const code = ref()
  let isMp = ref()
  let userInfo = ref()
  onLoad(() => {
    getCaptchas()
    let sysInfo = uni.getSystemInfoSync()
    let reg = new RegExp("mp", "gm")
    isMp.value = reg.test(sysInfo.uniPlatform)
  })
  const valid = (item) => {
    let reg = new RegExp("1[3|5|7|8|9][1-9]{4}[0-9]{5}", "gm")
    return reg.test(item)
  }
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
    let flag = valid(account.value)
    console.log(password);
    if (isMp.value) {
      if (flag) {
        uni.request({
          url: "/mock/login",
          method: "post",
          data: {
            username: account.value,
            password: password.value
          },
          success: (res) => {
            userInfo.value = res.data
            if (userInfo.value.code === '400') {
              uni.showToast({
                title: '密码错误',
                duration: 2000,
                icon: 'error'
              })
            } else {
              store.commit('user/getUserInfo', userInfo.value)
              uni.switchTab({
                url: "/pages/user/user"
              })
            }
          }
        })
      } else {
        uni.showToast({
          title: '手机号格式错误',
          duration: 2000,
          icon: 'error'
        })
      }
    } else {
      let res = await request({
        url: 'v2/login',
        method: 'post',
        data: {
          username: account.value,
          password: password.value,
          captcha_code: captchas.value
        }
      })
      alert(res.message);
    }
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