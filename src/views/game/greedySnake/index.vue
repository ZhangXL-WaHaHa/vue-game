<template>
  <div class="container">
    <router-link to="playGreedySnake">
      <button>开始游戏</button>
    </router-link>
  </div>
</template>
<script>
export default {
  name: 'GreedySnake',
  data() {
    return {}
  }
}
</script>
<style>
.container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
