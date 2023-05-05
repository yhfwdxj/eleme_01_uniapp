"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_my_restaurants2 = common_vendor.resolveComponent("my-restaurants");
  _easycom_my_restaurants2();
}
const _easycom_my_restaurants = () => "../../components/my-restaurants/my-restaurants.js";
if (!Math) {
  _easycom_my_restaurants();
}
const _sfc_main = {
  __name: "swiperShop",
  setup(__props) {
    const store = common_vendor.useStore();
    store.dispatch("city/getCityList", "guess");
    let latitude;
    let longitude;
    let resList = common_vendor.reactive({
      curCityList: "",
      curRest: ""
    });
    resList.curCityList = computed(() => store.state.city.curCityList);
    resList.curRest = computed(() => store.state.restaurants.restList);
    common_vendor.onLoad((options) => {
      latitude = options.latitude;
      longitude = options.longitude;
    });
    let offset = 10;
    common_vendor.onReachBottom(() => {
      store.dispatch("restaurants/getRestaurants", {
        latitude,
        longitude,
        order_by: 4,
        limit: 10,
        offset
      });
      offset += 10;
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(resList).curRest
      }, common_vendor.unref(resList).curRest ? {
        b: common_vendor.p({
          ...common_vendor.unref(resList)
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/swiperShop/swiperShop.vue"]]);
wx.createPage(MiniProgramPage);
