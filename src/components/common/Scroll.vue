<template lang="pug">
.scroll-wrapper(
  :class="{'no-scroll':ifNoScroll}"
  @scroll.passive="handleScroll"
  ref="scrollWrapper"
  )
  slot
</template>

<script>
import { realPx } from '@/utils/utils'

export default {
  name: 'Scroll',
  props: {
    top: {
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: 0
    },
    ifNoScroll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleScroll(e) {
      const offsetY = e.target.scrollTop || window.pageYOffset || document.body.scrollTop
      this.$emit('onScroll', offsetY)
    },
    scrollTo(x, y) {
      this.$refs.scrollWrapper.scrollTo(x, y)
    },
    refresh() {
      if (this.$refs.scrollWrapper) {
        this.$refs.scrollWrapper.style.height = window.innerHeight - realPx(this.top) - realPx(this.bottom) + 'px'
        this.$refs.scrollWrapper.addEventListener('scroll', this.handleScroll)
      }
    }
  },
  mounted() {
    this.refresh()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.scroll-wrapper {
  position: relative;
  z-index: 100;
  width: 100%;
  overflow-x: hidden;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch; /* 当手指从触摸屏上移开，会保持一段时间的滚动 */
  &::-webkit-scrollbar {
    display: none;
  }
  &.no-scroll {
    overflow: hidden;
  }
}
</style>
