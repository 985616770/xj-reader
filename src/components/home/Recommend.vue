<template lang="pug">
  .recommend
    title-view(:label="$t('home.recommend')"
    :btn="$t('home.seeAll')")
    .recommend-list
      .recommend-item(v-for="(item, index) in data"
      :key="index"
      @click="showBookDetail(item)"
      )
        .img-wrapper
          img.img(v-lazy="item.cover")
        .content-wrapper
          .title.title-medium(ref="title") {{ item.title }}
          .num.sub-title(ref="num") {{ $t('home.readers').replace('$1',item.readers) }}
</template>

<script>
import TitleView from '@/components/home/TitleView'
import { storeHomeMixin } from '@/utils/mixin'

export default {
  name: 'Recommend',
  mixins: [storeHomeMixin],
  components: { TitleView },
  props: {
    data: Array
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.recommend {
  .recommend-list {
    width: 100%;
    @include top;
    padding: 0 px2rem(5);
    box-sizing: border-box;
    .recommend-item {
      flex: 0 0 33.33%;
      width: 33.33%;
      padding: 0 px2rem(5);
      box-sizing: border-box;
      .img-wrapper {
        @include center;
        .img {
          width: 80%;
        }
      }
      .content-wrapper {
        width: 100%;
        margin-top: px2rem(10);
        @include columnCenter;
        .title {
          text-align: center;
        }
        .num {
          margin-top: px2rem(5);
        }
      }
    }
  }
}
</style>
