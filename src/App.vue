<template lang="pug">
  #app
    transition(:name="transitionName")
      keep-alive
        router-view
</template>
<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        // 设置动画名称
        this.transitionName = 'slide-left'
      } else {
        this.transitionName = 'slide-right'
      }
    }
  }
}
/**
 * 添加rem的解析规则
 */
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = `${fontSize}px`
})
</script>

<style lang="scss">
@import '~@/assets/styles/global.scss';

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #666666;
}
</style>
