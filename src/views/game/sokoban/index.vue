<template>
  <div class="container">
    <router-link to="/sokobanDIY">
      <button>自己设计</button>
    </router-link>
    <router-link to="/sokoban">
      <button style="margin-top: 20px">开始游戏</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'SokobanIndex',
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
  .container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  button {
    display: block;
  }
</style>
