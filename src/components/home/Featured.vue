<template lang="pug">
  .featured
    title-view(
      :label="titleText"
      :btn="btnText"
      v-if="titleVisible && data && data.length > 0"
    )
    .featured-list
      .featured-item-wrapper
        .featured-item(
          v-for="(item, index) in data"
          :key="index"
          @click="showBookDetail(item)"
          )
          .img-wrapper
            img.img(v-lazy="item.cover")
          .content-wrapper
            .title.title-small(ref="title") {{ item.title }}
            .author.sub-title-tiny(ref="author") {{ item.author }}
            .category.third-title-tiny(ref="category") {{ categoryText(item.category) }}
</template>

<script>
import TitleView from '@/components/home/TitleView'
import { storeHomeMixin } from '@/utils/mixin'
import { realPx } from '@/utils/utils'
import { categoryText } from '@/utils/store'

export default {
  name: 'Featured',
  mixins: [storeHomeMixin],
  components: { TitleView },
  props: {
    data: Array,
    titleVisible: {
      type: Boolean,
      default: true
    },
    titleText: {
      type: String
    },
    btnText: {
      type: String
    }
  },
  computed: {
    width() {
      return window.innerWidth - realPx(20) - realPx(60) + 'px'
    }
  },
  methods: {
    categoryText(category) {
      return categoryText(category, this)
    },
    resize() {
      this.$nextTick(() => {
        this.$refs.title.forEach(item => {
          item.style.width = this.width
        })
        this.$refs.author.forEach(item => {
          item.style.width = this.width
        })
        this.$refs.category.forEach(item => {
          item.style.width = this.width
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';

.featured {
  .featured-list {
    width: 100%;
    padding: 0 px2rem(10);
    box-sizing: border-box;
    .featured-item-wrapper {
      width: 100%;
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      align-items: flex-start;
      .featured-item {
        flex: 0 0 50%;
        width: 50%;
        padding: px2rem(5) 0;
        @include top;
        .img-wrapper {
          flex: 0 0 30%;
          width: 30%;
          .img {
            width: 100%;
            // width: px2rem(50);
            // height: px2rem(75);
          }
        }
        .content-wrapper {
          flex: 1;
          width: px2rem(117.5);
          padding: 0 px2rem(5);
          box-sizing: border-box;
          .author {
            margin-top: px2rem(15);
          }
          .category {
            margin-top: px2rem(5);
          }
        }
      }
    }
  }
}
</style>
