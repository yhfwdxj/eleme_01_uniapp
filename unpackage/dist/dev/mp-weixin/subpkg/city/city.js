"use strict";
var common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "city",
  setup(__props) {
    const store = common_vendor.useStore();
    common_vendor.onLoad(() => {
      store.dispatch("city/getCityList", "guess");
      store.dispatch("city/getCityList", "hot");
      store.dispatch("city/getCityList", "group");
    });
    const curCityList = common_vendor.computed$1(() => store.state.city.curCityList);
    const hotCityList = common_vendor.computed$1(() => store.state.city.hotCityList);
    const groupCityList = common_vendor.computed$1(() => store.state.city.groupCityList);
    const groupCityOrder = common_vendor.computed$1(() => {
      let group = common_vendor.reactive({});
      for (let i = 65; i <= 90; i++) {
        if (groupCityList.value[String.fromCharCode(i)]) {
          group[String.fromCharCode(i)] = groupCityList.value[String.fromCharCode(i)];
        }
      }
      return group;
    });
    const goToCity = () => {
      common_vendor.index.navigateTo({
        url: "",
        success: (res) => {
        },
        fail: () => {
        },
        complete: () => {
        }
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(curCityList)
      }, common_vendor.unref(curCityList) ? {
        b: common_vendor.t(common_vendor.unref(curCityList).name),
        c: common_vendor.o(goToCity)
      } : {}, {
        d: common_vendor.o((...args) => _ctx.test && _ctx.test(...args)),
        e: common_vendor.f(common_vendor.unref(hotCityList), (item, index, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: index
          };
        }),
        f: common_vendor.f(common_vendor.unref(groupCityOrder), (order, k, i) => {
          return common_vendor.e({
            a: i === 0
          }, i === 0 ? {} : {}, {
            b: common_vendor.t(k),
            c: common_vendor.f(order, (orderList, i2, i1) => {
              return {
                a: common_vendor.t(orderList.name),
                b: i2
              };
            }),
            d: i
          });
        })
      });
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/city/city.vue"]]);
wx.createPage(MiniProgramPage);
