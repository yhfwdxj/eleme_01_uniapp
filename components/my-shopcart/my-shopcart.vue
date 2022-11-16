<template>
  <view class="change-num">
    <view class="reduce-num" v-if="foodList.num >= 1">
      <view class="reduce" @click="reduce">
        <img src="/static/reduce.png" style=width:40rpx;height:40rpx>
      </view>
      <view class="num">
        <text>{{foodList.num}}</text>
      </view>
    </view>
    <view class="add" @click="add">
      <img src="/static/plus.png" style=width:40rpx;height:40rpx>
    </view>
  </view>
</template>

<script setup>
  import {
    ref,
    reactive,
    toRaw,
    computed,
    watch
  } from 'vue'
  import {
    useStore
  } from 'vuex'
  import {
    onLoad
  } from '@dcloudio/uni-app'
  const store = useStore()
  const props = defineProps(['item2', 'shopId'])
  const emit = defineEmits(['curNum'])
  const foodInfo = computed(() => props.item2)
  const shopId = computed(() => props.shopId)
  let foodList = reactive({
    attrs: [],
    extra: {},
    item_id: foodInfo.value.item_id,
    name: foodInfo.value.name,
    packing_fee: foodInfo.value.specfoods ? foodInfo.value.specfoods[0].packing_fee : foodInfo.value.packing_fee,
    price: foodInfo.value.specfoods ? foodInfo.value.specfoods[0].price : foodInfo.value.price,
    quantity: 0,
    sku_id: foodInfo.value.specfoods ? foodInfo.value.specfoods[0].sku_id : foodInfo.value.sku_id,
    specs: foodInfo.value.specfoods ? foodInfo.value.specfoods[0].specs[0] : [""],
    // specs: foodInfo.specfoods[0].specs[0] || [""],
    stock: 1000,
    num: 0,
    image_path: foodInfo.value.image_path
  })
  const reduce = () => {
    if (foodList.num >= 1) {
      foodList.num--
      if (foodList) {
        store.commit('shopcart/reduceCart', foodList)
      }
    }
  }
  const add = () => {
    foodList.num++
    store.commit('shopcart/addToCart', foodList)
  }
</script>

<style lang="scss">
  .change-num {
    display: flex;

    .reduce-num {
      display: flex;

      .num {
        width: 40rpx;
        text-align: center;
      }
    }
  }
</style>
