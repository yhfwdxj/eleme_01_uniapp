import {
  createStore
} from "vuex"
import city from "@/store/modules/city.js"
import restaurants from "@/store/modules/restaurants.js"
import shopcart from "@/store/modules/shopcart.js"
export default createStore({
  modules: {
    city,
    restaurants,
    shopcart
  }
})
