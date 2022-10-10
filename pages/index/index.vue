<template>
  <view class="header-container">
    <view class="location">
      <text>天河区</text>
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
</template>
<script>

</script>
<style lang="scss">
  %header-bgc {
    background-color: rgb(207, 27, 30);

  }

  @mixin flex {
    display: flex;
    justify-content: space-between;
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

      text {
        position: relative;

        ::after {
          content: '';
          position: absolute;
          top: 19rpx;
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
