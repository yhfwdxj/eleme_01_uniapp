"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_my_search2 = common_vendor.resolveComponent("my-search");
  _easycom_my_search2();
}
const _easycom_my_search = () => "../../components/my-search/my-search.js";
if (!Math) {
  _easycom_my_search();
}
const _sfc_main = {
  __name: "location",
  setup(__props) {
    common_vendor.useStore();
    let curCity = common_vendor.ref(0);
    common_vendor.onLoad(async (options) => {
      curCity.value = await utils_request.request({
        url: `v1/cities/${options.city_id}`
      });
    });
    let res = common_vendor.ref();
    const placeholder = common_vendor.ref("\u8BF7\u8F93\u5165\u5730\u5740");
    const searchContext = (emit) => {
      if (emit.length !== 0) {
        res.value = emit;
        console.log(emit);
      } else {
        common_vendor.index.showToast({
          title: "\u65E0\u8FD4\u56DE\u5185\u5BB9",
          icon: "error"
        });
      }
    };
    const changeCity = () => {
      common_vendor.index.navigateTo({
        url: `/subpkg/city/city`
      });
    };
    const curAddress = (item) => {
      common_vendor.index.redirectTo({
        url: `/pages/index/index?geohash=${item.latitude},${item.longitude}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(common_vendor.unref(curCity).name),
        b: common_vendor.o(changeCity),
        c: common_vendor.o(searchContext),
        d: common_vendor.p({
          placeholder: placeholder.value
        }),
        e: common_vendor.f(common_vendor.unref(res), (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.address),
            c: i,
            d: common_vendor.o(($event) => curAddress(item), i)
          };
        })
      };
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/location/location.vue"]]);
wx.createPage(MiniProgramPage);
