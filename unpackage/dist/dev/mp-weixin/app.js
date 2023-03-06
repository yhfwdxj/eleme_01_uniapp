"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports[Symbol.toStringTag] = "Module";
var common_vendor = require("./common/vendor.js");
var utils_request = require("./utils/request.js");
var store_index = require("./store/index.js");
require("./store/modules/city.js");
require("./store/modules/restaurants.js");
require("./store/modules/shopcart.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/order/order.js";
  "./pages/user/user.js";
  "./subpkg/city/city.js";
  "./subpkg/location/location.js";
  "./subpkg/search/search.js";
  "./subpkg/shop/shop.js";
  "./subpkg/shopOrder/shopOrder.js";
  "./subpkg/address/address.js";
  "./subpkg/remark/remark.js";
  "./subpkg/login/login.js";
}
const _sfc_main = {
  onLaunch: function() {
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
var App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "E:/Study/myWork/eleme_01_uniapp/App.vue"]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.provide("request", utils_request.request);
  app.use(store_index.store);
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
