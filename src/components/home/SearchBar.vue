<template lang="pug">
  div
    .search-bar(:class="{'hide-title': !titleVisible, 'hide-shadow':!shadowVisible}")
      transition(name="title-move")
        .search-bar-title-wrapper(v-show="titleVisible")
          .title-icon-text-wrapper
            span.title-text.title {{$t('home.title')}}
          .title-icon-shake-wrapper(@click="showFlapCard")
            span.icon-shake.icon
      .title-icon-back-wrapper(
        :class="{'hide-title': !titleVisible}"
        @click="back"
        )
        span.icon-back.icon
      .search-bar-input-wrapper(:class="{'hide-title': !titleVisible}")
        .search-bar-blank(:class="{'hide-title': !titleVisible}")
        .search-bar-input
          span.icon-search.icon
          input.input(
            type="text"
            :placeholder="$t('home.hint')"
            v-model="searchText"
            @click="showHotSearch"
            @keyup.13.exact="search"
            )
    hot-search-list(v-show="hotSearchVisible" ref="hotSearch")
</template>

<script>
import { storeHomeMixin } from '@/utils/mixin'
import HotSearchList from '@/components/home/HotSearchList'

export default {
  name: 'SearchBar',
  components: { HotSearchList },
  mixins: [storeHomeMixin],
  data() {
    return {
      searchText: '',
      titleVisible: true,
      shadowVisible: false,
      hotSearchVisible: false
    }
  },
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
    },
    hotSearchOffsetY(offsetY) {
      if (offsetY > 0) {
        this.showShadow()
      } else {
        this.hideShadow()
      }
    }
  },
  methods: {
    showFlapCard() {
      this.setFlapCardVisible(true)
    },
    back() {
      if (this.offsetY > 0) {
        this.showShadow()
      } else {
        this.hideShadow()
      }
      if (this.hotSearchVisible) {
        this.hideHotSearch()
      } else {
        this.$router.push('/store/shelf')
      }
    },
    showHotSearch() {
      this.hideTitle()
      this.hideShadow()
      this.hotSearchVisible = true
      this.$nextTick(() => {
        this.$refs.hotSearch.reset()
      })
    },
    hideHotSearch() {
      this.hotSearchVisible = false
      if (this.offsetY > 0) {
        this.hideTitle()
        this.showShadow()
      } else {
        this.showTitle()
        this.hideShadow()
      }
    },
    hideTitle() {
      this.titleVisible = false
    },
    showTitle() {
      this.titleVisible = true
    },
    hideShadow() {
      this.shadowVisible = false
    },
    showShadow() {
      this.shadowVisible = true
    },
    search() {
      this.$router.push({
        path: '/store/list',
        query: {
          keyword: this.searchText
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.search-bar {
  position: relative;
  width: 100%;
  z-index: 150;
  height: px2rem(94);
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, 0.1);
  &.hide-title {
    height: px2rem(52);
  }
  &.hide-shadow {
    box-shadow: none;
  }
  .search-bar-title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(42);
    .title-icon-text-wrapper {
      width: 100%;
      height: px2rem(42);
      @include center;
    }
    .title-icon-shake-wrapper {
      position: absolute;
      right: px2rem(15);
      top: 0;
      height: px2rem(42);
      @include center;
    }
  }
  .title-icon-back-wrapper {
    position: absolute;
    left: px2rem(15);
    top: 0;
    height: px2rem(42);
    z-index: 200;
    @include center;
    transition: height $animationTime $animationType;
    &.hide-title {
      height: px2rem(52);
    }
  }
  .search-bar-input-wrapper {
    position: absolute;
    left: 0;
    top: px2rem(42);
    width: 100%;
    height: px2rem(52);
    padding: 0 px2rem(15);
    box-sizing: border-box;
    display: flex;
    @include center;
    transition: top $animationTime $animationType;
    &.hide-title {
      top: 0;
    }
    .search-bar-blank {
      flex: 0;
      width: 0;
      transition: all $animationTime $animationType;
      &.hide-title {
        flex: 0 0 px2rem(31);
        width: px2rem(31);
      }
    }
    .search-bar-input {
      flex: 1;
      border-radius: px2rem(20);
      width: 100%;
      background: #f4f4f4;
      box-sizing: border-box;
      padding: px2rem(5) px2rem(15);
      border: px2rem(1) solid #eee;
      @include left;
      .icon-search {
        color: #999999;
      }
      .input {
        width: 100%;
        height: px2rem(22);
        margin-left: px2rem(10);
        font-size: px2rem(12);
        color: #666666;
        background: transparent;
        border: 0;
        &:focus {
          outline: none;
        }
        &::-webkit-input-placeholder {
          color: #ccc;
        }
      }
    }
  }
}
</style>
