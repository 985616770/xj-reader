<template lang="pug">
  .category-book
    title-view(
      :label="categoryText(data.category)"
      :btn="$t('home.seeAll')"
      @onClick="showBookCategory"
      )
    .category-book-list
      .category-book-item(
        v-for="(item, index) in data.list"
        :key="index"
        @click="showBookDetail(item)"
      )
        .img-wrapper
          img.img(:src="item.cover")
        .content-wrapper
          .title.title-small(ref="title") {{ item.title }}
          .author.sub-title-tiny(ref="author") {{ item.author }}
</template>

<script>
import TitleView from '@/components/home/TitleView'
import { categoryText, getCategoryName } from '@/utils/store'
import { storeHomeMixin } from '@/utils/mixin'

export default {
  name: 'CategoryBook',
  mixins: [storeHomeMixin],
  components: { TitleView },
  props: {
    data: Object
  },
  methods: {
    showBookCategory() {
      this.$router.push({
        path: '/store/list',
        query: {
          category: getCategoryName(this.data.category),
          categoryText: this.categoryText(this.data.category)
        }
      })
    },
    categoryText(category) {
      return categoryText(category, this)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.category-book {
  .category-book-list {
    width: 100%;
    @include top;
    padding: 0 px2rem(5);
    box-sizing: border-box;
    .category-book-item {
      flex: 0 0 25%;
      width: 25%;
      padding: 0 px2rem(5);
      box-sizing: border-box;
      .img-wrapper {
        @include center;
        .img {
          width: 100%;
        }
      }
      .content-wrapper {
        width: 100%;
        margin-top: px2rem(10);
        .num {
          margin-top: px2rem(5);
        }
      }
    }
  }
}
</style>
