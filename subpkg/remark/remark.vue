<template>
  <view class="remark-container">
    <view class="textarea-container">
      <textarea class="textarea" placeholder="请输入口味, 偏好等要求, 不支持额外代购其它商品" maxlength="50" v-model="remarkText"></textarea>
    </view>
    <view style="margin-top: 10rpx;">快捷输入:</view>
    <view class="quick-container" v-if="remark">
      <view class="quick" v-for="item,i in remark.remarks" :key="i">
        <text v-for="item2,i in item" :key="i" class="quick-text" @click="inpText(item,item2,i)">{{item2}}</text>
      </view>
    </view>
    <button class="complete" @click="backOrder">完成</button>
  </view>
</template>

<script setup>
  import {
    ref,
    reactive,
    computed
  } from 'vue'
  import {
    useStore
  } from 'vuex'
  import {
    request
  } from '@/utils/request.js'
  import {
    onLoad
  } from '@dcloudio/uni-app'
  let shopId = ref('')
  let remark = ref()
  let remarkText = ref('')
  const store = useStore()
  onLoad(async (options) => {
    shopId = options.shop_id
    remark.value = await request({
      url: `v1/carts/${shopId}/remarks`
    })
  })
  const inpText = (item, item2, i) => {
    // let res2 = remarkText.value.split(',')
    // console.log(res2, 1);
    remarkText.value += item2 + ','
  }
  const backOrder = () => {
    store.commit('shopcart/changeRemark', remarkText)
    uni.navigateBack({
      delta: 1
    })
  }
</script>

<style lang="scss">
  .remark-container {
    width: 90%;
    margin: 30rpx auto;

    .textarea {
      min-width: 100%;
      background-color: rgb(250, 250, 250);
    }

    .quick-container {
      display: flex;
      flex-wrap: wrap;
      margin-top: 20rpx;

      .quick {
        margin: 10rpx;
        padding: 10rpx;

        .quick-text {
          border: 2rpx solid rgb(200, 200, 200);
          padding: 10rpx;
        }
      }
    }

    .complete {
      background-color: rgb(76, 217, 100);
      color: white;
      margin-top: 20rpx;
    }
  }
</style>
