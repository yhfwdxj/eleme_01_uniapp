<template>
  <view class="my-search">
    <view class="search">
      <input type="text" name="" id="" placeholder="请输入">
    </view>
    <view class="text-container">
      <text>搜索</text>
    </view>
  </view>
</template>

<script>
</script>

<style lang="scss">
  .my-search {
    display: flex;
    justify-content: space-between;
    border: 2rpx solid gray;
    width: 90%;
    margin-left: 5%;
    border-radius: 36rpx;
    background-color: #ffffff;
    height: 60rpx;

    .search {
      width: 80%;
      border-radius: 36rpx;
      display: flex;
      justify-content: space-between;
      align-items: center;


    }

    .text-container {
      width: 20%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgb(253, 138, 75);
      border-radius: 36rpx;
      color: white;
    }
  }
</style>
