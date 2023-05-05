"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
const _sfc_main = {
  __name: "my-search",
  props: ["placeholder", "geohash", "cityId"],
  emits: ["searchContext", "searchRestaurants"],
  setup(__props, { emit }) {
    const props = __props;
    let id = common_vendor.ref("");
    let geohash = common_vendor.ref("");
    let isFocus = common_vendor.ref(true);
    let keyword = common_vendor.ref("");
    let res = common_vendor.ref("");
    common_vendor.ref("");
    id.value = props.cityId;
    geohash.value = props.geohash;
    let geohash2 = common_vendor.ref("");
    common_vendor.onLoad(() => {
      if (common_vendor.index.getStorageSync("address")) {
        let cur = JSON.parse(common_vendor.index.getStorageSync("address") || "{}");
        geohash2.value = `${cur.location.lat},${cur.location.lng}`;
      }
    });
    const blurChange = (e) => {
      keyword.value = e.detail.value;
    };
    const search = async () => {
      isFocus.value = false;
      let test;
      clearTimeout(test);
      test = setTimeout(async () => {
        if (id.value && keyword.value) {
          res = await common_vendor.index.request({
            url: `http://apis.map.qq.com/ws/place/v1/search?key=PVABZ-4IO6D-4WK47-PKUCM-TD4DV-WOF6U&keyword=${encodeURI(keyword.value)}&boundary=nearby(${geohash.value},1000,1)`,
            method: "get"
          });
          emit("searchContext", res);
        } else {
          res = await utils_request.request({
            url: `v4/restaurants?geohash=${geohash2.value}&keyword=${keyword.value}`
          });
          emit("searchRestaurants", res);
        }
      }, 100);
    };
    return (_ctx, _cache) => {
      return {
        a: __props.placeholder,
        b: common_vendor.unref(isFocus),
        c: common_vendor.o(blurChange),
        d: common_vendor.unref(keyword),
        e: common_vendor.o(($event) => common_vendor.isRef(keyword) ? keyword.value = $event.detail.value : keyword = $event.detail.value),
        f: common_vendor.o(search)
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/components/my-search/my-search.vue"]]);
wx.createComponent(Component);
