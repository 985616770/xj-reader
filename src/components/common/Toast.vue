<template lang="pug">
  transition(name="fade")
    .toast-bg-wrapper(v-show="visible" @click.prevent)
      .toast-bg(v-if="visible")
        .toast-wrapper
          .toast(v-html="showText")
</template>

<script>
export default {
  name: 'Toast',
  props: {
    text: [String, Number],
    timeout: {
      type: Number,
      default: 1500
    }
  },
  data() {
    return {
      visible: false,
      showText: ''
    }
  },
  methods: {
    hide() {
      this.visible = false
    },
    show() {
      this.updateText(this.text)
      clearTimeout(this.task)
      this.task = null
      this.visible = true
      this.task = setTimeout(() => {
        this.visible = false
      }, this.timeout)
    },
    continueShow() {
      clearTimeout(this.task)
      this.task = null
      this.visible = true
    },
    updateText(text) {
      this.showText = text
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.toast-bg-wrapper {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2500;
  width: 100%;
  height: 100%;
  background: transparent;
  .toast-bg {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: 0 0 0 -50%;
    z-index: 2500;
    width: 100%;
    @include center;
    .toast-wrapper {
      width: 60%;
      line-height: px2rem(20);
      padding: px2rem(10) px2rem(20);
      box-sizing: border-box;
      background: #ccc;
      border-radius: px2rem(10);
      font-size: px2rem(14);
      color: white;
      .toast {
        text-align: center;
        word-break: break-all;
      }
    }
  }
}
</style>
