"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "my-search",
  props: ["placeholder"],
  emits: ["searchContext", "searchRestaurants"],
  setup(__props, { emit }) {
    let id = common_vendor.ref("");
    let geohash = common_vendor.ref("");
    common_vendor.onLoad((options) => {
      id = options.city_id;
      geohash = options.geohash;
      console.log(geohash);
    });
    const keyword = common_vendor.ref("");
    let res = common_vendor.ref("");
    common_vendor.ref("");
    const search = async () => {
      if (id && keyword.value) {
        res = await common_vendor.index.request({
          url: `http://apis.map.qq.com/ws/place/v1/search?key=PVABZ-4IO6D-4WK47-PKUCM-TD4DV-WOF6U&keyword=${encodeURI(keyword.value)}&boundary=nearby(${geohash},1000,1)`,
          method: "get"
        });
        emit("searchContext", res);
      } else {
        res = await utils_request.request({
          url: `v4/restaurants?geohash=${geohash}&keyword=${keyword.value}`
        });
        emit("searchRestaurants", res);
      }
    };
    return (_ctx, _cache) => {
      return {
        a: __props.placeholder,
        b: keyword.value,
        c: common_vendor.o(($event) => keyword.value = $event.detail.value),
        d: common_vendor.o(search)
      };
    };
  }
};
var Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/components/my-search/my-search.vue"]]);
wx.createComponent(Component);
