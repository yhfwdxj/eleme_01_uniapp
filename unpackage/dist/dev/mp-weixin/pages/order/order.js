"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const store = common_vendor.useStore();
    let orderList = common_vendor.computed$1(() => store.state.shopcart.order);
    common_vendor.onLoad(() => {
      console.log("orderList", orderList);
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(orderList))
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
