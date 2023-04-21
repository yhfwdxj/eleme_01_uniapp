"use strict";
const utils_request = require("../../utils/request.js");
const restaurants = {
  namespaced: true,
  state() {
    return {
      restList: []
    };
  },
  mutations: {
    changeRes(state, payload) {
      state.restList = state.restList.concat(payload);
    }
  },
  actions: {
    async getRestaurants({
      commit
    }, {
      latitude,
      longitude,
      order_by,
      limit,
      offset
    }) {
      const curResList = await utils_request.request({
        url: `shopping/restaurants?latitude=${latitude}&longitude=${longitude}&order_by=${order_by || ""}&limit=${limit || ""}&offset=${offset || ""}`
      });
      commit("changeRes", curResList);
    }
  }
};
exports.restaurants = restaurants;
