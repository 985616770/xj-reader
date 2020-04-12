<template lang="pug">
  .cover-title-wrapper
    .cover-title-left-wrapper
      img.cover-img(v-lazy="cover")
    .cover-title-right-wrapper
      .detail-cover-title-wrapper
        .cover-title-text {{ title }}
      .cover-author-wrapper
        .cover-author-text {{ author }}
      .detail-cover-description-wrapper
        .detail-cover-description-text {{ desc }}
</template>

<script>
export default {
  name: 'BookInfo',
  props: {
    cover: String,
    title: String,
    author: String,
    desc: String
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.cover-title-wrapper {
  display: flex;
  width: 100%;
  padding: px2rem(10) 0;
  border-bottom: px2rem(1) solid #eee;
  box-sizing: border-box;
  .cover-title-left-wrapper {
    flex: 0 0 px2rem(103);
    padding: px2rem(10) 0 px2rem(10) px2rem(15);
    box-sizing: border-box;
    @include top;
    .cover-img {
      width: px2rem(103);
      height: px2rem(146);
    }
  }
  .cover-title-right-wrapper {
    flex: 1;
    padding: px2rem(10) px2rem(15);
    box-sizing: border-box;
    .detail-cover-title-wrapper {
      .cover-title-text {
        font-size: px2rem(24);
        line-height: px2rem(26);
        font-weight: bold;
        color: #333;
      }
    }
    .cover-author-wrapper {
      margin-top: px2rem(10);
      .cover-author-text {
        font-size: px2rem(14);
        line-height: px2rem(16);
        color: $color-blue;
      }
    }
    .detail-cover-description-wrapper {
      margin-top: px2rem(10);
      .detail-cover-description-text {
        font-size: px2rem(14);
        line-height: px2rem(16);
        color: #666;
        @include ellipsis2(2);
      }
    }
  }
}
</style>
