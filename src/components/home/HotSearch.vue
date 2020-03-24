<template lang="pug">
  .hot-search
    .hot-search-title
      .label {{label}}
      .btn {{btn}}
    .hot-search-list
      .hot-search-item(
        v-for="(item , index) in hotSearch"
        :key="index"
        )
        .icon-wrapper
          span.icon-book.icon(v-if="item.type === 1")
          span.icon-search.icon(v-if="item.type === 2")
        .hot-search-text-wrapper
          .text(ref="searchText") {{item.text}}
          .num(v-if="item.num") {{item.num}}人搜索
</template>

<script>
import { realPx } from '@/utils/utils'

export default {
  name: 'HotSearch',
  props: {
    label: String,
    btn: String,
    hotSearch: Array
  },
  mounted() {
    this.$refs.searchText.forEach(item => {
      item.style.width = window.innerWidth - realPx(20) - realPx(40) + 'px'
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.hot-search {
  .hot-search-title {
    display: flex;
    width: 100%;
    font-size: px2rem(13);
    padding: px2rem(10);
    box-sizing: border-box;
    .label {
      flex: 1;
      text-align: left;
      font-weight: bold;
      color: #666;
    }
    .btn {
      flex: 1;
      text-align: right;
      font-weight: bold;
      color: #409eff;
    }
  }
  .hot-search-list {
    width: 100%;
    padding: 0 px2rem(10);
    box-sizing: border-box;
    .hot-search-item {
      padding: px2rem(10) 0;
      display: flex;
      .icon-wrapper {
        flex: 0 0 px2rem(40);
        @include center;
        .icon-book {
          font-size: px2rem(16);
        }
        .icon-search {
          font-size: px2rem(16);
        }
      }
      .hot-search-text-wrapper {
        flex: 1;
        height: px2rem(35);
        @include columnLeft;
        .text {
          flex: 1;
          height: 100%;
          font-size: px2rem(14);
          font-weight: bold;
          color: #666;
          @include ellipsis;
          @include left;
        }
        .num {
          font-size: px2rem(12);
          color: #999;
          margin-top: px2rem(5);
        }
      }
    }
  }
}
</style>
