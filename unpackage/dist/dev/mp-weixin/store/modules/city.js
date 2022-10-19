"use strict";
var utils_request = require("../../utils/request.js");
var city = {
  namespaced: true,
  state() {
    return {
      curCityList: {},
      hotCityList: {},
      groupCityList: {}
    };
  },
  mutations: {
    getcurCityList(state, payload) {
      if (payload.length === 8) {
        state.hotCityList = payload;
      } else if (payload.A) {
        state.groupCityList = payload;
      } else {
        state.curCityList = payload;
      }
    }
  },
  actions: {
    async getCityList({
      commit
    }, city2) {
      let cityList = await utils_request.request({
        url: `v1/cities?type=${city2}`
      });
      commit("getcurCityList", cityList);
    }
  }
};
exports.city = city;
