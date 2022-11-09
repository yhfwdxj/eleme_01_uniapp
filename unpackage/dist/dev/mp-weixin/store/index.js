"use strict";
var common_vendor = require("../common/vendor.js");
var store_modules_city = require("./modules/city.js");
var store_modules_restaurants = require("./modules/restaurants.js");
var store_modules_shopcart = require("./modules/shopcart.js");
var store = common_vendor.createStore({
  modules: {
    city: store_modules_city.city,
    restaurants: store_modules_restaurants.restaurants,
    shopcart: store_modules_shopcart.shopcart
  }
});
exports.store = store;
