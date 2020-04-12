<template lang="pug">
  .shelf-item-category
    .shelf-item-category-list(v-if="data.itemList.length > 0")
      .shelf-item-category-item(
        v-for="(item, index) in data.itemList"
        :key="index"
      )
        img.shelf-item-category-img(v-lazy="item.cover")
    .shelf-item-category-bg(v-else)
      span.icon-book2
</template>

<script>
export default {
  name: 'ShelfItemCategory',
  props: {
    data: Object
  },
  mounted() {}
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.shelf-item-category {
  width: 100%;
  height: 100%;
  .shelf-item-category-list {
    display: flex;
    flex-flow: row wrap;
    align-content: flex-start;
    width: 100%;
    height: 100%;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: px2rem(5);
    .shelf-item-category-item {
      flex: 0 0 33.3%;
      width: 33.3%;
      height: 33.3%;
      box-sizing: border-box;
      &:nth-child(3n + 1) {
        padding: 0 px2rem(2.5) px2rem(5) px2rem(5);
      }
      &:nth-child(3n + 2) {
        padding: 0 px2rem(2.5) px2rem(5) px2rem(2.5);
      }
      &:nth-child(3n + 3) {
        padding: 0 px2rem(5) px2rem(5) px2rem(2.5);
      }
      .shelf-item-category-img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .shelf-item-category-bg{
    width: 100%;
    height: 100%;
    font-size: px2rem(30);
    color: #ccc;
    background: #ffffff;
    @include center;
  }
}
</style>
