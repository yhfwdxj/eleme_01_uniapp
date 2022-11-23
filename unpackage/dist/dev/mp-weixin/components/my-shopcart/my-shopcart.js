"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "my-shopcart",
  props: ["item2", "shopId"],
  setup(__props) {
    const props = __props;
    const store = common_vendor.useStore();
    const foodInfo = common_vendor.computed$1(() => props.item2);
    common_vendor.computed$1(() => props.shopId);
    let foodList = common_vendor.reactive({
      attrs: [],
      extra: {},
      item_id: foodInfo.value.item_id,
      name: foodInfo.value.name,
      packing_fee: foodInfo.value.specfoods ? foodInfo.value.specfoods[0].packing_fee : foodInfo.value.packing_fee,
      price: foodInfo.value.specfoods ? foodInfo.value.specfoods[0].price : foodInfo.value.price,
      quantity: 0,
      sku_id: foodInfo.value.specfoods ? foodInfo.value.specfoods[0].sku_id : foodInfo.value.sku_id,
      specs: foodInfo.value.specfoods ? foodInfo.value.specfoods[0].specs[0] : [""],
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
    const add = () => {
      foodList.num++;
      store.commit("shopcart/addToCart", foodList);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(foodList).num >= 1
      }, common_vendor.unref(foodList).num >= 1 ? {
        b: common_vendor.o(reduce),
        c: common_vendor.t(common_vendor.unref(foodList).num)
      } : {}, {
        d: common_vendor.o(add)
      });
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/components/my-shopcart/my-shopcart.vue"]]);
wx.createComponent(Component);
