import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import sokoban from './modules/sokoban'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sokoban
  },
  getters
})

export default store
