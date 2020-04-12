<template lang="pug">
  .shelf-item-book
    img.shelf-item-book-cover(v-lazy="data.cover")
    .private-wrapper(v-show="data.private")
    .private-icon-wrapper(v-show="data.private")
      span.icon-private
</template>

<script>
export default {
  name: 'ShelfItemBook',
  props: {
    data: Object
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.shelf-item-book {
  width: 100%;
  height: 100%;
  .shelf-item-book-cover {
    width: 100%;
    height: 100%;
  }
  .private-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 0;
    height: 0;
    border-width: px2rem(15);
    border-style: solid;
    border-color: transparent transparent rgba(0, 0, 0, 0.3) rgba(0, 0, 0, 0.3);
  }
  .private-icon-wrapper {
    position: absolute;
    left: 0;
    bottom: 0;
    width: px2rem(30);
    height: px2rem(30);
    padding-bottom: px2rem(5);
    padding-left: px2rem(3);
    @include leftBottom;
    .icon-private {
      font-size: px2rem(12);
      color: white;
    }
  }
}
</style>
