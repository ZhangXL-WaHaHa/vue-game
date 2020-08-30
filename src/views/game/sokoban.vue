<template>
  <!--  推箱子小游戏，规格如下-->
  <!--  0表示墙内空地, 1表示箱子，2表示终点，3表示箱子&&终点，10表示人，98表示墙，99表示墙外空地-->
  <div class="container">
    <div v-for="(item, index) in mapArray" :key="index">
      <div v-for="(array, temp) in item" :key="temp" style="display: inline">
        <img :src="mapElementName[array].icon" class="map-image" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sokoban',
  computed: {
    maxRow: function() {
      return this.mapArray.length
    },
    maxColumn: function() {
      return this.mapArray[0].length
    }
  },
  data() {
    return {
      manPosition: [0, 0], // 记录当前人所在的位置
      // 地图数组
      mapArray: [
        [99, 99, 99, 98, 98, 98, 98, 98, 98, 99],
        [99, 98, 98, 98, 0, 0, 0, 0, 98, 99],
        [98, 98, 2, 0, 1, 98, 98, 0, 98, 98],
        [98, 2, 2, 1, 0, 1, 0, 0, 10, 98],
        [98, 2, 2, 0, 1, 0, 1, 0, 98, 98],
        [98, 98, 98, 98, 98, 98, 0, 0, 98, 99],
        [99, 99, 99, 99, 99, 98, 98, 98, 98, 99]
      ],
      // 相关的地图元素命名
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
      }
    }
  },
  created() {
    // 获取仓库中的地图数组
    // this.mapArray = this.$store.state.mapArra
    //  监听鼠标点击上下左右键
    document.addEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    // 监听键盘事件
    handleKeyDown(e) {
      // 循环判断当前的人所处的位置
      this.mapArray.forEach((item, index) => {
        item.forEach((array, temp) => {
          if (array === 10 || array === 12) {
            this.manPosition = [index, temp]
          }
        })
      })
      //  判断点击的键盘
      // 传递的参数：人所在的位置， 人要移动到的位置的相关元素信息以及下一个信息
      const man = this.manPosition
      const array = this.mapArray
      const name = this.mapElementName

      switch (e.keyCode) {
        case 38:
          this.toTop(name[array[man[0] - 1][man[1]]], man[0] - 2 < 0 ? false : name[array[man[0] - 2][man[1]]])
          break
        case 40:
          this.toBottom(
            name[array[man[0] + 1][man[1]]],
            man[0] + 3 > this.maxRow ? false : name[array[man[0] + 2][man[1]]]
          )
          break
        case 37:
          this.toLeft(name[array[man[0]][man[1] - 1]], man[1] - 2 < 0 ? false : name[array[man[0]][man[1] - 2]])
          break
        case 39:
          this.toRight(
            name[array[man[0]][man[1] + 1]],
            man[1] + 3 > this.maxColumn ? false : name[array[man[0]][man[1] + 2]]
          )
      }
    },

    //  向下走
    toBottom(next, doubleNext) {
      console.log('点击了向下')
      //  1.人的下边是墙
      if (next.type === 'fix') {
        return
      }
      //  2.人的下边是箱子，箱子的下边是箱子或者是箱子&&终点或者是墙
      if (next.type === 'MF' && doubleNext) {
        if (doubleNext.type === 'MF' || doubleNext.type === 'fix') {
          return
        }
        //  开始移动
        //  人的位置减去10，下面的位置减去箱子加上人，下下面的位置加上箱子
        this.mapArray[this.manPosition[0]][this.manPosition[1]] -= 10
        this.mapArray[this.manPosition[0] + 1][this.manPosition[1]] -= 1
        this.mapArray[this.manPosition[0] + 1][this.manPosition[1]] += 10
        this.mapArray[this.manPosition[0] + 2][this.manPosition[1]] += 1
      }
      //  3.人的下边是空地或者是终点
      if (next.type === 'move') {
        //  人的位置减去10， 下边位置加上10
        this.mapArray[this.manPosition[0]][this.manPosition[1]] -= 10
        this.mapArray[this.manPosition[0] + 1][this.manPosition[1]] += 10
      }
      //  刷新页面
      this.$forceUpdate()
    },

    //  向上走
    toTop(next, doubleNext) {
      console.log('点击了向上')
      //  1.人的上边是墙
      if (next.type === 'fix') {
        return
      }
      //  2.人的上边是箱子，箱子的上边是箱子或者是箱子&&终点或者是墙
      if (next.type === 'MF' && doubleNext) {
        if (doubleNext.type === 'MF' || doubleNext.type === 'fix') {
          return
        }
        //  开始移动
        //  人的位置减去10，上面的位置减去箱子加上人，上上面的位置加上箱子
        this.mapArray[this.manPosition[0]][this.manPosition[1]] -= 10
        this.mapArray[this.manPosition[0] - 1][this.manPosition[1]] -= 1
        this.mapArray[this.manPosition[0] - 1][this.manPosition[1]] += 10
        this.mapArray[this.manPosition[0] - 2][this.manPosition[1]] += 1
      }
      //  3.人的上边是空地或者是终点
      if (next.type === 'move') {
        //  人的位置减去10， 上边位置加上10
        this.mapArray[this.manPosition[0]][this.manPosition[1]] -= 10
        this.mapArray[this.manPosition[0] - 1][this.manPosition[1]] += 10
      }
      //  刷新页面
      this.$forceUpdate()
    },

    //  向左走
    toLeft(next, doubleNext) {
      console.log('点击了向左')
      //  1.人的左边是墙
      if (next.type === 'fix') {
        return
      }

      //  2.人的左边是箱子，箱子的左边是箱子或者是箱子&&终点或者是墙
      if (next.type === 'MF' && doubleNext) {
        if (doubleNext.type === 'MF' || doubleNext.type === 'fix') {
          return
        }
        //  开始移动
        //  人的位置减去10，左边的位置减去箱子加上人，左左边的位置加上箱子
        this.mapArray[this.manPosition[0]][this.manPosition[1]] -= 10
        this.mapArray[this.manPosition[0]][this.manPosition[1] - 1] -= 1
        this.mapArray[this.manPosition[0]][this.manPosition[1] - 1] += 10
        this.mapArray[this.manPosition[0]][this.manPosition[1] - 2] += 1
      }
      //  3.人的上边是空地或者是终点
      if (next.type === 'move') {
        //  人的位置减去10， 左边位置加上10
        this.mapArray[this.manPosition[0]][this.manPosition[1]] -= 10
        this.mapArray[this.manPosition[0]][this.manPosition[1] - 1] += 10
      }
      //  刷新页面
      this.$forceUpdate()
    },

    //  向右走
    toRight(next, doubleNext) {
      console.log('点击了向右')
      //  1.人的左边是墙
      if (next.type === 'fix') {
        return
      }

      //  2.人的右边是箱子，箱子的右边是箱子或者是箱子&&终点或者是墙
      if (next.type === 'MF' && doubleNext) {
        if (doubleNext.type === 'MF' || doubleNext.type === 'fix') {
          return
        }
        //  开始移动
        //  人的位置减去10，右边的位置减去箱子加上人，右右边的位置加上箱子
        this.mapArray[this.manPosition[0]][this.manPosition[1]] -= 10
        this.mapArray[this.manPosition[0]][this.manPosition[1] + 1] -= 1
        this.mapArray[this.manPosition[0]][this.manPosition[1] + 1] += 10
        this.mapArray[this.manPosition[0]][this.manPosition[1] + 2] += 1
      }
      //  3.人的上边是空地或者是终点
      if (next.type === 'move') {
        //  人的位置减去10， 右边位置加上10
        this.mapArray[this.manPosition[0]][this.manPosition[1]] -= 10
        this.mapArray[this.manPosition[0]][this.manPosition[1] + 1] += 10
      }
      //  刷新页面
      this.$forceUpdate()
    },

    //  叠加guize
    goodAdd(index, temp) {
      if (index === 6) {
        // 人移动的位置为人
        return 6
      }
    }
  }
}
</script>

<style>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  white-space: nowrap;
}
.map-image {
  width: 50px;
  height: 50px;
}
</style>
