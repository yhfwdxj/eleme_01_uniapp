import {
  createStore
} from "vuex"
import city from "@/store/modules/city.js"
import restaurants from "@/store/modules/restaurants.js"
export default createStore({
  modules: {
    city,
    restaurants
  }
})
