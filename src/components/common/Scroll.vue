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
/*
 * scroll 组件在很多的地方都用运用
 * 原理就是:
 * 采用定位 根据上下的位置定住,
 * 加上overflow的x,y属性进行移动
 * 隐藏滚动条
 * */
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
    /**
     * 离 上端的距离 传入父级进行监听
     * @param e
     */
    handleScroll(e) {
      const offsetY = e.target.scrollTop || window.pageYOffset || document.body.scrollTop
      this.$emit('onScroll', offsetY)
    },
    /**
     * 滚动到一个位置
     * @param x x轴的偏移量
     * @param y y轴的偏移量
     */
    scrollTo(x, y) {
      this.$refs.scrollWrapper.scrollTo(x, y)
    },
    /**
     * 刷新容器的高度
     */
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
  scrollbar-color: transparent transparent;
  scrollbar-track-color: transparent;
  -ms-scrollbar-track-color: transparent;
  -webkit-overflow-scrolling: touch; /* 当手指从触摸屏上移开，会保持一段时间的滚动 */
  &::-webkit-scrollbar {
    display: none;
  }
  &.no-scroll {
    overflow: hidden;
  }
}
</style>
