<template lang="pug">
.flap-card-wrapper(v-show="flapCardVisible")
  .flap-card-bg
    .flap-card(v-for="(item, index) in flapCardList"
    :key="index"
    :style="{ zIndex:item.zIndex }"
    )
      .flap-card-circle
        .flap-card-semi-circle.flap-card-semi-circle-left(
          :style="semiCircleStyle(item,'left')"
        )
        .flap-card-semi-circle.flap-card-semi-circle-right(
          :style="semiCircleStyle(item,'right')"
        )
  .close-btn-wrapper(@click="close")
    span.icon-close
</template>

<script>
import { storeHomeMixin } from '@/utils/mixin'
import { flapCardList } from '@/utils/store'

export default {
  name: 'FlapCard',
  mixins: [storeHomeMixin],
  data() {
    return {
      flapCardList
    }
  },
  methods: {
    close() {
      this.setFlapCardVisible(false)
    },
    semiCircleStyle(item, dir) {
      return {
        backgroundColor: `rgb(${item.r}, ${item.g}, ${item.b})`,
        backgroundSize: item.backgroundSize,
        backgroundImage: dir === 'left' ? item.imgLeft : item.imgRight
      }
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
  @include center;
  .flap-card-bg {
    position: relative;
    width: px2rem(64);
    height: px2rem(64);
    border-radius: px2rem(5);
    background: white;
    .flap-card {
      width: px2rem(48);
      height: px2rem(48);
      @include absCenter;
      .flap-card-circle {
        display: flex;
        width: 100%;
        height: 100%;

        .flap-card-semi-circle {
          flex: 0 0 50%;
          width: 50%;
          height: 100%;
          background-repeat: no-repeat;
          &.flap-card-semi-circle-left {
            border-radius: px2rem(24) 0 0 px2rem(24);
            background-position: center right;
          }
          &.flap-card-semi-circle-right {
            border-radius: 0 px2rem(24) px2rem(24) 0;
            background-position: center left;
          }
        }
      }
    }
  }
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
