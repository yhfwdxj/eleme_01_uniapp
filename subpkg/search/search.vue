<template>
  <view class="search-box">
    <view class="my-search" @click="changeFlag">
      <my-search :placeholder='placeholder' @searchRestaurants='searchRestaurants'></my-search>
    </view>
    <view class="" v-if="searchRest">
      <my-restaurants :searchRest='searchRest'></my-restaurants>
    </view>
  </view>
</template>

<script setup>
  import {
    ref
  } from 'vue'
  let searchRest = ref()
  const placeholder = '请输入商家或美食'
  const searchRestaurants = (e) => {
    searchRest.value = e
  }
</script>

<style lang="scss">
  .search-box {
    margin-top: 20rpx;
  }
</style>
