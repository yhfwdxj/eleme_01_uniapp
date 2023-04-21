"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
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
    let geohash = common_vendor.ref("");
    let cityId = common_vendor.ref("");
    common_vendor.onLoad(async (options) => {
      cityId.value = options.city_id;
      geohash.value = options.geohash;
      curCity.value = await utils_request.request({
        url: `v1/cities/${cityId.value}`
      });
      let allplace = JSON.parse(common_vendor.index.getStorageSync("curplace") || "[]");
      curplace.value = allplace;
    });
    let res = common_vendor.ref();
    const placeholder = common_vendor.ref("请输入地址");
    const searchContext = (emit) => {
      if (emit.data) {
        res.value = emit.data.data;
      } else {
        common_vendor.index.showToast({
          title: "无返回内容",
          icon: "error"
        });
      }
    };
    const changeCity = () => {
      common_vendor.index.navigateTo({
        url: `/subpkg/city/city`
      });
    };
    let curplace = common_vendor.ref([]);
    const curAddress = (item) => {
      let allplace = JSON.parse(common_vendor.index.getStorageSync("curplace") || "[]");
      let setPlace = /* @__PURE__ */ new Map();
      allplace.push(item);
      let res2 = allplace.filter((item2) => {
        return !setPlace.has(item2.id) && setPlace.set(item2.id, item2.id);
      });
      console.log(res2);
      common_vendor.index.setStorageSync("curplace", JSON.stringify(res2));
      common_vendor.index.removeStorageSync("address");
      common_vendor.index.setStorageSync("address", JSON.stringify(item));
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    const goIndex = (item) => {
      common_vendor.index.removeStorageSync("address");
      common_vendor.index.setStorageSync("address", JSON.stringify(item));
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(curCity)
      }, common_vendor.unref(curCity) ? common_vendor.e({
        b: common_vendor.t(common_vendor.unref(curCity).name),
        c: common_vendor.o(changeCity),
        d: common_vendor.o(searchContext),
        e: common_vendor.p({
          placeholder: placeholder.value,
          cityId: common_vendor.unref(cityId),
          geohash: common_vendor.unref(geohash)
        }),
        f: common_vendor.unref(res)
      }, common_vendor.unref(res) ? {
        g: common_vendor.f(common_vendor.unref(res), (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.address),
            c: i,
            d: common_vendor.o(($event) => curAddress(item), i)
          };
        })
      } : {
        h: common_vendor.f(common_vendor.unref(curplace), (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.address),
            c: i,
            d: common_vendor.o(($event) => goIndex(item), i)
          };
        })
      }) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/location/location.vue"]]);
wx.createPage(MiniProgramPage);
