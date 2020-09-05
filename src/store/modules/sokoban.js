const state = {
  mapElementArray: [
    {
      name: '人',
      num: 10
    },
    {
      name: '墙',
      num: '98'
    },
    {
      name: '箱子',
      num: 1
    },
    {
      name: '终点',
      num: 2
    },
    {
      name: '墙内空地',
      num: 0
    },
    {
      name: '墙外空地',
      num: 99
    },
    {
      name: '箱子&&终点',
      num: 3
    }
  ],
  // 系统存储的地图
  systemMapArray: [
    [99, 99, 99, 98, 98, 98, 98, 98, 98, 99],
    [99, 98, 98, 98, 0, 0, 0, 0, 98, 99],
    [98, 98, 2, 0, 1, 98, 98, 0, 98, 98],
    [98, 2, 2, 1, 0, 1, 0, 0, 10, 98],
    [98, 2, 2, 0, 1, 0, 1, 0, 98, 98],
    [98, 98, 98, 98, 98, 98, 0, 0, 98, 99],
    [99, 99, 99, 99, 99, 98, 98, 98, 98, 99]
  ],
  userMapArray: [], // 用户自己设计的地图
  // 地图元素命名
  mapElementName: {
    0: {
      name: '墙内空地',
      icon: require('@/assets/image/墙内空地.png'),
      type: 'move' // 可移动类型，表示任何情况下可以移动
    },
    1: {
      name: '箱子',
      icon: require('@/assets/image/箱子.png'),
      type: 'MF' // move&&fix,表示不确定类型，可移动或者是不可移动
    },
    2: {
      name: '终点',
      icon: require('@/assets/image/终点.png'),
      type: 'move'
    },
    3: {
      name: '箱子&&终点',
      icon: require('@/assets/image/箱子&&终点.png'),
      type: 'MF'
    },
    10: {
      name: '人',
      icon: require('@/assets/image/人.png'),
      type: 'fix'
    },
    12: {
      name: '人',
      icon: require('@/assets/image/人.png'),
      type: 'fix'
    },
    109: {
      name: '人',
      icon: require('@/assets/image/人.png'),
      type: 'fix'
    },
    98: {
      name: '墙',
      icon: require('@/assets/image/墙.png'),
      type: 'fix'
    },
    99: {
      name: '墙外空地',
      icon: require('@/assets/image/墙外空地.png'),
      type: 'move'
    }
  },
  //  地图大小选项
  mapSize: [
    {
      value: 1,
      label: '9 X 9'
    },
    {
      value: 2,
      label: '10 X 10'
    },
    {
      value: 3,
      label: '11 X 11'
    },
    {
      value: 4,
      label: '12 X 12'
    }
  ]
}
const mutations = {
  SET_MAP_ARRAY(state, array) {
    state.userMapArray = array
  }
}
const actions = {
  // 设置name
  setMapArray({ commit }, array) {
    commit('SET_MAP_ARRAY', array)
  }
}
const getters = {
  systemMapArray: state => state.systemMapArray,
  mapElementName: state => state.mapElementName,
  mapSize: state => state.mapSize,
  mapElementArray: state => state.mapElementArray,
  userMapArray: state => state.userMapArray
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
