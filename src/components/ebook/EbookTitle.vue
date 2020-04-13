<template lang="pug">
transition(name="slide-down")
  .title-wrapper(v-show="menuVisible")
    .left
      span.icon-back(@click="back")
    .right
      .icon-wrapper(@click="toShelf")
        span.icon-shelf
</template>

<script>
import { ebookMixin } from '@/utils/mixin'

export default {
  name: 'EbookTitle',
  mixins: [ebookMixin],
  methods: {
    back() {
      this.$router.go(-1)
    },
    toShelf() {
      this.$router.push({
        path: '/store/shelf'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.title-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 151;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background: white;
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  font-size: px2rem(20);
  .left {
    flex: 0 0 px2rem(60);
    @include center;
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 px2rem(40);
      @include center;
      .icon-cart {
        font-size: px2rem(22);
      }
      .icon-shelf {
        font-size: px2rem(22);
      }
    }
  }
}
</style>
