<template lang="pug">
  .store-shelf
    shelf-title(:title="this.$t('shelf.title')")
    scroll.store-shelf-scroll-wrapper(
      :top="0"
      :bottom="scrollBottom"
      @onScroll="onScroll"
      ref="scroll"
    )
      shelf-search
      shelf-list(
        :top="94"
        :data ="shelfList"
        )
    shelf-footer
</template>

<script>
import ShelfTitle from '@/components/shelf/ShelfTitle'
import { storeShelfMixin } from '@/utils/mixin'
import Scroll from '@/components/common/Scroll'
import ShelfSearch from '@/components/shelf/ShelfSearch'
import ShelfList from '@/components/shelf/ShelfList'
import ShelfFooter from '@/components/shelf/ShelfFooter'

export default {
  name: 'StoreShelf',
  mixins: [storeShelfMixin],
  components: {
    ShelfFooter,
    ShelfList,
    ShelfSearch,
    Scroll,
    ShelfTitle
  },
  data() {
    return {
      scrollBottom: 0
    }
  },
  watch: {
    isEditMode(isEditMode) {
      this.scrollBottom = isEditMode ? 48 : 0
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
    }
  },
  mounted() {
    this.getShelfList()
    this.setShelfCategory([])
    this.setCurrentType(1)
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';

.store-shelf {
  width: 100%;
  height: 100%;
  background: white;

  .store-shelf-scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
  }
}
</style>
