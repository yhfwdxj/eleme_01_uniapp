export default {
  namespaced: true,
  state() {
    return {
      userInfo: {}
    }
  },
  mutations: {
    getUserInfo(state, payload) {
      state.userInfo = payload
      console.log(state.userInfo);
    }
  }
}