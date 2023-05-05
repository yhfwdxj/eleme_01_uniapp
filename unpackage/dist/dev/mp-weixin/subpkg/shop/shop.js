"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
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
    let tagIndex = common_vendor.ref(0);
    let curWindowWidth = common_vendor.ref("");
    let shopId = common_vendor.ref("");
    common_vendor.ref([]);
    let rightScrollTop = common_vendor.ref([]);
    let rightScrollHeight = common_vendor.ref("");
    let rightScrollTop2 = common_vendor.ref("");
    let active = common_vendor.ref(0);
    const currentInstance = common_vendor.getCurrentInstance();
    const store = common_vendor.useStore();
    let hasFood = common_vendor.ref(false);
    common_vendor.ref(0);
    let foodsInfo = common_vendor.computed(() => store.state.shopcart.cart);
    let changeBox = common_vendor.ref(0);
    common_vendor.ref();
    let timer = void 0;
    let leftIntoView = common_vendor.ref("left0");
    let rightIntoView = common_vendor.ref("right0");
    common_vendor.reactive({});
    let isclick = false;
    let rightScrollWidth = common_vendor.ref();
    let leftScrollWidth = common_vendor.ref();
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
      rightScrollWidth.value = curWindowWidth.value * 0.75;
      leftScrollWidth.value = curWindowWidth.value * 0.2;
      common_vendor.nextTick$1(() => {
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
    common_vendor.onUnload(() => {
      store.commit("shopcart/clear", []);
    });
    const scrollToRight = (item, i) => {
      isclick = true;
      rightIntoView.value = "right" + item.id;
      active.value = i;
      setTimeout(() => {
        isclick = false;
      }, 500);
    };
    const rightscr = (e) => {
      if (!isclick) {
        if (timer !== void 0)
          clearTimeout(timer);
        timer = setTimeout(function() {
          for (let i = rightScrollTop.value.length - 1; i >= 0; i--) {
            if (e.detail.scrollTop >= rightScrollTop.value[i] - rightScrollTop.value[0] - 2) {
              active.value = i;
              break;
            }
          }
        }, 70);
      }
    };
    const showCart = () => {
      if (foodsInfo.value.length !== 0)
        hasFood.value = !hasFood.value;
    };
    const reduce = (curFood) => {
      curFood.num--;
      store.commit("shopcart/reduceCart", curFood);
    };
    const add = (curFood) => {
      hasFood.value = true;
      curFood.num++;
      store.commit("shopcart/addToCart", curFood);
    };
    const goOrder = () => {
      common_vendor.index.navigateTo({
        url: `/subpkg/shopOrder/shopOrder?id=${res.value.id}&longitude=${res.value.longitude}&latitude=${res.value.latitude}`
      });
    };
    const changeTag = (i) => {
      tagIndex.value = i;
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
            c: common_vendor.o(($event) => scrollToRight(item, i), i),
            d: i,
            e: "left" + i,
            f: common_vendor.n(common_vendor.unref(active) === i ? "active" : "")
          };
        }),
        n: common_vendor.unref(rightScrollHeight) + "rpx",
        o: common_vendor.unref(leftScrollWidth) + "rpx",
        p: common_vendor.unref(leftIntoView),
        q: common_vendor.f(common_vendor.unref(res2), (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: "right" + item.id,
            c: common_vendor.f(item.foods, (item2, i2, i1) => {
              return {
                a: "https://elm.cangdu.org/img/" + item2.image_path,
                b: common_vendor.t(item2.name),
                c: common_vendor.t(item2.description),
                d: common_vendor.t(item2.month_sales),
                e: common_vendor.t(item2.satisfy_rate),
                f: common_vendor.t(item2.specfoods[0].price),
                g: "5cef12df-0-" + i0 + "-" + i1,
                h: common_vendor.p({
                  item2,
                  shopId: common_vendor.unref(shopId)
                }),
                i: i2
              };
            }),
            d: i
          };
        }),
        r: "140rpx",
        s: "140rpx",
        t: common_vendor.unref(rightScrollHeight) + "rpx",
        v: common_vendor.unref(rightScrollWidth) + "rpx",
        w: common_vendor.unref(rightScrollTop2),
        x: common_vendor.o(rightscr),
        y: common_vendor.unref(rightIntoView)
      } : {}, {
        z: common_vendor.unref(foodsInfo).length !== 0 && common_vendor.unref(hasFood)
      }, common_vendor.unref(foodsInfo).length !== 0 && common_vendor.unref(hasFood) ? {
        A: common_vendor.f(common_vendor.unref(foodsInfo), (curFood, i, i0) => {
          return common_vendor.e({
            a: "https://elm.cangdu.org/img/" + curFood.image_path,
            b: common_vendor.t(curFood.name),
            c: common_vendor.t(curFood.price),
            d: curFood.num !== 0
          }, curFood.num !== 0 ? {
            e: common_vendor.o(($event) => reduce(curFood), i),
            f: common_vendor.t(curFood.num)
          } : {}, {
            g: common_vendor.o(($event) => add(curFood), i),
            h: i
          });
        })
      } : {}, {
        B: common_vendor.unref(res)
      }, common_vendor.unref(res) ? common_vendor.e({
        C: common_vendor.unref(foodsInfo).length === 0
      }, common_vendor.unref(foodsInfo).length === 0 ? {} : {}, {
        D: common_vendor.t(_ctx.$store.getters["shopcart/total"]),
        E: common_vendor.t(common_vendor.unref(res).float_delivery_fee),
        F: common_vendor.o(showCart),
        G: common_vendor.o(goOrder)
      }) : {}, {
        H: common_vendor.unref(changeBox) === 1
      }, common_vendor.unref(changeBox) === 1 ? common_vendor.e({
        I: common_vendor.unref(scores)
      }, common_vendor.unref(scores) ? {
        J: common_vendor.t(common_vendor.unref(res).rating),
        K: common_vendor.t((common_vendor.unref(scores).compare_rating * 100).toFixed(1)),
        L: common_vendor.p({
          rating: common_vendor.unref(res).rating
        }),
        M: common_vendor.t(common_vendor.unref(scores).food_score.toFixed(1)),
        N: common_vendor.t(common_vendor.unref(scores).service_score.toFixed(1))
      } : {}, {
        O: common_vendor.f(common_vendor.unref(tag), (item, i, i0) => {
          return {
            a: common_vendor.t(item.name),
            b: common_vendor.t(item.count),
            c: i,
            d: common_vendor.o(($event) => changeTag(i), i),
            e: common_vendor.n(common_vendor.unref(tagIndex) === i ? "tag-color" : "")
          };
        }),
        P: common_vendor.t(common_vendor.unref(rating)[0].username),
        Q: common_vendor.t(common_vendor.unref(rating)[0].username)
      }) : {}) : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-5cef12df"], ["__file", "E:/Study/myWork/eleme_01_uniapp/subpkg/shop/shop.vue"]]);
wx.createPage(MiniProgramPage);
