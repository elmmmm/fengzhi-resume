import Vuex from "vuex"
import Vue from "vue"
import cvOne from "./cvOne"
import cvTwo from "./cvTwo"
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        cvOne,
        cvTwo
    }
})