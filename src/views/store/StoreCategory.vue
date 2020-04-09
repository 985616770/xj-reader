<template lang="pug">
  .store-category
    shelf-title(
      :ifShowBack="true"
      :title="shelfCategory.title"
      )
    scroll.store-shelf-scroll-wrapper(
      :top="0"
      :bottom="scrollBottom"
      @onScroll="onScroll"
      ref="scroll"
      v-if="ifShowList"
    )
      shelf-list(
        :top="42"
        :data="shelfCategory.itemList"
        )
    .store-shelf-empty-view(v-else) {{ $t('shelf.groupNone') }}
    shelf-footer
</template>

<script>
import ShelfTitle from '@/components/shelf/ShelfTitle'
import { storeShelfMixin } from '@/utils/mixin'
import Scroll from '@/components/common/Scroll'
import ShelfList from '@/components/shelf/ShelfList'
import ShelfFooter from '@/components/shelf/ShelfFooter'

export default {
  name: 'StoreCategory',
  mixins: [storeShelfMixin],
  components: {
    ShelfFooter,
    ShelfList,
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
  computed: {
    ifShowList() {
      return this.shelfCategory.itemList && this.shelfCategory.itemList.length > 0
    }
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
    }
  },
  mounted() {
    console.log(this.shelfCategory)
    this.getCategoryList(this.$route.query.title)
    this.setCurrentType(2)
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.store-category {
  width: 100%;
  height: 100%;
  background: white;

  .store-shelf-scroll-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
  }
  .store-shelf-empty-view{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: px2rem(14);
    color: #666666;
    @include center;
  }
}
</style>
