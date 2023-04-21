"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "remark",
  setup(__props) {
    let shopId = common_vendor.ref("");
    let remark = common_vendor.ref();
    let remarkText = common_vendor.ref("");
    const store = common_vendor.useStore();
    common_vendor.onLoad(async (options) => {
      shopId = options.shop_id;
      remark.value = await utils_request.request({
        url: `v1/carts/${shopId}/remarks`
      });
    });
    const inpText = (item, item2, i) => {
      remarkText.value += item2 + ",";
    };
    const backOrder = () => {
      store.commit("shopcart/changeRemark", remarkText);
      common_vendor.index.navigateBack({
        delta: 1
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(remarkText),
        b: common_vendor.o(($event) => common_vendor.isRef(remarkText) ? remarkText.value = $event.detail.value : remarkText = $event.detail.value),
        c: common_vendor.unref(remark)
      }, common_vendor.unref(remark) ? {
        d: common_vendor.f(common_vendor.unref(remark).remarks, (item, i, i0) => {
          return {
            a: common_vendor.f(item, (item2, i2, i1) => {
              return {
                a: common_vendor.t(item2),
                b: i2,
                c: common_vendor.o(($event) => inpText(item, item2), i2)
              };
            }),
            b: i
          };
        })
      } : {}, {
        e: common_vendor.o(backOrder)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/remark/remark.vue"]]);
wx.createPage(MiniProgramPage);
