<template lang="pug">
  .shelf-item(
    :class="{'shelf-item-shadow': data.type !== 3}"
    @click="onItemClick"
  )
    component.shelf-item-comp(
      :is="item"
      :data="data"
      :class="{'is-edit':isEditMode && data.type ===2}"
    )
    span.icon-selected(
      :class="{'is-selected': data.selected }"
      v-show="isEditMode && data.type === 1"
    )
</template>

<script>
import { storeShelfMixin } from '@/utils/mixin'
import ShelfItemBook from '@/components/shelf/ShelfItemBook'
import ShelfItemCategory from '@/components/shelf/ShelfItemCategory'
import ShelfItemAdd from '@/components/shelf/ShelfItemAdd'
import { gotoStoreHome } from '@/utils/store'

export default {
  name: 'ShelfItem',
  mixins: [storeShelfMixin],
  props: {
    data: Object
  },
  computed: {
    item() {
      return this.data.type === 1 ? this.book : this.data.type === 2 ? this.category : this.add
    }
  },
  data() {
    return {
      book: ShelfItemBook,
      category: ShelfItemCategory,
      add: ShelfItemAdd
    }
  },
  methods: {
    onItemClick() {
      if (this.isEditMode) {
        this.data.selected = !this.data.selected
        if (this.data.selected) {
          this.shelfSelected.pushWithoutDuplicate(this.data)
        } else {
          this.setShelfSelected(this.shelfSelected.filter(item => item.id !== this.data.id))
        }
      } else {
        if (this.data.type === 1) {
          this.showBookDetail(this.data)
        } else if (this.data.type === 2) {
          this.$router.push({
            path: '/store/category',
            query: {
              title: this.data.title
            }
          })
        } else {
          gotoStoreHome(this)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';

.shelf-item {
  width: 100%;
  height: 100%;
  position: relative;

  &.shelf-item-shadow {
    box-shadow: px2rem(2) px2rem(2) px2rem(6) px2rem(2) rgba(200, 200, 200, 0.3);
  }

  .shelf-item-comp {
    opacity: 1;

    &.is-edit {
      opacity: 0.5;
    }
  }

  .icon-selected {
    position: absolute;
    bottom: px2rem(2);
    right: px2rem(2);
    font-size: px2rem(18);
    color: rgba(0, 0, 0, 0.4);
    &.is-selected {
      color: $color-blue;
    }
  }
}
</style>
