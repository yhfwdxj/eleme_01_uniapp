<template>
  <view class="change-num">
    <view class="reduce-num" v-if="num !== 0">
      <view class="reduce" @click="reduce">
        <img src="/static/reduce.png" style=width:40rpx;height:40rpx>
      </view>
      <view class="num">
        <text>{{num}}</text>
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
    computed
  } from 'vue'
  import {
    useStore
  } from 'vuex'
  const store = useStore()
  const props = defineProps(['item2', 'shopId'])
  let num = ref(0)
  const foodInfo = props.item2
  const shopId = props.shopId
  let foodList = reactive({
    attrs: [],
    extra: {},
    id: foodInfo.item_id,
    name: foodInfo.name,
    packing_fee: foodInfo.specfoods[0].packing_fee,
    price: foodInfo.specfoods[0].price,
    quantity: 0,
    sku_id: foodInfo.specfoods[0].sku_id,
    specs: foodInfo.specfoods[0].specs[0] || [""],
    stock: 1000,
    num: 1
  })
  const reduce = () => {
    if (num.value >= 1) {
      num.value--
      store.commit('shopcart/reduceCart', foodList)
    }
  }
  const add = () => {
    num.value++
    store.commit('shopcart/addToCart', foodList)
    // console.log(store.state.shopcart.cart);
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
