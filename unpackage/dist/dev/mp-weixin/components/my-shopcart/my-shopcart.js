"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "my-shopcart",
  props: ["item2", "shopId"],
  setup(__props) {
    const props = __props;
    const store = common_vendor.useStore();
    let num = common_vendor.ref(0);
    const foodInfo = props.item2;
    props.shopId;
    let foodList = common_vendor.reactive({
      attrs: [],
      extra: {},
      id: foodInfo.item_id,
      name: foodInfo.name,
      packing_fee: foodInfo.specfoods[0].packing_fee,
      price: foodInfo.specfoods[0].price,
      quantity: 0,
      sku_id: foodInfo.specfoods[0].sku_id,
      specs: foodInfo.specfoods[0].specs[0] || [""],
      stock: 1e3,
      num: 1
    });
    const reduce = () => {
      if (num.value >= 1) {
        num.value--;
        store.commit("shopcart/reduceCart", foodList);
      }
    };
    const add = () => {
      num.value++;
      store.commit("shopcart/addToCart", foodList);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(num) !== 0
      }, common_vendor.unref(num) !== 0 ? {
        b: common_vendor.o(reduce),
        c: common_vendor.t(common_vendor.unref(num))
      } : {}, {
        d: common_vendor.o(add)
      });
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/components/my-shopcart/my-shopcart.vue"]]);
wx.createComponent(Component);
