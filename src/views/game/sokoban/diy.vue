<template>
  <div class="container">
    <!--    按钮-->
    <button class="play-btn" @click="goPlay" v-if="mapArray.length !== 0">开始游戏</button>
    <div class="flex-container">
      <!--          diy界面展示部分 -->
      <div class="interface-show">
        <div>
          <div v-for="(item, index) in mapArray" :key="index" class="show-map-row">
            <div v-for="(array, temp) in item" :key="temp" class="show-map-box">
              <img :src="mapElementName[array].icon" class="show-map-image" v-if="array !== -1" />
              <div class="show-map-image" v-else></div>
            </div>
          </div>
        </div>
      </div>
      <!--    表格部分，提供用户自己输入完成地图设计-->
      <div class="user-diy">
        <!--      自己选择的地图大小-->
        <div class="map-size-box">
          <div class="select-map">请选择地图大小:</div>
          <el-select size="mini" v-model="value" placeholder="请选择">
            <el-option
              class="select-option"
              v-for="item in mapSize"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            >
            </el-option>
          </el-select>
        </div>
        <!--    地图选择-->
        <div class="map-element-item">
          <div v-for="(item, index) in mapArray" :key="index" class="row">
            <div
              v-for="(array, temp) in item"
              :key="temp"
              :class="[
                'image-box',
                index !== maxSize - 1 ? 'border-bottom-line' : '',
                temp !== maxSize - 1 ? 'border-right-line' : ''
              ]"
            >
              <!--            <img :src="mapElementName[array].icon" class="map-image" />-->
              <el-dropdown @command="selectMapElement">
                <img :src="mapElementName[array].icon" class="map-image" v-if="array !== -1" />
                <div class="map-image" v-else></div>
                <!--              <div class="map-image">哈</div>-->
                <el-dropdown-menu slot="dropdown">
                  <template v-for="arr in mapElementArray">
                    <!--                    边缘列只显示墙或者是墙外空地-->
                    <el-dropdown-item
                      class="dropdown-item-size"
                      :command="[arr.num, index, temp]"
                      v-if="
                        (((index === 0 || index === maxSize - 1 || temp === 0 || temp === maxSize - 1) &&
                          (arr.name === '墙' || arr.name === '墙外空地')) ||
                          !(index === 0 || index === maxSize - 1 || temp === 0 || temp === maxSize - 1)) &&
                          (!isSelectedMan || arr.name !== '人')
                      "
                      >{{ arr.name }}</el-dropdown-item
                    >
                  </template>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'SokobanDIY',
  data() {
    return {
      value: '', // 选择的地图大小的值
      maxSize: 0, // 地图大小
      mapArray: [], // 设置地图
      isSelectedMan: true // 是否已经选择了人
    }
  },
  computed: {
    ...mapGetters('sokoban', ['mapElementName', 'mapName', 'mapSize', 'mapElementArray', 'userMapArray']),
  },
  created() {
    const that = this
    this.mapArray = this.userMapArray

    //  拦截后退设置
    window.addEventListener(
      'popstate',
      function(e) {
        that.setMapArray([])
      },
      false
    )
  },
  watch: {
    value: function(newValue) {
      this.mapArray = []
      const max = newValue.split(' X ')[0]
      // 构成地图数组
      for (let i = 0; i < parseFloat(max); i++) {
        this.mapArray[i] = []
        for (let j = 0; j < parseFloat(max); j++) {
          this.mapArray[i][j] = 0
        }
      }
      this.maxSize = parseFloat(max)
      this.haveMan()
    }
  },
  methods: {
    ...mapActions('sokoban', ['setMapArray']),
    // 判断列表中是否有人
    haveMan() {
      console.log('输出列表', this.mapArray)
      this.mapArray.forEach(item => {
        item.forEach(array => {
          if (parseFloat(array) === 10) {
            this.isSelectedMan = true
            return
          }
        })
      })
      this.isSelectedMan = false
    },
    //  点击选择元素
    selectMapElement(value) {
      if (value[0] === 10) {
        this.isSelectedMan = true
      }
      this.mapArray[value[1]][value[2]] = value[0]
      this.$forceUpdate()
    },

    //  点击开始游戏
    goPlay() {
      let manFlag = false
      this.mapArray.forEach(item => {
        item.forEach(array => {
          if (parseFloat(array) === 10) {
            manFlag = true
            return
          }
        })
      })
      // 存储设定好的地图
      this.setMapArray(this.mapArray)
      //  简单判断游戏条件，人存不存在
      if (manFlag) {
        this.$router.push({
          path: '/sokoban'
        })
        return
      }
      //  弹出提示消息
      alert('你人没了！！！')
    }
  }
}
</script>
<style scoped>
.container {
  position: absolute;
  width: 100%;
  height: 100%;
}
.flex-container {
  display: flex;
  flex-direction: row;
  height: 100%;
}

/*  界面展示部分*/
.interface-show {
  width: 600px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
}

/*  用户自己输入面板 */
.user-diy {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/*  自己设计地图  */
.map-size-box {
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.select-map {
  font-size: 8px;
  color: #333333;
  margin-right: 5px;
}
.select-option {
  height: 20px;
  line-height: 20px;
  font-size: 9px;
}
.map-element-box {
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
.map-element-item {
  margin-top: 20px;
}
.map-image {
  width: 20px;
  height: 20px;
  background-color: white;
  color: black;
}
.row {
  display: flex;
  flex-direction: row;
}
.image-box {
  padding: 5px;
}
.dropdown-item-size {
  font-size: 8px;
  width: 60px;
  height: 15px;
  line-height: 15px;
}
.border-bottom-line {
  border-bottom: solid #999999 1px;
}
.border-right-line {
  border-right: solid #999999 1px;
}
.show-map-row {
  display: flex;
  flex-direction: row;
  height: 30px;
}
.show-map-box {
  height: 100%;
}
.show-map-image {
  width: 30px;
  height: 30px;
}

/*  开始游戏按钮  */
.play-btn {
  position: fixed;
  top: 20px;
  left: 300px;
}
</style>
