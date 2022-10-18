"use strict";
var common_vendor = require("../common/vendor.js");
var store_modules_city = require("./modules/city.js");
var store = common_vendor.createStore({
  modules: {
    city: store_modules_city.city
  }
});
exports.store = store;
