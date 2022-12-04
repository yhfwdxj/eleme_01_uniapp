"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "user",
  setup(__props) {
    let avatarUrl = common_vendor.ref("");
    const chooseavatar = (e) => {
      avatarUrl.value = e.detail.avatarUrl;
      console.log(avatarUrl);
    };
    const goSearch = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/address/address"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(avatarUrl),
        b: common_vendor.o(chooseavatar),
        c: common_vendor.o(goSearch)
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
