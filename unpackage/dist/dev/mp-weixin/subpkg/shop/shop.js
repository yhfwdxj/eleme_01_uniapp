"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_my_shopcart2 = common_vendor.resolveComponent("my-shopcart");
  _easycom_my_shopcart2();
}
const _easycom_my_shopcart = () => "../../components/my-shopcart/my-shopcart.js";
if (!Math) {
  _easycom_my_shopcart();
}
const _sfc_main = {
  __name: "shop",
  setup(__props) {
    let res = common_vendor.ref();
    let res2 = common_vendor.ref();
    let res3 = common_vendor.ref();
    let curWindowWidth = common_vendor.ref("");
    let shopId = common_vendor.ref("");
    common_vendor.ref([]);
    let rightScrollTop = common_vendor.ref([]);
    let rightScrollHeight = common_vendor.ref("");
    let rightScrollTop2 = common_vendor.ref("");
    const currentInstance = common_vendor.getCurrentInstance();
    const store = common_vendor.useStore();
    common_vendor.ref(0);
    let foodsInfo = common_vendor.computed$1(() => store.state.shopcart.cart);
    let changeBox = common_vendor.ref(0);
    common_vendor.onLoad(async (option) => {
      shopId.value = option.shop_id;
      res.value = await utils_request.request({
        url: `shopping/restaurant/${option.shop_id}`
      });
      res2.value = await utils_request.request({
        url: `shopping/v2/menu?restaurant_id=${option.shop_id}`
      });
      const {
        windowHeight,
        windowWidth
      } = common_vendor.index.getSystemInfoSync();
      res3.value = windowHeight;
      curWindowWidth.value = windowWidth * 1.8;
      common_vendor.nextTick(() => {
        const query = common_vendor.index.createSelectorQuery().in(currentInstance.proxy);
        query.selectAll(".title").boundingClientRect((data) => {
          data.forEach((item, i) => {
            rightScrollTop.value[i] = item.top;
          });
        }).exec();
        let rightScroll = common_vendor.index.createSelectorQuery().in(currentInstance.proxy).select(".right-scroll");
        rightScroll.fields({
          size: true,
          scrollOffset: true,
          rect: true
        }, (data) => {
          rightScrollHeight.value = (res3.value - data.top) * 2 - 30;
        }).exec();
      });
    });
    const scrollToRight = (i) => {
      if (rightScrollTop2.value === rightScrollTop.value[i] - rightScrollTop.value[0]) {
        rightScrollTop2.value += 0.1;
      } else {
        rightScrollTop2.value = rightScrollTop.value[i] - rightScrollTop.value[0];
      }
    };
    const test = () => {
      console.log(foodsInfo.value[0]);
    };
    const reduce = (curFood) => {
      curFood.num--;
      store.commit("shopcart/reduceCart", curFood);
    };
    const add = (curFood) => {
      curFood.num++;
      store.commit("shopcart/addToCart", curFood);
      console.log(changeBox);
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(res)
      }, common_vendor.unref(res) ? {
        b: common_vendor.t(common_vendor.unref(res).name),
        c: common_vendor.t(common_vendor.unref(res).rating),
        d: common_vendor.t(common_vendor.unref(res).delivery_mode.text),
        e: common_vendor.t(common_vendor.unref(res).recent_order_num),
        f: "https://elm.cangdu.org/img/" + common_vendor.unref(res).image_path,
        g: common_vendor.t(common_vendor.unref(res).promotion_info),
        h: common_vendor.t(common_vendor.unref(res).activities[0].description)
      } : {}, {
        i: common_vendor.o(($event) => common_vendor.isRef(changeBox) ? changeBox.value = 0 : changeBox = 0),
        j: common_vendor.o(($event) => common_vendor.isRef(changeBox) ? changeBox.value = 1 : changeBox = 1),
        k: common_vendor.unref(changeBox) === 0
      }, common_vendor.unref(changeBox) === 0 ? {
        l: common_vendor.f(common_vendor.unref(res2), (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: i,
            c: common_vendor.o(($event) => scrollToRight(i), i)
          };
        }),
        m: common_vendor.unref(rightScrollHeight) + "rpx",
        n: common_vendor.f(common_vendor.unref(res2), (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.f(item.foods, (item2, i2, i1) => {
              return {
                a: "https://elm.cangdu.org/img/" + item2.image_path,
                b: common_vendor.t(item2.name),
                c: common_vendor.t(item2.description),
                d: common_vendor.t(item2.month_sales),
                e: common_vendor.t(item2.satisfy_rate),
                f: common_vendor.t(item2.specfoods[0].price),
                g: "2a42858c-0-" + i0 + "-" + i1,
                h: common_vendor.p({
                  item2,
                  shopId: common_vendor.unref(shopId)
                }),
                i: i2
              };
            }),
            c: i
          };
        }),
        o: 140 + "rpx",
        p: 140 + "rpx",
        q: common_vendor.unref(rightScrollHeight) + "rpx",
        r: common_vendor.unref(rightScrollTop2)
      } : {}, {
        s: common_vendor.unref(foodsInfo).length !== 0
      }, common_vendor.unref(foodsInfo).length !== 0 ? {
        t: common_vendor.f(common_vendor.unref(foodsInfo), (curFood, i, i0) => {
          return common_vendor.e({
            a: "https://elm.cangdu.org/img/" + curFood.image_path,
            b: common_vendor.t(curFood.name),
            c: common_vendor.t(curFood.price),
            d: curFood.num !== 0
          }, curFood.num !== 0 ? {
            e: common_vendor.o(($event) => reduce(curFood)),
            f: common_vendor.t(curFood.num)
          } : {}, {
            g: common_vendor.o(($event) => add(curFood)),
            h: i
          });
        })
      } : {}, {
        v: common_vendor.unref(res)
      }, common_vendor.unref(res) ? {
        w: common_vendor.t(_ctx.$store.getters["shopcart/total"]),
        x: common_vendor.t(common_vendor.unref(res).float_delivery_fee),
        y: common_vendor.o(test)
      } : {}, {
        z: common_vendor.unref(curWindowWidth) + "rpx",
        A: common_vendor.unref(changeBox) === 1
      }, common_vendor.unref(changeBox) === 1 ? {} : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2a42858c"], ["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/shop/shop.vue"]]);
wx.createPage(MiniProgramPage);
