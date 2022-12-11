export default {
  namespaced: true,
  state() {
    return {
      cart: [],
      remark: '',
      order: []
    }
  },
  mutations: {
    addToCart(state, payLoad) {
      let findResult = state.cart.find((item) => item.item_id === payLoad.item_id)
      if (!findResult) {
        state.cart = state.cart.concat(payLoad)
      }
    },
    reduceCart(state, payLoad) {
      let findResult = state.cart.find((item) => item.item_id === payLoad.item_id)
      if (findResult.num === 0) {
        state.cart = state.cart.filter((item) => item.item_id !== findResult.item_id)
      }
    },
    changeRemark(state, payLoad) {
      state.remark = payLoad
    },
    clear(state, payLoad) {
      state.order = state.cart
      state.cart = payLoad
      console.log('order', state.order);
    }
  },
  getters: {
    total(state) {
      let totalPrice = 0
      state.cart.forEach((item) => {
        totalPrice += item.price * item.num
      })
      return totalPrice
    }
  }
}
