"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  const _easycom_my_restaurants2 = common_vendor.resolveComponent("my-restaurants");
  (_easycom_my_search2 + _easycom_my_restaurants2)();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
const _easycom_my_restaurants = () => "../../components/my-restaurants/my-restaurants.js";
if (!Math) {
  (_easycom_my_search + _easycom_my_restaurants)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = common_vendor.useStore();
    const request = common_vendor.inject("request");
    store.dispatch("city/getCityList", "guess");
    let resList = common_vendor.reactive({
      curCityList: "",
      curRest: ""
    });
    resList.curCityList = common_vendor.computed(() => store.state.city.curCityList);
    resList.curRest = common_vendor.computed(() => store.state.restaurants.restList);
    let data1 = common_vendor.ref();
    let data2 = common_vendor.ref();
    let location = common_vendor.ref("");
    let latitude = common_vendor.ref();
    let longitude = common_vendor.ref();
    let curPlace = common_vendor.ref();
    let geohash = common_vendor.ref();
    const goSearch = () => {
      common_vendor.index.navigateTo({
        url: `/subpkg/search/search?geohash=${geohash.value}`
      });
    };
    common_vendor.onLoad(async () => {
      let res = await request({
        url: "v2/index_entry"
      });
      res = res.map((item) => {
        return {
          ...item,
          image_url: "https://fuss10.elemecdn.com" + item.image_url
        };
      });
      data1.value = res.splice(0, 8);
      data2.value = res;
    });
    common_vendor.onShow(() => {
      curPlace = JSON.parse(common_vendor.index.getStorageSync("address") || "{}");
      if (curPlace.id) {
        latitude.value = curPlace.location.lat;
        longitude.value = curPlace.location.lng;
        location.value = curPlace.title;
        geohash.value = `${latitude.value},${longitude.value}`;
        store.dispatch("restaurants/getRestaurants", {
          latitude,
          longitude,
          order_by: 4,
          limit: 10
        });
      }
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
    const goCityList = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/city/city"
      });
    };
    const placeholder = common_vendor.ref("请输入商家或美食");
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(location)
      }, common_vendor.unref(location) ? {
        b: common_vendor.t(common_vendor.unref(location))
      } : {}, {
        c: common_vendor.o(goCityList),
        d: "40rpx",
        e: "40rpx",
        f: "40rpx",
        g: "40rpx",
        h: common_vendor.p({
          placeholder: placeholder.value
        }),
        i: common_vendor.o(goSearch),
        j: common_vendor.f(common_vendor.unref(data1), (item, index, i0) => {
          return {
            a: item.image_url,
            b: common_vendor.t(item.title),
            c: index
          };
        }),
        k: common_vendor.f(common_vendor.unref(data2), (item, index, i0) => {
          return {
            a: item.image_url,
            b: common_vendor.t(item.title),
            c: index
          };
        }),
        l: common_vendor.p({
          ...common_vendor.unref(resList)
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
