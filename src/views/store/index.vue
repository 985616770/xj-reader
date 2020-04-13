<template lang="pug">
  .store
    transition(:name="transitionName")
      router-view
</template>

<script>
export default {
  name: 'Store',
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > from.meta.index) {
        // 设置动画名称
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.store {
  height: 100%;
  width: 100%;
  background: #fff;
}
</style>
