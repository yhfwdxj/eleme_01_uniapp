"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "order",
  setup(__props) {
    const store = common_vendor.useStore();
    let orderList = common_vendor.computed$1(() => store.state.shopcart.order);
    let shop = common_vendor.ref();
    let shopImg = common_vendor.ref();
    const imgBaseUrl = "https://elm.cangdu.org/img/";
    common_vendor.onLoad(async () => {
      shop.value = await utils_request.request({
        url: `shopping/restaurant/${orderList.value[0].shopId}`
      });
      shopImg.value = shop.value.image_path;
    });
    const again = () => {
      store.commit("shopcart/again");
      common_vendor.index.navigateTo({
        url: `/subpkg/shop/shop?shop_id=${orderList.value[0].shopId}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(orderList)
      }, common_vendor.unref(orderList) ? common_vendor.e({
        b: common_vendor.unref(shop)
      }, common_vendor.unref(shop) ? {
        c: imgBaseUrl + common_vendor.unref(shopImg),
        d: common_vendor.t(common_vendor.unref(shop).name)
      } : {}, {
        e: common_vendor.f(common_vendor.unref(orderList), (item, i, i0) => {
          return {
            a: imgBaseUrl + item.image_path,
            b: i
          };
        }),
        f: common_vendor.t(_ctx.$store.getters["shopcart/total2"]),
        g: common_vendor.t(common_vendor.unref(orderList).length),
        h: common_vendor.o(again)
      }) : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/pages/order/order.vue"]]);
wx.createPage(MiniProgramPage);
