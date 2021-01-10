<template>
  <div id="app" class="app" :style="{ backgroundColor: $route.path === '/' ? 'transparent' : 'white' }">
    <router-view />
    <!--    <vue-particles-->
    <!--      color="#dedede"-->
    <!--      :particleOpacity="0.7"-->
    <!--      :particlesNumber="80"-->
    <!--      shapeType="circle"-->
    <!--      :particleSize="4"-->
    <!--      linesColor="#dedede"-->
    <!--      :linesWidth="1"-->
    <!--      :lineLinked="true"-->
    <!--      :lineOpacity="0.4"-->
    <!--      :linesDistance="150"-->
    <!--      :moveSpeed="3"-->
    <!--      :hoverEffect="true"-->
    <!--      hoverMode="grab"-->
    <!--      :clickEffect="true"-->
    <!--      clickMode="push"-->
    <!--    >-->
    <!--    </vue-particles>-->
  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {},
  mounted() {
    console.log('app')
    if (this._isMobile()) {
      this.$router.replace('/web')
    } else {
      this.$router.replace('/')
    }
  },
  methods: {
    _isMobile() {
      const flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      )
      return flag
    }
  }
}
</script>
<style lang="scss">
.app {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
