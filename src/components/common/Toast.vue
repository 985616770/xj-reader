<template lang="pug">
  transition(name="fade")
    .toast-bg(v-show="visible")
      .toast-wrapper
        .toast(v-html="text")
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
      visible: false
    }
  },
  methods: {
    hide() {
      this.visible = false
    },
    show() {
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
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
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
</style>
