"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "shopOrder",
  setup(__props) {
    const store = common_vendor.useStore();
    let list = common_vendor.computed$1(() => store.state.shopcart.cart);
    let address = common_vendor.ref();
    let curTime = common_vendor.ref("");
    let shop = common_vendor.ref("");
    let shopId = common_vendor.ref("");
    let remark = common_vendor.computed$1(() => store.state.shopcart.remark);
    common_vendor.onLoad(async (options) => {
      shopId = options.id;
      shop = await utils_request.request({
        url: `shopping/restaurant/${options.id}`
      });
      console.log(shop);
      console.log(list);
      let time = new Date();
      time.setMinutes(time.getMinutes() + 30);
      let hours = time.getHours() > 9 ? time.getHours() : "0" + time.getHours();
      let minutes = time.getMinutes() > 9 ? time.getMinutes() : "0" + time.getMinutes();
      curTime.value = hours + ":" + minutes;
      address.value = JSON.parse(common_vendor.index.getStorageSync("curplace") || "[]")[0];
    });
    const goRemark = () => {
      common_vendor.index.navigateTo({
        url: `/subpkg/remark/remark?shop_id=${shopId}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(address)
      }, common_vendor.unref(address) ? {
        b: common_vendor.t(common_vendor.unref(address).title)
      } : {}, {
        c: common_vendor.t(common_vendor.unref(curTime)),
        d: common_vendor.t(common_vendor.unref(shop).name),
        e: common_vendor.f(common_vendor.unref(list), (item2, i, i0) => {
          return {
            a: "https://elm.cangdu.org/img/" + item2.image_path,
            b: common_vendor.t(item2.name),
            c: common_vendor.t(item2.description),
            d: common_vendor.t(item2.num),
            e: common_vendor.t(item2.price),
            f: i
          };
        }),
        f: 120 + "rpx",
        g: 120 + "rpx",
        h: common_vendor.t(_ctx.$store.getters["shopcart/total"]),
        i: !common_vendor.unref(remark)
      }, !common_vendor.unref(remark) ? {} : {
        j: common_vendor.t(common_vendor.unref(remark))
      }, {
        k: common_vendor.o(goRemark)
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/shopOrder/shopOrder.vue"]]);
wx.createPage(MiniProgramPage);
