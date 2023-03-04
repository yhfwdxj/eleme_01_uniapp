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
    <view class="ball-animation" :animation="ballYAni" v-if="animationFlag">
      <view :animation="ballXAni">
        <img src="../../static/小球.png" style="width: 30rpx;height: 30rpx;">
      </view>
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
  const foodInfo = computed(() => props.item2)
  const shopId = computed(() => props.shopId)
  let ballX = ref()
  let ballY = ref()
  let ballXAni = ref()
  let ballYAni = ref()
  let animationFlag = ref(false)
  let foodList = reactive({
    attrs: [],
    extra: {},
    shopId: shopId.value,
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
  const add = (e) => {
    foodList.num++
    store.commit('shopcart/addToCart', foodList)
    animationFlag.value = true
    ballX.value = e.detail.x
    ballY.value = e.detail.y
    createAnima(ballX.value, ballY.value)

  }
  const delaySet = (time) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }
  const createAnima = (ballX, ballY) => {
    uni.getSystemInfo({
      success(e) {
        console.log(e.windowWidth);
        let axisX = e.windowWidth * 0.3
        let axisY = e.windowHeight - 20
        let ballFlyX2 = ballFlyX(ballX, axisX)
        let ballFlyY2 = ballFlyY(ballY, axisY)
        delaySet(100).then(() => {
          ballXAni.value = ballFlyX2.export()
          ballYAni.value = ballFlyY2.export()
          return delaySet(400)
        }).then(() => {
          animationFlag.value = false
          ballXAni.value = ballFlyX(0, 0, 0).export()
          ballYAni.value = ballFlyY(0, 0, 0).export()
          return delaySet(400)
        })
      }
    })
  }
  const ballFlyX = (ballStartX, ballStopX, time) => {
    let animation = uni.createAnimation({
      duration: time || 400,
      timingFunction: 'linear'
    })
    return animation.translateX(ballStopX - ballStartX).step()
  }
  const ballFlyY = (ballStartY, ballStopY, time) => {
    let animation = uni.createAnimation({
      duration: time || 400,
      timingFunction: 'ease-in'
    })
    return animation.translateY(ballStopY - ballStartY).step()
  }
</script>

<style lang="scss">
  .change-num {
    display: flex;
    position: relative;

    .reduce-num {
      display: flex;

      .num {
        width: 40rpx;
        text-align: center;
      }
    }

    .ball-animation {
      position: absolute;
    }
  }
</style>
