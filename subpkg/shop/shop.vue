<template>
  <view class="container">
    <view class="shop-container" v-if="res">
      <view class="shop-info">
        <view class="name-time">
          <view class="name">{{res.name}}</view>
          <view class="time">
            <text style="color: rgb(226, 135, 48);">{{res.rating}}分</text>
            {{res.delivery_mode.text}}&nbsp;
            约40分钟·月售{{res.recent_order_num}}
          </view>
        </view>
        <view class="shop-img">
          <img :src="'https://elm.cangdu.org/img/' + res.image_path" class="imgs">
        </view>
      </view>
      <view class="promotion">
        公告:{{res.promotion_info}}
      </view>
      <view class="activities">
        {{res.activities[0].description}}
      </view>
    </view>
    <view class="food-review">
      <view class="change-tag">
        <view class="change-food" @click="changeBox(i=0)">
          <text>点餐</text>
        </view>
        <view class="change-review" @click="changeBox(i=1)">
          <text>评价</text>
        </view>
      </view>
      <view class="scroll">
        <view class="">
          <scroll-view scroll-y="true" class="left-scroll" :style="{height:rightScrollHeight+'rpx' }">
            <view class="left" v-for="item,i in res2" :key="i" @click="scrollToRight(i)">
              <text>{{item.name}}</text>
            </view>
          </scroll-view>
        </view>
        <view class="">
          <scroll-view scroll-y="true" class="right-scroll" :style="{height:rightScrollHeight +'rpx' }"
            :scroll-top="rightScrollTop2" scroll-with-animation="true">
            <block v-for="item,i in res2" :key="i">
              <view class="title">
                {{item.name}}
              </view>
              <view class="right" v-for="item2,i in item.foods" :key="i">
                <view class="img-box">
                  <img :src="'https://elm.cangdu.org/img/' + item2.image_path"
                    :style="{height:140+'rpx',width:140 + 'rpx'}">
                </view>
                <view class="sale-info">
                  <view class="name-desc">
                    <view class="name">{{item2.name}}</view>
                    <view class="desc">{{item2.description}}</view>
                  </view>
                  <view class="sale">
                    月售:{{item2.month_sales}}&nbsp;好评率:{{item2.satisfy_rate}}%
                  </view>
                  <view class="price-cart">
                    <view class="price">
                      ￥{{item2.specfoods[0].price}}
                    </view>
                    <view class="cart">
                      <my-shopcart :item2='item2' :shopId='shopId'></my-shopcart>
                    </view>
                  </view>
                </view>
              </view>
            </block>
          </scroll-view>
        </view>
      </view>
      <view class="shop-cart" :style="{width:curWindowWidth + 'rpx'}">
        <view class="cart-info">
          <img src="/static/shoppingbag0.png" style=width:80rpx;height:80rpx>
          <view class="curPrice-fee">
            <view class="curPrice">
              ￥0
            </view>
            <view class="fee">
              免配送费
            </view>
          </view>
        </view>
        <view class="go-order">
          <button>起送</button>
        </view>
      </view>
    </view>
  </view>

</template>

<script setup>
  import {
    ref,
    reactive,
    getCurrentInstance,
    nextTick,
    computed
  } from 'vue'
  import {
    onLoad,
    onReady
  } from '@dcloudio/uni-app'
  import {
    request
  } from '@/utils/request.js'
  let res = ref()
  let res2 = ref()
  let res3 = ref()
  let curWindowWidth = ref('')
  let shopId = ref('')
  let leftScrollTop = ref([])
  let rightScrollTop = ref([])
  let rightScrollHeight = ref('')
  let rightScrollTop2 = ref('')
  const currentInstance = getCurrentInstance()
  onLoad(async (option) => {
    shopId.value = option.shop_id
    res.value = await request({
      url: `shopping/restaurant/${option.shop_id}`
    })
    res2.value = await request({
      url: `shopping/v2/menu?restaurant_id=${option.shop_id}`
    })
    const {
      windowHeight,
      windowWidth
    } = uni.getSystemInfoSync()
    res3.value = windowHeight
    curWindowWidth.value = windowWidth * 1.8
    nextTick(() => {
      const query = uni.createSelectorQuery().in(currentInstance.proxy);
      query.selectAll('.title').boundingClientRect(data => {
        data.forEach((item, i) => {
          rightScrollTop.value[i] = item.top
        })
      }).exec();
      let rightScroll = uni.createSelectorQuery().in(currentInstance.proxy).select(".right-scroll");
      rightScroll.fields({
        size: true,
        scrollOffset: true,
        rect: true
      }, data => {
        rightScrollHeight.value = (res3.value - data.top) * 2 - 30
      }).exec();
    })
  })
  const scrollToRight = (i) => {
    if (rightScrollTop2.value === rightScrollTop.value[i] - rightScrollTop.value[0]) {
      rightScrollTop2.value += 0.1
    } else {
      rightScrollTop2.value = rightScrollTop.value[i] - rightScrollTop.value[0]
    }
  }
  const changeBox = (i) => {
    console.log(curWindowWidth.value);
  }
</script>

<style lang="scss" scoped>
  %littleText {
    font-size: 27rpx;
    color: rgb(186, 186, 186);
  }

  %box-shadows {
    border: 2rpx solid white;
    border-radius: 18rpx;
    box-shadow: 0rpx 0rpx 10rpx rgb(180, 180, 180);
  }

  .container {
    width: 90%;
    margin: 30rpx auto;

    .shop-container {

      padding: 35rpx;
      @extend %box-shadows;

      .shop-info {
        display: flex;
        justify-content: space-between;

        .name-time {

          .name {
            font-size: 50rpx;
            margin-bottom: 5rpx
          }

          .time {
            @extend %littleText;
            color: rgb(52, 52, 52);
            margin-bottom: 10rpx
          }
        }

        .shop-img {
          width: 110rpx;
          height: 100rpx;
          overflow: hidden;
          border: 2rpx solid white;
          border-radius: 20rpx;

          .imgs {
            width: 120rpx;
            height: 110rpx;
          }
        }
      }

      .promotion {
        @extend %littleText;
        margin-bottom: 10rpx;
      }

      .activities {
        @extend %littleText;
        color: rgb(52, 52, 52);
      }
    }

    .food-review {
      margin-top: 20rpx;
      padding: 35rpx;
      @extend %box-shadows;

      .change-tag {
        display: flex;
        margin-bottom: 20rpx;

        .change-food {
          width: 50%;
          text-align: center;
          border-right: 2rpx solid black;
        }

        .change-review {
          width: 50%;
          text-align: center;
        }
      }

      .scroll {
        display: flex;
        justify-content: space-between;

        .left-scroll {
          width: 100rpx;

          .left {
            line-height: 120rpx;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }

        .right-scroll {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;

          .title {
            font-size: 32rpx;
            height: 40rpx;
            width: 100rpx;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;

            margin: {
              bottom: 25rpx;
              left: 10rpx;
            }

          }

          .right {
            display: flex;
            margin-bottom: 10rpx;
            height: 180rpx;
            position: relative;

            .img-box {}

            .sale-info {
              margin-left: 10rpx;

              .name-desc {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;

                .name {
                  font-size: 30rpx;
                }

                .desc {
                  @extend %littleText;
                }
              }

              .sale {
                font-size: 25rpx;
                color: rgb(52, 52, 52);
              }

              .price-cart {
                display: flex;
                font-size: 28rpx;
                margin: 10rpx 0rpx;

                .price {
                  position: absolute;
                  bottom: 20rpx;
                }

                .cart {
                  position: absolute;
                  right: 30rpx;
                  bottom: 15rpx;

                  ::v-deep .uni-numbox__value.data-v-dd94a2a8 {
                    width: 40rpx;
                    height: 44rpx;
                  }
                }
              }
            }
          }
        }
      }

      .shop-cart {
        position: fixed;
        bottom: 0;
        left: 5%;
        height: 130rpx;
        display: flex;
        background-color: white;
        justify-content: space-between;
        align-items: center;

        .cart-info {
          display: flex;
          margin-left: 5%;
        }

        .go-order {
          margin-right: 5%;
        }
      }
    }
  }
</style>

<!-- <template>
  <view>
    <view class="left_right_column_box">
      <view class="left_column">
        <scroll-view :style="{height: viewHeight}" scroll-y="true" :scroll-top="scrollTop">
          <view v-for="item in titleContenData" :key="item.id"
            :class="{'left_column_for': true, activity: selectIndex==item.index?true:false}" @click="clickTitle(item)">
            {{item.title}}
          </view>
        </scroll-view>
      </view>

      <view class="right_column">
        <scroll-view :style="{height: viewHeight}" scroll-y="true" :scroll-into-view="selectId"
          scroll-with-animation="true" @scroll="scroll">
          <view :id="item.id" class="floorType right_title_content_for" v-for="item in titleContenData" :key="item.id">
            <view class="right_title">{{item.title}}</view>
            <view v-for="items in item.contents" :key="items.id">{{items.content}}</view>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>
<script>
  // 防抖
  let timer = undefined;

  export default {
    data() {
      return {
        // 屏幕高度
        viewHeight: null,
        // 源数据
        titleContenData: [],
        // 设置锚点
        selectId: 'id1',
        // 设置高亮
        selectIndex: 0,
        // 设置左栏顶部距离
        scrollTop: 0,
      }
    },

    mounted() {
      let that = this;
      uni.getSystemInfo({
        success: function({
          windowHeight
        }) {
          that.viewHeight = windowHeight + 'px';
        }
      });

      // 创建数据
      that.createData();

      // 此处使用$nextTick是非常有必要
      // 官方建议
      // 实际测试如果不用会报错
      that.$nextTick(function() {
        const query = uni.createSelectorQuery().in(that);

        query.selectAll('.floorType').boundingClientRect(VNodeAll => {
          VNodeAll.forEach(({
            top
          }, i) => {
            // 获取并存储每个视图到顶部的距离
            this.titleContenData[i].viewTop = top;
          });
        }).exec();

        console.log('titleContenData:', this.titleContenData);
      });
    },

    methods: {
      // 滚动时触发
      scroll({
        detail: {
          scrollTop
        }
      }) {
        let that = this,
          titleContenData = that.titleContenData;

        // 防抖
        // timer定义在全局
        // 如果没有防抖会触发许多次
        // 对性能不友好
        if (timer !== undefined) clearTimeout(timer);

        timer = setTimeout(function() {
          // 当右侧滚动到顶部时强制赋值为0
          // 因为在滚动时一般获取到的数据是0-10的范围
          // 小概率会获取到0
          // 因为原先存储viewTop属性的第一个值就是0
          scrollTop = scrollTop < 10 ? 0 : scrollTop;
          let selectIndex = titleContenData.findIndex((item) => item.viewTop >= scrollTop);
          console.log('scrollTop:', scrollTop);
          // 设置高亮
          that.selectIndex = selectIndex;
          // 此属性联动左侧滚动条
          // 当右侧滚动时
          // 左侧也会相应的滚动
          // 只是滚动的距离不一样
          that.scrollTop = 5 * that.selectIndex;
        }, 70);
      },

      // 标题点击事件
      clickTitle({
        id,
        index
      }) {
        console.log(id, index);
        // 设置锚点
        this.selectId = id;
        // 设置高亮
        this.selectIndex = index;
      },

      // 生成内容
      createContent(n) {
        let content = [];
        for (let i = 0; i < n; i++) content.push({
          id: i + 1,
          content: `内容${i+1}内容`
        });
        return content;
      },

      // 创建数据
      createData() {
        // 生成标题
        for (let i = 0; i < 24; i++) this.titleContenData.push({
          // 因为需要绑定id作为锚点目标
          // 所以不能以数字开头
          id: `id${i+1}`,
          index: i,
          title: '标题' + (i + 1),
          contents: this.createContent(parseInt(Math.random() * 24 + 1, 10))
        })
      }
    },
  }
</script>

<style>
  /* 公共样式 */
  .left_right_column_box {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
  }

  /* 左侧样式 */
  .left_column {
    flex: 1;
  }

  .left_column_for {
    text-align: center;
    padding: 10rpx 0;
  }

  .activity {
    color: #000fff;
  }

  /* 右侧样式 */
  .right_column {
    flex: 3;
    margin-left: 36rpx;
  }

  .right_title_content_for {
    margin-top: 36rpx;
  }

  .right_title_content_for:first-child {
    margin-top: 0;
  }

  .right_title {
    font-weight: 700;
  }

  /* 隐藏scroll-wiew元素的滚动条 */
  scroll-view ::-webkit-scrollbar {
    width: 0;
    height: 0;
    background-color: transparent;
  }
</style> -->
