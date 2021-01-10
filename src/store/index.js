import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import sokoban from './modules/sokoban'
import greedySnake from './modules/greedySnake'
import game from './modules/game'
Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    sokoban,
    greedySnake,
    game
  },
  getters
})

export default store
