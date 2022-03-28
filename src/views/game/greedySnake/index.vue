<template>
  <div class="container">
    <router-link to="playGreedySnake">
      <button>准备开始游戏了吗</button>
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
