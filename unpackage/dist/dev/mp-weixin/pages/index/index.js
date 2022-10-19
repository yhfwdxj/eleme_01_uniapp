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
  _easycom_my_search2();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
if (!Math) {
  _easycom_my_search();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const store = common_vendor.useStore();
    const request = common_vendor.inject("request");
    store.dispatch("city/getCityList", "guess");
    const curCityList = common_vendor.computed$1(() => store.state.city.curCityList);
    let data1 = common_vendor.ref();
    let data2 = common_vendor.ref();
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
    const goCityList = () => {
      common_vendor.index.navigateTo({
        url: "/subpkg/city/city"
      });
    };
    const placeholder = common_vendor.ref("\u8BF7\u8F93\u5165\u5546\u5BB6\u6216\u7F8E\u98DF");
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(curCityList).name),
        b: common_vendor.o(goCityList),
        c: 40 + "rpx",
        d: 40 + "rpx",
        e: 40 + "rpx",
        f: 40 + "rpx",
        g: common_vendor.p({
          placeholder: placeholder.value
        }),
        h: common_vendor.f(common_vendor.unref(data1), (item, index, i0) => {
          return {
            a: item.image_url,
            b: common_vendor.t(item.title),
            c: index
          };
        }),
        i: common_vendor.f(common_vendor.unref(data2), (item, index, i0) => {
          return {
            a: item.image_url,
            b: common_vendor.t(item.title),
            c: index
          };
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
