<template>
  <div class="container">
    <!-- 地图  -->
    <div class="wall-container" :style="{ width: mapSize.x + 'px', height: mapSize.y + 'px' }">
      <!--      食物-->
      <div
        class="food-box"
        :style="{ left: food.x * 5 + 'px', top: food.y * 5 + 'px' }"
        v-if="food.x !== -1 && food.y !== -1"
      ></div>
      <!--      蛇身-->
      <div
        v-for="(item, index) in snakeBody"
        :key="index"
        :class="['snake-body-box']"
        :style="{ left: item.x * 5 + 'px', top: item.y * 5 + 'px' }"
      ></div>
      <!--      蛇头-->
      <div
        :class="['snake-body-box', 'snake-body-contrary-radius-' + snakeHead.direction]"
        :style="{ left: snakeHead.x * 5 + 'px', top: snakeHead.y * 5 + 'px' }"
      ></div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'PlayGreedySnake',
  data() {
    return {
      timer: null, // 定时器
      hasFood: true // 设置监听食物消失，调用食 物生成函数
    }
  },
  computed: {
    ...mapState('greedySnake', ['mapSize', 'food', 'snakeHead', 'snakeBody']),
    // food: {
    //   get() {
    //     reutrn this.$store.greedySnake.state.food
    //   }
    //   set(val) {
    //     return val
    //   }
    // }
  },
  created() {
    // 获取所有的点的坐标
    this.getCoordinateList()

    //  开始游戏
    this.initGame()

    //  监听蛇的移动方向的改变
    document.addEventListener('keydown', this.changeMoveDirection)
  },

  watch: {
    hasFood: function(val) {
      //  设置约3秒后生成一个新的食物
      setTimeout(() => {
        this.createFood()
      }, 3000)
    }

    //  监听蛇身的变化，设置蛇尾的弯曲方向
    //   snakeBopdy: {
    //     immediate: true,
    //     deep: true,
    //     handler(val) {
    //       if()
    //     }
    //   }
  },

  methods: {
    // 初始化游戏
    initGame() {
      // 根据蛇得运动轨迹进行相关得计算
      this.timer = setInterval(() => {
        // 蛇移动
        this.snakeMove(this.snakeHead.direction)
      }, 100)
    },

    // 获取所有可生成食物的点的坐标
    getCoordinateList() {
      const foodCoordinate = []
      for (let i = 0; i <= this.mapSize.x / 5; i++) {
        for (let j = 0; j <= this.mapSize.y / 5; j++) {
          if (i === this.snakeHead.x && j === this.snakeHead.y) {
            return
          }
          foodCoordinate.push({
            x: i,
            y: j
          })
        }
      }

      //  除去当前的食物的坐标点和蛇的坐标点
      for (let i = 0; i < foodCoordinate.length; i++) {
        for (let j = 0; j < this.snakeBody.length; j++) {
          if (this.snakeBody[j].x === foodCoordinate[i].x && this.snakeBody[j].y === foodCoordinate[i].y) {
            foodCoordinate.slice(i)
          }
        }
        // if(foodCoordinate[i].x === )
      }
    },

    //  设置定时器
    changeMoveDirection(e) {
      switch (e.keyCode) {
        case 38:
          if (this.snakeHead.direction === 'down') {
            return
          }
          this.snakeHead.direction = 'up'
          break
        case 40:
          if (this.snakeHead.direction === 'up') {
            return
          }
          this.snakeHead.direction = 'down'
          break
        case 37:
          if (this.snakeHead.direction === 'right') {
            return
          }
          this.snakeHead.direction = 'left'
          break
        case 39:
          if (this.snakeHead.direction === 'left') {
            return
          }
          this.snakeHead.direction = 'right'
      }
    },

    // 蛇移动
    snakeMove(direction) {
      // 蛇身移动,蛇身添加蛇头
      this.snakeBody.unshift({
        x: this.snakeHead.x,
        y: this.snakeHead.y
      })
      // 蛇头移动
      if (direction === 'down') {
        ++this.snakeHead.y
      } else if (direction === 'up') {
        --this.snakeHead.y
      } else if (direction === 'left') {
        --this.snakeHead.x
      } else if (direction === 'right') {
        ++this.snakeHead.x
      }

      // 判断是否撞墙
      if (
        this.snakeHead.x <= 0 ||
        this.snakeHead.x >= this.mapSize.x / 5 ||
        this.snakeHead.y <= 0 ||
        this.snakeHead.y >= this.mapSize.y / 5
      ) {
        this.snakeDead()
        return
      }

      // 判断蛇头是否吃到食物
      if (this.snakeHead.x === this.food.x && this.snakeHead.y === this.food.y) {
        // 吃到食物，食物变成蛇头，以前的蛇头变成蛇身
        this.snakeEat()
        // 重新生成食物
        this.createFood()
        return
      }

      //  正常移动
      this.snakeBody.pop()

      //  刷新页面
      this.$forceUpdate()
    },

    //  蛇吃到食物
     snakeEat() {
      //  计算分数，根据食物的不同计算
      //  暂时先不实现
      this.snakeBody.unshift({
        x: this.snakeHead.x,
        y: this.snakeHead.y
      })
      // this.  ('snakeHead', {
      //   ...this.snakeHeade,
      //   x: this.food.x,
      //   y: this.food.y
      // })
      this.createFood()
    },

    //  蛇死亡
    snakeDead() {
      // 清空计时器
      clearInterval(this.timer)
      //  撞墙了
      alert('您死了！！！！')
      //  点击确定，关闭浏览器
    },

    //  食物生成
    //  食物不用吃完就出现
    createFood() {
      //  判断蛇身的点和
    }
  }
}
</script>
<style>
.container {
}
/*墙*/
.wall-container {
  position: relative;
  border: solid 2px #999999;
}
/*食物*/
.food-box {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: #333333;
  position: absolute;
}
/*  蛇*/
.snake-body-box {
  position: absolute;
  background-color: #333333;
  width: 5px;
  height: 5px;
  border: solid 1px #333333;
  box-sizing: border-box;
}

/* 四种方向的蛇身尾部 */
.snake-body-radius-up {
  border-radius: 0 0 50% 50%;
}
.snake-body-radius-down {
  border-radius: 50% 50% 0 0;
}
.snake-body-radius-right {
  border-radius: 50% 0 0 50%;
}
.snake-body-radius-left {
  border-radius: 0 50% 50% 0;
}

/* 四种方向的蛇头*/
.snake-body-contrary-radius-down {
  border-radius: 0 0 50% 50%;
}
.snake-body-contrary-radius-up {
  border-radius: 50% 50% 0 0;
}
.snake-body-contrary-radius-left {
  border-radius: 50% 0 0 50%;
}
.snake-body-contrary-radius-right {
  border-radius: 0 50% 50% 0;
}
</style>
