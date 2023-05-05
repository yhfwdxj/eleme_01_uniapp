"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_message = require("../../utils/message.js");
const _sfc_main = {
  __name: "city",
  setup(__props) {
    const store = common_vendor.useStore();
    common_vendor.onLoad(() => {
      utils_message.loading();
      store.dispatch("city/getCityList", "guess");
      store.dispatch("city/getCityList", "hot");
      store.dispatch("city/getCityList", "group");
    });
    let char = common_vendor.ref([]);
    const curCityList = common_vendor.computed(() => store.state.city.curCityList);
    const hotCityList = common_vendor.computed(() => store.state.city.hotCityList);
    const groupCityList = common_vendor.computed(() => store.state.city.groupCityList);
    const groupCityOrder = common_vendor.computed(() => {
      let group = common_vendor.reactive({});
      let newChar = "";
      for (let i = 65; i <= 90; i++) {
        if (groupCityList.value[String.fromCharCode(i)]) {
          newChar = String.fromCharCode(i);
          if (!char.value[i]) {
            char.value.push(newChar);
          }
          group[String.fromCharCode(i)] = groupCityList.value[String.fromCharCode(i)];
        }
      }
      return group;
    });
    const goToCity = () => {
      common_vendor.index.navigateTo({
        url: `/subpkg/location/location?city_id=${curCityList.value.id}&geohash=${+curCityList.value.latitude},${curCityList.value.longitude}`
      });
    };
    const changeCur = (item) => {
      common_vendor.index.navigateTo({
        url: `/subpkg/location/location?city_id=${item.id}&geohash=${item.latitude},${item.longitude}`
      });
    };
    const changeCur2 = (item) => {
      common_vendor.index.navigateTo({
        url: `/subpkg/location/location?city_id=${item.id}&geohash=${item.latitude},${item.longitude}`
      });
    };
    const jumpChar = (char2) => {
      common_vendor.index.pageScrollTo({
        selector: "#" + char2,
        duration: 300
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
            b: index,
            c: common_vendor.o(($event) => changeCur(item), index)
          };
        }),
        f: common_vendor.f(common_vendor.unref(char), (item, i, i0) => {
          return {
            a: common_vendor.t(item),
            b: i,
            c: common_vendor.o(($event) => jumpChar(item), i)
          };
        }),
        g: common_vendor.f(common_vendor.unref(groupCityOrder), (order, k, i) => {
          return common_vendor.e({
            a: i === 0
          }, i === 0 ? {} : {}, {
            b: common_vendor.t(k),
            c: k,
            d: common_vendor.f(order, (orderList, i2, i1) => {
              return {
                a: common_vendor.t(orderList.name),
                b: common_vendor.o(($event) => changeCur2(orderList), i2),
                c: i2
              };
            }),
            e: i
          });
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/city/city.vue"]]);
wx.createPage(MiniProgramPage);
