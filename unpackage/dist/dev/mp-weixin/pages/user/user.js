"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "user",
  setup(__props) {
    common_vendor.onShow(() => {
      if (store.state.user.userInfo.code === "200") {
        userInfo.value = store.state.user.userInfo;
      }
    });
    const store = common_vendor.useStore();
    let userInfo = common_vendor.ref();
    common_vendor.ref();
    const goLogin = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/login/login"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: !common_vendor.unref(userInfo)
      }, !common_vendor.unref(userInfo) ? {
        b: common_vendor.o(goLogin)
      } : {
        c: common_vendor.t(common_vendor.unref(userInfo).username)
      }, {
        d: common_vendor.unref(userInfo)
      }, common_vendor.unref(userInfo) ? {
        e: common_vendor.t(common_vendor.unref(userInfo).money)
      } : {}, {
        f: common_vendor.unref(userInfo)
      }, common_vendor.unref(userInfo) ? {
        g: common_vendor.t(common_vendor.unref(userInfo).card)
      } : {}, {
        h: common_vendor.unref(userInfo)
      }, common_vendor.unref(userInfo) ? {
        i: common_vendor.t(common_vendor.unref(userInfo).envelope)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/pages/user/user.vue"]]);
wx.createPage(MiniProgramPage);
