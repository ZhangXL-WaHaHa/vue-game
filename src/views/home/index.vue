<template>
  <div class="app-container">
    <div class="game-container">
      <el-carousel
        :interval="4000"
        type="card"
        height="200px"
        indicator-position="none"
        :initial-index="selectIndex"
        @change="changeIndex"
      >
        <el-carousel-item v-for="(item, index) in gameList" :key="index">
          <div class="game-box" @click="playGame(index, item.link)">
            <el-image :src="item.cover" fit="fill" class="game-bg" :title="item.name" />
            <div class="name">{{ item.name }}</div>
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--    <router-link to="/sokobanIndex">-->
    <!--      <button class="btn">开始游戏 &#45;&#45; > 推箱子</button>-->
    <!--    </router-link>-->
    <!--    <router-link to="/greedySnake">-->
    <!--      <button class="btn mt-10">开始游戏 &#45;&#45; > 贪吃蛇</button>-->
    <!--    </router-link>-->
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Home',
  computed: {
    ...mapState('game', ['gameList'])
  },
  data() {
    return {
      selectIndex: 0 // 当前激活的图片
    }
  },
  methods: {
    // 切换幻灯片
    changeIndex(e) {
      this.selectIndex = e
    },

    //  点击跳转到对应的游戏中
    playGame(index, link) {
      if (this.selectIndex !== index) {
        return
      }
      this.$router.push({
        path: link
      })
    }
  }
}
</script>

<style lang="scss">
.app-container {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.game-container {
  width: 600px;
}
.btn {
}
.mt-10 {
  margin-top: 10px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.game-box {
  .game-bg {
    width: 100%;
    height: 100%;
  }
  .name {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -25px;
    display: flex;
    align-items: center;
    justify-content: center;

    height: 50px;
    background-color: rgba(0, 0, 0, 0.3);
    text-align: center;
    vertical-align: middle;
    color: white;
    font-size: 30px;
    font-style: italic;
    z-index: 10;
  }
}
</style>
