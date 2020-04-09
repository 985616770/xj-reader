<template lang="pug">
  .shelf-list(
    :style="{top : shelfListTop }"
  )
    transition-group(
      name="list"
      tag="div"
      id="shelf-list"
    )
      .shelf-list-item-wrapper(
        v-for="item in data"
        :key="item.id"
      )
        shelf-item(
          :data="item"
          :style="{height: itemHeight}"
          )
        .shelf-list-title-wrapper
          span.shelf-list-title.title-small {{ item.title }}
</template>

<script>
import { storeShelfMixin } from '@/utils/mixin'
import ShelfItem from '@/components/shelf/ShelfItem'
import { px2rem, realPx } from '@/utils/utils'

export default {
  name: 'ShelfList',
  components: { ShelfItem },
  props: {
    top: {
      type: Number,
      default: 94
    },
    data: Array
  },
  mixins: [storeShelfMixin],
  computed: {
    itemHeight() {
      // w / 250 = h / 350
      // h = w  *  350 / 250
      return (((window.innerWidth - realPx(120)) / 3) * 350) / 250 + 'px'
    },
    shelfListTop() {
      return px2rem(this.top) + 'rem'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.shelf-list {
  position: absolute;
  left: 0;
  z-index: 100;
  width: 100%;
  #shelf-list {
    display: flex;
    flex-flow: row wrap;
    width: 100%;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .shelf-list-item-wrapper {
      box-sizing: border-box;
      padding: px2rem(15);
      flex: 0 0 33.3%;
      width: 33.3%;
      &.list-leave-active,
      &.list-enter-active {
        display: none;
      }
      &.list-move {
        transition: transform 0.5s;
      }
      .shelf-list-title-wrapper {
        margin-top: px2rem(10);
      }
    }
  }
}
</style>
