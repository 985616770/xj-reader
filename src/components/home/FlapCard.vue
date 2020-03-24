<template lang="pug">
.flap-card-wrapper(v-show="flapCardVisible")
  .flap-card-bg
    .flap-card
      .flap-card-circle
        .flap-card-semi-cicle.flap-card-semi-cicle-left
        .flap-card-semi-cicle.flap-card-semi-cicle-right
  .close-btn-wrapper(@click="close")
    span.icon-close
</template>

<script>
import { storeHomeMixin } from '@/utils/mixin'

export default {
  name: 'FlapCard',
  mixins: [storeHomeMixin], 
  methods: {
    close() {
      this.setFlapCardVisible(false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.flap-card-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
  background: #0006;
  height: 100%;
  width: 100%;
  .close-btn-wrapper {
    position: absolute;
    left: 0;
    bottom: px2rem(30);
    z-index: 1111;
    width: 100%;
    @include center;
    .icon-close {
      width: px2rem(45);
      height: px2rem(45);
      font-size: px2rem(25);
      border-radius: 50%;
      background: #333;
      color: #fff;
      @include center;
    }
  }
}
</style>
