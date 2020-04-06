<template lang="pug">
  .store-home
    search-bar
    flap-card(:data="random")
    scroll(
      :top="scrollTop"
      @onScroll="onScroll"
      ref="scroll"
    )
      .banner-wrapper
        .banner-img(
          :style="{backgroundImage:`url(${ banner })`}"
        )
      guess-you-like(:data="guessYouLike")
      recommend.recommend(:data="recommend")
      featured.featured(
        :data="featured"
        :titleText="$t('home.featured')"
        :btnText="$t('home.seeAll')"
        )
      .category-list(
        v-for="(item, index) in categoryList"
        :key="index"
      )
        category-book(:data="item")
      category.categories(:data="categories")
</template>

<script>
import SearchBar from '@/components/home/SearchBar'
import Scroll from '@/components/common/Scroll'
import { storeHomeMixin } from '@/utils/mixin'
import FlapCard from '@/components/home/FlapCard'
import { home } from '@/api/store'
import GuessYouLike from '@/components/home/GuessYouLike'
import Recommend from '@/components/home/Recommend'
import Featured from '@/components/home/Featured'
import CategoryBook from '@/components/home/CategoryBook'
import Category from '@/components/home/Category'

export default {
  name: 'StoreHome',
  mixins: [storeHomeMixin],
  components: { Category, CategoryBook, Featured, Recommend, GuessYouLike, FlapCard, Scroll, SearchBar },
  data() {
    return {
      scrollTop: 94,
      random: null,
      banner: null,
      guessYouLike: null,
      recommend: null,
      featured: null,
      categoryList: null,
      categories: null
    }
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
      if (offsetY > 0) {
        this.scrollTop = 52
      } else {
        this.scrollTop = 94
      }
      this.$refs.scroll.refresh()
    }
  },
  mounted() {
    home().then(res => {
      if (res && res.status === 200) {
        const { data } = res
        const randomIndex = Math.floor(Math.random() * data.random.length)
        this.random = data.random[randomIndex]
        this.banner = data.banner
        this.guessYouLike = data.guessYouLike
        this.recommend = data.recommend
        this.featured = data.featured
        this.categoryList = data.categoryList
        this.categories = data.categories
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.store-home {
  width: 100%;
  height: 100%;
  .banner-wrapper {
    width: 100%;
    box-sizing: border-box;
    padding: px2rem(10);
    .banner-img {
      width: 100%;
      height: px2rem(150);
      background-size: 100% 100%;
      background-repeat: no-repeat;
    }
  }
  .recommend {
    margin-top: px2rem(20);
  }
  .featured {
    margin-top: px2rem(20);
  }
  .category-list {
    margin-top: px2rem(20);
  }
  .categories{
    margin-top: px2rem(20);
  }
}
</style>
