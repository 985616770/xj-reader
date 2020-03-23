<template lang="pug">
  .ebook-bookmark(ref="ebookBookmark")
    .ebook-bookmark-text-wrapper
      .ebook-bookmark-down-wrapper
        span.icon-down(ref="iconDown")
      .ebook-bookmark-text {{ text }}
    .ebook-bookmark-icon-wrapper(:style="isFixed ? fixedStyle : {}")
      bookmark(:color="color" :width="15" :height="35" ref="bookmark")
</template>

<script>
import Bookmark from '@/components/common/Bookmark'
import { realPx } from '@/utils/utils'
import { ebookMixin } from '@/utils/mixin'
import { getBookmark, saveBookmark } from '@/utils/localStorage'

const BLUE = '#346CBC'
const WHITE = '#fff'

export default {
  name: 'EbookBookmark',
  mixins: [ebookMixin],
  components: { Bookmark },
  data() {
    return {
      text: '',
      color: WHITE,
      isFixed: false
    }
  },
  computed: {
    // 正常高度
    height() {
      return realPx(35)
    },
    // 临界值
    threshold() {
      return realPx(55)
    },
    fixedStyle() {
      return {
        position: 'fixed',
        top: 0,
        right: `${window.innerWidth - this.$refs.bookmark.clientWidth / 2}px`
      }
    }
  },
  watch: {
    // 控制书签的位置
    offsetY(v) {
      if (!this.bookAvailable || this.menuVisible || this.settingVisible >= 0) {
        return
      }
      if (v >= this.height && v <= this.threshold) {
        this.beforeThreshold(v)
      } else if (v >= this.threshold) {
        this.afterThreshold(v)
      } else if (v > 0 && v < this.height) {
        this.beforeHeight()
      } else if (v === 0) {
        this.restore()
      }
    },
    // 显示书签,根据localstorage的书签列表,进行展示
    isBookmark(isBookmark) {
      this.isFixed = isBookmark
      if (isBookmark) {
        this.color = BLUE
      } else {
        this.color = WHITE
      }
    }
  },
  methods: {
    // 状态1:初始 位置
    beforeHeight() {
      if (this.isBookmark) {
        this.text = this.$t('book.pulldownDeleteMark')
        this.color = BLUE
        this.isFixed = true
      } else {
        this.text = this.$t('book.pulldownAddMark')
        this.color = WHITE
        this.isFixed = false
      }
    },
    // 状态2: 未到达临界状态
    beforeThreshold(v) {
      this.$refs.ebookBookmark.style.top = `-${v}px`
      this.beforeHeight()
      const iconDown = this.$refs.iconDown
      if (iconDown.style.transform === 'rotate(180deg)') {
        iconDown.style.transform = 'rotate(0deg)'
      }
      this.isFixed = false
    },
    // 状态3: 超越临界状态
    afterThreshold(v) {
      this.$refs.ebookBookmark.style.top = `-${v}px`
      if (this.isBookmark) {
        this.text = this.$t('book.releaseDeleteMark')
        this.color = WHITE
        this.isFixed = false
      } else {
        this.text = this.$t('book.releaseAddMark')
        this.color = BLUE
        this.isFixed = true
      }
      const iconDown = this.$refs.iconDown
      if (iconDown.style.transform === '' || iconDown.style.transform === 'rotate(0deg)') {
        iconDown.style.transform = 'rotate(180deg)'
      }
    }, // 状态4:归位
    restore() {
      setTimeout(() => {
        this.$refs.ebookBookmark.style.top = `${-this.height}px`
        this.$refs.iconDown.style.transform = 'rotate(0deg)'
      }, 200)
      if (this.isFixed) {
        this.setIsBookmark(true)
        this.addBookmark()
      } else {
        this.setIsBookmark(false)
        this.removeBookmark()
      }
    },
    addBookmark() {
      this.bookmark = getBookmark(this.fileName)
      if (!this.bookmark) {
        this.bookmark = []
      }
      const currentLocation = this.currentBook.rendition.currentLocation()
      const cfiBase = currentLocation.start.cfi.replace(/!.*/, '')
      const cfiStart = currentLocation.start.cfi.replace(/.*!/, '').replace(/\)$/, '')
      const cfiEnd = currentLocation.end.cfi.replace(/.*!/, '').replace(/\)$/, '')
      // 关键点: 得到range 截取字段
      const cfiRange = `${cfiBase}!,${cfiStart},${cfiEnd})`
      this.currentBook.getRange(cfiRange).then(range => {
        const text = range.toString().replace(/\s\s/g, '')
        this.bookmark.push({
          cfi: currentLocation.start.cfi,
          text
        })
        saveBookmark(this.fileName, this.bookmark)
      })
    },
    removeBookmark() {
      const currentLocation = this.currentBook.rendition.currentLocation()
      const cfi = currentLocation.start.cfi
      this.bookmark = getBookmark(this.fileName)
      if (this.bookmark) {
        this.bookmark = this.bookmark.filter(item => item.cfi !== cfi)
        saveBookmark(this.fileName, this.bookmark)
        this.setIsBookmark(false)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.ebook-bookmark {
  position: absolute;
  top: px2rem(-35);
  left: 0;
  z-index: 200;
  width: 100%;
  height: px2rem(35);
  .ebook-bookmark-text-wrapper {
    position: absolute;
    right: px2rem(45);
    bottom: 0;
    display: flex;
    .ebook-bookmark-down-wrapper {
      font-size: px2rem(14);
      color: #ffffff;
      transition: all 0.2s linear;
      @include center;
      .icon-down {
        transition: all 0.2s linear;
      }
    }
    .ebook-bookmark-text {
      font-size: px2rem(14);
      color: #ffffff;
    }
  }
  .ebook-bookmark-icon-wrapper {
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: px2rem(15);
  }
}
</style>
