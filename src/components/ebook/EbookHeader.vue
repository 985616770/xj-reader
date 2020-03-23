<template lang="pug">
  .ebook-header
    span.ebook-header-text {{getSectionName}}
</template>

<script>
import { ebookMixin } from '@/utils/mixin'

export default {
  name: 'EbookHeader',
  mixins: [ebookMixin]
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';

.ebook-header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: px2rem(48);
  padding: 0 px2rem(15);
  box-sizing: border-box;
  overflow: hidden;
  @include left;
  .ebook-header-text {
    font-size: px2rem(12);
    color: #6d7178;
  }
}
</style>
