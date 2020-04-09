<template lang="pug">
  .popup(v-if="popupVisible")
    transition(name="fade")
      .popup-bg(@click.stop.prevent="hide" v-if="popupVisible")
    transition(name="popup-slide-up")
      .popup-wrapper(v-if="visible")
        .popup-title(v-if="title && title.length > 0") {{ title }}
        .popup-btn(
          :class="{'danger':item.type === 'danger'}"
          v-for="(item, index) in btn"
          :key="index"
          @click="item.click"
          ) {{ item.text }}
</template>

<script>
export default {
  name: 'Popup',
  props: {
    title: String,
    btn: Array
  },
  data() {
    return {
      popupVisible: false,
      visible: false
    }
  },
  methods: {
    show() {
      this.popupVisible = true
      setTimeout(() => {
        this.visible = true
      })
    },
    hide() {
      this.visible = false
      setTimeout(() => {
        this.popupVisible = false
      }, 200)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  .popup-bg {
    width: 100%;
    height: 100%;
  }
  .popup-wrapper {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 2000;
    width: 100%;
    background: #ffffff;
    .popup-title {
      width: 100%;
      height: px2rem(44);
      border-bottom: px2rem(1) solid #eee;
      font-size: px2rem(12);
      line-height: px2rem(14);
      padding: px2rem(15);
      box-sizing: border-box;
      @include center;
    }
    .popup-btn {
      width: 100%;
      height: px2rem(60);
      font-size: px2rem(16);
      font-weight: bold;
      border-bottom: px2rem(1) solid #eee;
      @include center;
      &.danger {
        color: $color-pink;
      }
    }
  }
}
</style>
