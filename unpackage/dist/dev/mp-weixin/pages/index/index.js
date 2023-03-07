"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var common_vendor = require("../../common/vendor.js");
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
    resList.curCityList = common_vendor.computed$1(() => store.state.city.curCityList);
    resList.curRest = common_vendor.computed$1(() => store.state.restaurants.restList);
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
        return __spreadProps(__spreadValues({}, item), {
          image_url: "https://fuss10.elemecdn.com" + item.image_url
        });
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
    const placeholder = common_vendor.ref("\u8BF7\u8F93\u5165\u5546\u5BB6\u6216\u7F8E\u98DF");
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(location)
      }, common_vendor.unref(location) ? {
        b: common_vendor.t(common_vendor.unref(location))
      } : {}, {
        c: common_vendor.o(goCityList),
        d: 40 + "rpx",
        e: 40 + "rpx",
        f: 40 + "rpx",
        g: 40 + "rpx",
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
        l: common_vendor.p(__spreadValues({}, common_vendor.unref(resList)))
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
