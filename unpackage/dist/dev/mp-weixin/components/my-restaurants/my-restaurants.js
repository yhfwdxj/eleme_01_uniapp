"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_my_star2 = common_vendor.resolveComponent("my-star");
  _easycom_my_star2();
}
const _easycom_my_star = () => "../my-star/my-star.js";
if (!Math) {
  _easycom_my_star();
}
const _sfc_main = {
  __name: "my-restaurants",
  props: ["curCityList", "curRest", "searchRest"],
  setup(__props) {
    const props = __props;
    const imgBaseUrl = "https://elm.cangdu.org/img/";
    common_vendor.computed(() => props.curCityList);
    let curRest = common_vendor.computed(() => props.curRest);
    let searchRest = common_vendor.computed(() => props.searchRest);
    curRest.rating;
    common_vendor.watch(searchRest, (newValue, oldValue) => {
      if (searchRest.value) {
        curRest = searchRest;
      }
    }, {
      immediate: true
    });
    const goShop = (item) => {
      common_vendor.index.navigateTo({
        url: `/subpkg/shop/shop?shop_id=${item.id}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(searchRest)
      }, common_vendor.unref(searchRest) ? {} : {}, {
        b: common_vendor.f(common_vendor.unref(curRest), (item, i, i0) => {
          return {
            a: imgBaseUrl + item.image_path,
            b: common_vendor.t(item.name),
            c: "d99bbe82-0-" + i0,
            d: common_vendor.p({
              rating: item.rating
            }),
            e: common_vendor.t(item.rating),
            f: common_vendor.t(item.recent_order_num),
            g: common_vendor.t(item.order_lead_time),
            h: common_vendor.t(item.distance),
            i: common_vendor.t(item.float_minimum_order_amount),
            j: common_vendor.t(item.piecewise_agent_fee.tips),
            k: i,
            l: common_vendor.o(($event) => goShop(item), i)
          };
        })
      });
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/components/my-restaurants/my-restaurants.vue"]]);
wx.createComponent(Component);
