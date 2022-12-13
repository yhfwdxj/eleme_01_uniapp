"use strict";
var shopcart = {
  namespaced: true,
  state() {
    return {
      cart: [],
      remark: "",
      order: []
    };
  },
  mutations: {
    addToCart(state, payLoad) {
      let findResult = state.cart.find((item) => item.item_id === payLoad.item_id);
      if (!findResult) {
        state.cart = state.cart.concat(payLoad);
      }
    },
    reduceCart(state, payLoad) {
      let findResult = state.cart.find((item) => item.item_id === payLoad.item_id);
      if (findResult.num === 0) {
        state.cart = state.cart.filter((item) => item.item_id !== findResult.item_id);
      }
    },
    changeRemark(state, payLoad) {
      state.remark = payLoad;
    },
    clear(state, payLoad) {
      state.order = state.cart;
      state.cart = payLoad;
      console.log("order", state.order);
    },
    again(state) {
      state.cart = state.order;
    }
  },
  getters: {
    total(state) {
      let totalPrice = 0;
      state.cart.forEach((item) => {
        totalPrice += item.price * item.num;
      });
      return totalPrice;
    },
    total2(state) {
      let totalPrice2 = 0;
      state.order.forEach((item) => {
        totalPrice2 += item.price * item.num;
      });
      return totalPrice2;
    }
  }
};
exports.shopcart = shopcart;
