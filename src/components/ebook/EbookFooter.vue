<template lang="pug">
  .ebook-footer
    .ebook-footer-text {{ this.paginate }}
</template>

<script>
import { ebookMixin } from '@/utils/mixin'

export default {
  name: 'EbookFooter',
  mixins: [ebookMixin]
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.ebook-footer {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: px2rem(48);
  padding: 0 px2rem(15);
  box-sizing: border-box;
  @include right;
  .ebook-footer-text {
    font-size: px2rem(12);
    color: #6d7178;
  }
}
</style>
