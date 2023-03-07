"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "my-star",
  props: ["rating"],
  setup(__props) {
    const props = __props;
    const rating = props.rating;
    const test = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(5, (item, i, i0) => {
          return {
            a: i
          };
        }),
        b: common_vendor.f(5, (item, i, i0) => {
          return {
            a: i
          };
        }),
        c: common_vendor.s("width:" + common_vendor.unref(rating) * 150 / 5 + "rpx"),
        d: common_vendor.o(test)
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/components/my-star/my-star.vue"]]);
wx.createComponent(Component);
