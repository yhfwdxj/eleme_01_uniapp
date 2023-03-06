"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "user",
  setup(__props) {
    const goLogin = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/login/login"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goLogin)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
