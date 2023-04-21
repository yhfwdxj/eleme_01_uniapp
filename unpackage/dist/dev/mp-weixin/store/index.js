"use strict";
const common_vendor = require("../common/vendor.js");
const store_modules_city = require("./modules/city.js");
const store_modules_restaurants = require("./modules/restaurants.js");
const store_modules_shopcart = require("./modules/shopcart.js");
const store_modules_user = require("./modules/user.js");
const store = common_vendor.createStore({
  modules: {
    city: store_modules_city.city,
    restaurants: store_modules_restaurants.restaurants,
    shopcart: store_modules_shopcart.shopcart,
    user: store_modules_user.user
  }
});
exports.store = store;
