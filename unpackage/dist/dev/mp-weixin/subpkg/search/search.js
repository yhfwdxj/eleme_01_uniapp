"use strict";
var common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  const _easycom_my_restaurants2 = common_vendor.resolveComponent("my-restaurants");
  (_easycom_my_search2 + _easycom_my_restaurants2)();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
const _easycom_my_restaurants = () => "../../components/my-restaurants/my-restaurants.js";
if (!Math) {
  (_easycom_my_search + _easycom_my_restaurants)();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    let searchRest = common_vendor.ref();
    const placeholder = "\u8BF7\u8F93\u5165\u5546\u5BB6\u6216\u7F8E\u98DF";
    const searchRestaurants = (e) => {
      searchRest.value = e;
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(searchRestaurants),
        b: common_vendor.p({
          placeholder
        }),
        c: common_vendor.o((...args) => _ctx.changeFlag && _ctx.changeFlag(...args)),
        d: common_vendor.unref(searchRest)
      }, common_vendor.unref(searchRest) ? {
        e: common_vendor.p({
          searchRest: common_vendor.unref(searchRest)
        })
      } : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/search/search.vue"]]);
wx.createPage(MiniProgramPage);
