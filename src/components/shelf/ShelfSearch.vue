<template lang="pug">
  .shelf-search-wrapper(
    :class="{'search-top': ifInputClicked,'hide-shadow':ifHideShadow}"
    )
    .shelf-search(:class="{'search-top': ifInputClicked}")
      .search-wrapper
        .icon-search-wrapper
          span.icon-search
        .search-input-wrapper
          input.search-input(
            type="text"
            :placeholder="$t('shelf.search')"
            @click="onSearchClick"
            v-model="searchText"
            )
        .search-clear-wrapper(
          v-show="searchText.length > 0"
          @click="clearSearchText "
          )
          span.icon-close-circle-fill
      .icon-locale-wrapper(
        @click="switchLocale"
        v-show="!this.ifInputClicked"
        )
        span.icon-cn.icon(v-if=" lang === 'cn'")
        span.icon-en.icon(v-else)
      .cancel-btn-wrapper(
        v-show="ifInputClicked"
        @click="onCancelClick"
        )
        .cancel-text {{$t('shelf.cancel')}}
    transition(name="hot-search-move")
      .shelf-search-tab-wrapper(v-if="ifInputClicked")
        .shelf-search-tab-item(
          v-for="item in tabs"
          :key="item.id"
          @click="onTabClick(item.id)"
        )
          span.shelf-search-tab-text(
          :class="{'is-selected': item.id === selectedTab }"
          ) {{ item.text }}
</template>

<script>
import { setLocalStorage } from '@/utils/localStorage'
import { storeShelfMixin } from '@/utils/mixin'

export default {
  name: 'ShelfSearch',
  mixins: [storeShelfMixin],
  data() {
    return {
      ifInputClicked: false,
      searchText: '',
      selectedTab: 1,
      ifHideShadow: true
    }
  },
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0 && this.ifInputClicked) {
        this.ifHideShadow = false
      } else {
        this.ifHideShadow = true
      }
    }
  },
  computed: {
    lang() {
      return this.$i18n.locale
    },
    tabs() {
      return [
        {
          id: 1,
          text: this.$t('shelf.default')
        },
        {
          id: 2,
          text: this.$t('shelf.progress')
        },
        {
          id: 3,
          text: this.$t('shelf.purchase')
        }
      ]
    }
  },
  methods: {
    onSearchClick() {
      this.ifInputClicked = true
      this.setShelfTitleVisible(false)
    },
    onCancelClick() {
      this.ifInputClicked = false
      this.setShelfTitleVisible(true)
    },
    switchLocale() {
      if (this.lang === 'en') {
        this.$i18n.locale = 'cn'
      } else {
        this.$i18n.locale = 'en'
      }
      setLocalStorage('locale', this.$i18n.locale)
    },
    clearSearchText() {
      this.searchText = ''
    },
    onTabClick(id) {
      this.selectedTab = id
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.shelf-search-wrapper {
  position: relative;
  z-index: 105;
  width: 100%;
  height: px2rem(94);
  font-size: px2rem(16);
  background: #fff;
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, 0.1);
  &.search-top {
    position: fixed;
    top: 0;
    left: 0;
  }
  &.hide-shadow {
    box-shadow: none;
  }
  .shelf-search {
    position: absolute;
    top: px2rem(42);
    left: 0;
    height: px2rem(52);
    width: 100%;
    display: flex;
    transition: top $animationTime $animationType;
    &.search-top {
      top: 0;
    }
    .search-wrapper {
      flex: 1;
      display: flex;
      margin: px2rem(8) 0 px2rem(8) px2rem(10);
      border: px2rem(1) solid #ccc;
      border-radius: px2rem(3);
      box-sizing: border-box;
      .icon-search-wrapper {
        flex: 0 0 px2rem(22);
        width: px2rem(22);
        @include right;
        span.icon-search {
          font-size: px2rem(12);
        }
      }
      .search-input-wrapper {
        flex: 1;
        padding: 0 px2rem(10);
        box-sizing: border-box;
        @include center;
        .search-input {
          width: 100%;
          font-size: px2rem(14);
          border: none;
          color: #333;
          &:focus {
            outline: none;
          }
          &::-webkit-input-placeholder {
            font-size: px2rem(14);
            color: #ccc;
          }
        }
      }
      .search-clear-wrapper {
        flex: 0 0 px2rem(24);
        width: px2rem(24);
        @include left;
        .icon-close-circle-fill {
          font-size: px2rem(14);
          color: #cccccc;
        }
      }
    }
    .icon-locale-wrapper {
      flex: 0 0 px2rem(55);
      @include center;
      .icon {
        font-size: px2rem(22);
        color: #666;
      }
    }
    .cancel-btn-wrapper {
      flex: 0 0 px2rem(55);
      @include center;
      .cancel-text {
        font-size: px2rem(14);
        color: $color-blue;
      }
    }
  }
  .shelf-search-tab-wrapper {
    position: absolute;
    top: px2rem(52);
    left: 0;
    z-index: 105;
    display: flex;
    width: 100%;
    height: px2rem(42);
    .shelf-search-tab-item {
      flex: 1;
      @include center;
      .shelf-search-tab-text {
        font-size: px2rem(14);
        color: #999999;
        &.is-selected {
          color: $color-blue;
        }
      }
    }
  }
}
</style>
