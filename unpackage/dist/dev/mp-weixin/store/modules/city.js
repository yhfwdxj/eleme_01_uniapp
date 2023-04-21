"use strict";
const utils_request = require("../../utils/request.js");
const city = {
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
    // async getCityList({
    //   commit
    // }, city) {
    //   let tencentkey = 'RLHBZ-WMPRP-Q3JDS-V2IQA-JNRFH-EJBHL';
    //   		let tencentkey2 = 'RRXBZ-WC6KF-ZQSJT-N2QU7-T5QIT-6KF5X';
    //   		let tencentkey3 = 'OHTBZ-7IFRG-JG2QF-IHFUK-XTTK6-VXFBN';
    //   		let tencentkey4 = 'Z2BBZ-QBSKJ-DFUFG-FDGT3-4JRYV-JKF5O';
    //   		let baidukey = 'fjke3YUipM9N64GdOIh1DNeK2APO2WcT';
    //   let cityList = await request({
    //     url: `http://apis.map.qq.com/ws/location/v1/ip?key=${tencentkey}`
    //   })
    //   commit('getcurCityList', cityList)
    // }
  }
};
exports.city = city;
