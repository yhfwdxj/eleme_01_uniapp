<template>
  <view class="user-container">
    <text style="margin: 3%;">用户信息:</text>
    <view class="user" style="margin-top: 3%;">
      <view class="user-img">
        <button class="login-btn" open-type="chooseAvatar" @chooseavatar="chooseavatar">
          <text>头像</text>
          <view class="profile">
            <img :src="avatarUrl" class="profile-img">
          </view>
        </button>
      </view>
      <view class="user-img">
        <button class="login-btn">
          <text>昵称</text>
          <view class="input-name">
            <input type="nickname" placeholder="请输入昵称">
          </view>
        </button>
      </view>
      <view class="user-img">
        <button class="login-btn">
          <text>个人简介</text>
          <view class="profile">
            <input type="text">
          </view>
        </button>
      </view>
      <view class="user-img">
        <button class="login-btn" @click="goSearch">
          <text>收货地址</text>
          <view class="profile">
            <text></text>
          </view>
        </button>
      </view>
    </view>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  let avatarUrl = ref('')
  const chooseavatar = (e) => {
    avatarUrl.value = e.detail.avatarUrl
    console.log(avatarUrl);
  }
  const goSearch = () => {
    uni.navigateTo({
      url: '/subpkg/address/address'
    })
  }
</script>
<style lang="scss">
  button::after {
    border: none;
  }

  .user-container {

    .user {
      .user-img {

        .login-btn {
          position: relative;
          width: 95%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          height: 110rpx;
          font-size: 30rpx;
          background-color: #fff;
          border-top: 2rpx solid rgb(200, 200, 200);

          .input-name {
            position: absolute;
            right: 5%;
            text-align: right;
          }

          .profile {
            display: flex;
            align-items: center;

            &::after {
              content: '>';
            }

            .profile-img {
              width: 80rpx;
              height: 60rpx;
              margin-right: 10rpx;
            }
          }


        }
      }
    }
  }
</style>
