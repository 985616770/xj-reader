<template lang="pug">
.ebook-slide-bookmark
  .slide-bookmark-title {{$t('book.bookmark')}} - {{bookmark ? bookmark.length : 0}}
  scroll.slide-bookmark-list(:top="48" :bottom="48")
    .slide-bookmark-item(v-for="(item, index) in bookmark" :key="index" @click="displayBookmark(item.cfi)")
      .slide-bookmark-item-icon
        span.icon-bookmark
      .slide-bookmark-item-text {{item.text}}
</template>

<script>
import Scroll from '@/components/common/Scroll'
import { ebookMixin } from '@/utils/mixin'
import { getBookmark } from '@/utils/localStorage'

export default {
  name: 'EbookSlideBookmark',
  mixins: [ebookMixin],
  components: { Scroll },
  data() {
    return {
      bookmark: null
    }
  },
  methods: {
    displayBookmark(target) {
      this.display(target, () => {
        this.hideTitleAndMenu()
      })
    }
  },
  mounted() {
    this.bookmark = getBookmark(this.fileName)
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.ebook-slide-bookmark {
  width: 100%;
  .slide-bookmark-title {
    width: 100%;
    height: px2rem(48);
    font-size: px2rem(14);
    font-weight: bold;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    @include left;
  }
  .slide-bookmark-list {
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-bookmark-item {
      display: flex;
      padding: px2rem(15) 0;
      box-sizing: border-box;
      .slide-bookmark-item-icon {
        flex: 0 0 px2rem(29);
        @include left;
        .icon-bookmark {
          width: px2rem(20);
          height: px2rem(20);
          font-size: px2rem(12);
          border-radius: 50%;
          background: #bbb;
          @include center;
        }
      }
      .slide-bookmark-item-text {
        font-size: px2rem(14);
        line-height: px2rem(15);
        max-height: px2rem(45);
        @include ellipsis2(3);
      }
    }
  }
}
</style>
