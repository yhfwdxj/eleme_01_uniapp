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
    });
    const keyword = common_vendor.ref("");
    let res = common_vendor.ref("");
    const search = async () => {
      if (id && keyword.value) {
        res = await utils_request.request({
          url: `v1/pois?city_id=${id}&keyword=${keyword.value}&type=search`
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
