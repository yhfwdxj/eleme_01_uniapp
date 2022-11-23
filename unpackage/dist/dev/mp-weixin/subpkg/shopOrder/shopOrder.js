"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "shopOrder",
  setup(__props) {
    common_vendor.onLoad((options) => {
      const store = common_vendor.useStore();
      const list = common_vendor.computed$1(() => store.state.shopcart.cart);
      console.log(options);
      console.log(list);
    });
    return (_ctx, _cache) => {
      return {};
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/shopOrder/shopOrder.vue"]]);
wx.createPage(MiniProgramPage);
