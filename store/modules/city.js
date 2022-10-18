import {
  request
} from "@/utils/request.js"
export default {
  namespaced: true,
  state() {
    return {
      curCityList: {},
      hotCityList: {},
      groupCityList: {}
    }
  },
  mutations: {
    getcurCityList(state, payload) {
      if (payload.length === 8) {
        state.hotCityList = payload
      } else if (payload.A) {
        state.groupCityList = payload
      } else {
        state.curCityList = payload
      }
    }
  },
  actions: {
    async getCityList({
      commit
    }, city) {
      let cityList = await request({
        url: `v1/cities?type=${city}`
      })
      commit('getcurCityList', cityList)
    }
  }
}
