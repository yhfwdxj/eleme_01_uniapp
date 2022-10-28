"use strict";
var common_vendor = require("../common/vendor.js");
var store_modules_city = require("./modules/city.js");
var store_modules_restaurants = require("./modules/restaurants.js");
var store = common_vendor.createStore({
  modules: {
    city: store_modules_city.city,
    restaurants: store_modules_restaurants.restaurants
  }
});
exports.store = store;
