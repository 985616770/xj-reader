<template lang="pug">
  .home-title-wrapper
    .label {{ label }}
    .btn(@click="click") {{ btn }}
</template>

<script>
export default {
  name: 'TitleView',
  props: {
    label: String,
    btn: String
  },
  methods: {
    click() {
      this.$emit('onClick')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.home-title-wrapper {
  width: 100%;
  padding: px2rem(15) px2rem(10);
  box-sizing: border-box;
  @include top;
  .label {
    flex: 1;
    font-size: px2rem(18);
    color: #333;
    font-weight: bold;
  }
  .btn {
    font-size: px2rem(14);
    color: rgba(64, 158, 255, 1);
    &:active {
      color: rgba(64, 158, 255, .5);
    }
  }
}
</style>
