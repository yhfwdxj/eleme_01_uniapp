"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {};
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  _easycom_my_search2();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
if (!Math) {
  _easycom_my_search();
}
function _sfc_render(_ctx, _cache) {
  return {
    a: 40 + "rpx",
    b: 40 + "rpx",
    c: 40 + "rpx",
    d: 40 + "rpx"
  };
}
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "E:/Study/myWork/eleme_01_uniapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
