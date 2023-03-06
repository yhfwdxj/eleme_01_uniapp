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
      let allplace = JSON.parse(common_vendor.index.getStorageSync("curplace") || "[]");
      curplace.value = allplace;
    });
    let res = common_vendor.ref();
    const placeholder = common_vendor.ref("\u8BF7\u8F93\u5165\u5730\u5740");
    const searchContext = (emit) => {
      if (emit.data) {
        res.value = emit.data.data;
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
    let curplace = common_vendor.ref([]);
    let setflag = true;
    const curAddress = (item) => {
      let allplace = JSON.parse(common_vendor.index.getStorageSync("curplace") || "[]");
      curplace.value = allplace;
      if (allplace.length > 0) {
        curplace.value.forEach((cur, i) => {
          if (cur.geohash === item.geohash) {
            setflag = false;
            curplace.value.splice(i, i);
            curplace.value.push(item);
            curplace.value.reverse();
          }
        });
        if (setflag) {
          curplace.value.push(item);
          curplace.value.reverse();
        }
        common_vendor.index.setStorageSync("curplace", JSON.stringify(curplace.value));
      } else {
        curplace.value.push(item);
        common_vendor.index.setStorageSync("curplace", JSON.stringify(curplace.value));
      }
    };
    const goIndex = (item) => {
      let allplace = JSON.parse(common_vendor.index.getStorageSync("curplace") || "[]");
      curplace.value = allplace;
      curplace.value.forEach((cur, i) => {
        if (cur.geohash === item.geohash) {
          setflag = false;
          curplace.value.splice(i, i);
          curplace.value.push(item);
          curplace.value.reverse();
        }
      });
      if (setflag) {
        curplace.value.push(item);
        curplace.value.reverse();
      }
      common_vendor.index.setStorageSync("curplace", JSON.stringify(curplace.value));
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.t(common_vendor.unref(curCity).name),
        b: common_vendor.o(changeCity),
        c: common_vendor.o(searchContext),
        d: common_vendor.p({
          placeholder: placeholder.value
        }),
        e: common_vendor.unref(res)
      }, common_vendor.unref(res) ? {
        f: common_vendor.f(common_vendor.unref(res), (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.address),
            c: i,
            d: common_vendor.o(($event) => curAddress(item), i)
          };
        })
      } : {
        g: common_vendor.f(common_vendor.unref(curplace), (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.address),
            c: i,
            d: common_vendor.o(($event) => goIndex(item), i)
          };
        })
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/location/location.vue"]]);
wx.createPage(MiniProgramPage);
