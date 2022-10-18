import {
  createStore
} from "vuex"
import city from "@/store/modules/city.js"
export default createStore({
  modules: {
    city
  }
})
