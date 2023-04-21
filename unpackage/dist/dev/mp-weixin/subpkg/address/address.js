"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "address",
  setup(__props) {
    let location = common_vendor.ref();
    let active = common_vendor.ref(0);
    common_vendor.onLoad(() => {
      location.value = JSON.parse(common_vendor.index.getStorageSync("curplace") || "[]");
      console.log(location.value);
    });
    const changeActive = (i, item) => {
      location.value.map((item2, index) => {
        if (index === i) {
          location.value.unshift(location.value.splice(i, 1)[0]);
          console.log(location.value);
          common_vendor.index.setStorageSync("curplace", JSON.stringify(location.value));
        }
      });
      common_vendor.index.setStorageSync("address", JSON.stringify(item.address));
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(common_vendor.unref(location), (item, i, i0) => {
          return {
            a: common_vendor.t(item.address),
            b: common_vendor.n(i === common_vendor.unref(active) ? "active" : ""),
            c: common_vendor.o(($event) => changeActive(i, item), i),
            d: i
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/address/address.vue"]]);
wx.createPage(MiniProgramPage);
