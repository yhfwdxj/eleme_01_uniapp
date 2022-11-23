<template>
  <view>

  </view>
</template>

<script setup>
  import {
    computed
  } from 'vue'
  import {
    useStore
  } from 'vuex'
  import {
    onLoad
  } from '@dcloudio/uni-app'

  onLoad((options) => {
    const store = useStore()
    const list = computed(() => store.state.shopcart.cart)
    console.log(options);
    console.log(list);
  })
</script>

<style lang="scss">

</style>
