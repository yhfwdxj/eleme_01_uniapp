"use strict";
const user = {
  namespaced: true,
  state() {
    return {
      userInfo: {}
    };
  },
  mutations: {
    getUserInfo(state, payload) {
      state.userInfo = payload;
      console.log(state.userInfo);
    }
  }
};
exports.user = user;
