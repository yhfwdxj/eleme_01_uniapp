"use strict";
var common_vendor = require("../../common/vendor.js");
var utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_my_shopcart2 = common_vendor.resolveComponent("my-shopcart");
  const _easycom_my_star2 = common_vendor.resolveComponent("my-star");
  (_easycom_my_shopcart2 + _easycom_my_star2)();
}
const _easycom_my_shopcart = () => "../../components/my-shopcart/my-shopcart.js";
const _easycom_my_star = () => "../../components/my-star/my-star.js";
if (!Math) {
  (_easycom_my_shopcart + _easycom_my_star)();
}
const _sfc_main = {
  __name: "shop",
  setup(__props) {
    let res = common_vendor.ref();
    let res2 = common_vendor.ref();
    let res3 = common_vendor.ref();
    let rating = common_vendor.ref();
    let scores = common_vendor.ref();
    let tag = common_vendor.ref();
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
      rating.value = await utils_request.request({
        url: `ugc/v2/restaurants/${shopId.value}/ratings?limit=10`
      });
      scores.value = await utils_request.request({
        url: `ugc/v2/restaurants/${shopId.value}/ratings/scores`
      });
      tag.value = await utils_request.request({
        url: `ugc/v2/restaurants/${shopId.value}/ratings/tags`
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
    const reduce = (curFood) => {
      curFood.num--;
      store.commit("shopcart/reduceCart", curFood);
    };
    const add = (curFood) => {
      curFood.num++;
      store.commit("shopcart/addToCart", curFood);
    };
    const goOrder = () => {
      common_vendor.index.navigateTo({
        url: `/subpkg/shopOrder/shopOrder?id=${res.value.id}&longitude=${res.value.longitude}&latitude=${res.value.latitude}`
      });
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
        i: common_vendor.unref(res2)
      }, common_vendor.unref(res2) ? common_vendor.e({
        j: common_vendor.o(($event) => common_vendor.isRef(changeBox) ? changeBox.value = 0 : changeBox = 0),
        k: common_vendor.o(($event) => common_vendor.isRef(changeBox) ? changeBox.value = 1 : changeBox = 1),
        l: common_vendor.unref(changeBox) === 0
      }, common_vendor.unref(changeBox) === 0 ? {
        m: common_vendor.f(common_vendor.unref(res2), (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: i,
            c: common_vendor.o(($event) => scrollToRight(i), i)
          };
        }),
        n: common_vendor.unref(rightScrollHeight) + "rpx",
        o: common_vendor.f(common_vendor.unref(res2), (item, i, i0) => {
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
        p: 140 + "rpx",
        q: 140 + "rpx",
        r: common_vendor.unref(rightScrollHeight) + "rpx",
        s: common_vendor.unref(rightScrollTop2)
      } : {}, {
        t: common_vendor.unref(foodsInfo).length !== 0
      }, common_vendor.unref(foodsInfo).length !== 0 ? {
        v: common_vendor.f(common_vendor.unref(foodsInfo), (curFood, i, i0) => {
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
        w: common_vendor.unref(res)
      }, common_vendor.unref(res) ? {
        x: common_vendor.t(_ctx.$store.getters["shopcart/total"]),
        y: common_vendor.t(common_vendor.unref(res).float_delivery_fee),
        z: common_vendor.o(goOrder)
      } : {}, {
        A: common_vendor.unref(curWindowWidth) + "rpx",
        B: common_vendor.unref(changeBox) === 1
      }, common_vendor.unref(changeBox) === 1 ? common_vendor.e({
        C: common_vendor.unref(scores)
      }, common_vendor.unref(scores) ? {
        D: common_vendor.t(common_vendor.unref(res).rating),
        E: common_vendor.t((common_vendor.unref(scores).compare_rating * 100).toFixed(1)),
        F: common_vendor.p({
          rating: common_vendor.unref(res).rating
        }),
        G: common_vendor.t(common_vendor.unref(scores).food_score.toFixed(1)),
        H: common_vendor.t(common_vendor.unref(scores).service_score.toFixed(1))
      } : {}, {
        I: common_vendor.f(common_vendor.unref(tag), (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.count),
            c: i
          };
        }),
        J: common_vendor.t(common_vendor.unref(rating)[0].username),
        K: common_vendor.t(common_vendor.unref(rating)[0].username)
      }) : {}) : {});
    };
  }
};
var MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-2a42858c"], ["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/shop/shop.vue"]]);
wx.createPage(MiniProgramPage);
