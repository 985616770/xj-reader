<template lang="pug">
  .home
    span.icon-book
    #read
</template>

<script>
import Epub from 'epubjs'

export default {
  name: 'Home',
  mounted() {
    this.book = new Epub('./Technology.epub')
    this.book
      .renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      .display()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';

.icon-book {
  color: #ff0000;
  font-size: px2rem(20);
}
</style>
