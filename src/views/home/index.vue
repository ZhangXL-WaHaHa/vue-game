<template>
  <div class="app-container">
    <router-link to="/sokobanIndex">
      <button class="btn">开始游戏 -- > 推箱子</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style>
.app-container {
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn {
}
</style>
