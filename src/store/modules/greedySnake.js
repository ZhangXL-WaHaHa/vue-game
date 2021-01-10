const state = {
  // 地图大小
  mapSize: {
    x: 600,
    y: 600
  },
  //  食物
  food: {
    x: 10,
    y: 10
  },
  snakeHead: {
    x: 5,
    y: 8,
    direction: 'down'
  },
  snakeBody: [
    {
      x: 5,
      y: 7
    },
    {
      x: 5,
      y: 6
    },
    {
      x: 5,
      y: 5
    },
    {
      x: 5,
      y: 4
    },
    {
      x: 5,
      y: 3
    },
    {
      x: 5,
      y: 2
    },
    {
      x: 5,
      y: 1
    },
    {
      x: 5,
      y: 0
    }
  ]
}
const mutations = {}
const actions = {}
const getters = {
  mapSize: state => state.mapSize,
  food: state => state.food,
  snakeHead: state => state.snakeHead,
  snakeBody: state => state.snakeBody
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
