<template lang="pug">
  .shelf-item-add
    span.icon-add
</template>

<script>
export default {
  name: 'ShelfItemAdd'
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.shelf-item-add {
  width: 100%;
  height: 100%;
  border: px2rem(1) solid #ccc;
  box-sizing: border-box;
  @include center;
  span.icon-add {
    font-size: px2rem(40);
    color: #cccccc;
  }
}
</style>
