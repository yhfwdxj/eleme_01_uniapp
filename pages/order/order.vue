<template>
  {{orderList}}
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
  const store = useStore()
  let orderList = computed(() => store.state.shopcart.order)
  onLoad(() => {
    console.log('orderList', orderList);
  })
</script>

<style lang="scss">
</style>
