"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "my-shopcart",
  props: ["item2", "shopId"],
  setup(__props) {
    const props = __props;
    const store = common_vendor.useStore();
    const foodInfo = common_vendor.computed(() => props.item2);
    const shopId = common_vendor.computed(() => props.shopId);
    let ballX = common_vendor.ref();
    let ballY = common_vendor.ref();
    let ballXAni = common_vendor.ref();
    let ballYAni = common_vendor.ref();
    let animationFlag = common_vendor.ref(false);
    let foodList = common_vendor.reactive({
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
      stock: 1e3,
      num: 0,
      image_path: foodInfo.value.image_path
    });
    const reduce = () => {
      if (foodList.num >= 1) {
        foodList.num--;
        if (foodList) {
          store.commit("shopcart/reduceCart", foodList);
        }
      }
    };
    const add = (e) => {
      foodList.num++;
      store.commit("shopcart/addToCart", foodList);
      animationFlag.value = true;
      ballX.value = e.detail.x;
      ballY.value = e.detail.y;
      createAnima(ballX.value, ballY.value);
    };
    const delaySet = (time) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, time);
      });
    };
    const createAnima = (ballX2, ballY2) => {
      common_vendor.index.getSystemInfo({
        success(e) {
          let axisX = e.windowWidth * 0.3;
          let axisY = e.windowHeight - 20;
          let ballFlyX2 = ballFlyX(ballX2, axisX);
          let ballFlyY2 = ballFlyY(ballY2, axisY);
          delaySet(100).then(() => {
            ballXAni.value = ballFlyX2.export();
            ballYAni.value = ballFlyY2.export();
            return delaySet(400);
          }).then(() => {
            animationFlag.value = false;
            ballXAni.value = ballFlyX(0, 0, 0).export();
            ballYAni.value = ballFlyY(0, 0, 0).export();
            return delaySet(400);
          });
        }
      });
    };
    const ballFlyX = (ballStartX, ballStopX, time) => {
      let animation = common_vendor.index.createAnimation({
        duration: time || 400,
        timingFunction: "linear"
      });
      return animation.translateX(ballStopX - ballStartX).step();
    };
    const ballFlyY = (ballStartY, ballStopY, time) => {
      let animation = common_vendor.index.createAnimation({
        duration: time || 400,
        timingFunction: "ease-in"
      });
      return animation.translateY(ballStopY - ballStartY).step();
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(foodList).num >= 1
      }, common_vendor.unref(foodList).num >= 1 ? {
        b: common_vendor.o(reduce),
        c: common_vendor.t(common_vendor.unref(foodList).num)
      } : {}, {
        d: common_vendor.o(add),
        e: common_vendor.unref(animationFlag)
      }, common_vendor.unref(animationFlag) ? {
        f: common_vendor.unref(ballXAni),
        g: common_vendor.unref(ballYAni)
      } : {});
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/components/my-shopcart/my-shopcart.vue"]]);
wx.createComponent(Component);
