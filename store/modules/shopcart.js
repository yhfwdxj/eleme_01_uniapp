export default {
  namespaced: true,
  state() {
    return {
      cart: []
    }
  },
  mutations: {
    addToCart(state, payLoad) {
      let findResult = state.cart.find((item) => item.id === payLoad.id)
      if (findResult) {
        findResult.num++
      } else {
        state.cart = state.cart.concat(payLoad)
      }
      console.log(state.cart);
    },
    reduceCart(state, payLoad) {
      let findResult = state.cart.find((item) => item.id === payLoad.id)
      if (findResult.num > 1) {
        findResult.num--
      } else {
        state.cart = state.cart.filter((item) => item.id !== findResult.id)
      }
      console.log(state.cart);
    }
  },
  actions: {}
}
