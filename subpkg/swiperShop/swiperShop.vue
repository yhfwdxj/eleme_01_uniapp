<template>
  <view v-if="resList.curRest">
    <my-restaurants v-bind='resList'></my-restaurants>
  </view>
</template>

<script setup>
  import {
    reactive,
    computed
  } from 'vue'
  import {
    onLoad,
    onReachBottom
  } from '@dcloudio/uni-app'
  import {
    useStore
  } from 'vuex'
  const store = useStore()
  store.dispatch('city/getCityList', 'guess')
  let latitude
  let longitude
  let resList = reactive({
    curCityList: '',
    curRest: ''
  })
  resList.curCityList = computed(() => store.state.city.curCityList)
  resList.curRest = computed(() => store.state.restaurants.restList)
  onLoad((options) => {
    latitude = options.latitude
    longitude = options.longitude
  })
  let offset = 10
  onReachBottom(() => {
    store.dispatch('restaurants/getRestaurants', {
      latitude,
      longitude,
      order_by: 4,
      limit: 10,
      offset
    })
    offset += 10
  })
</script>

<style lang="scss">

</style>