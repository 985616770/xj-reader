<template lang="pug">
.ebook-slide-contents
  .slide-contents-search-wrapper
    .slide-contents-search-input-wrapper
      .slide-contents-search-icon
        .icon-search
      input.slide-contents-search-input(type="text"
        :placeholder="$t('book.searchHint')"
        @click="showSearchPage()"
        v-model="searchText"
        @keyup.enter.exact="search()"
        )
    .slide-contents-search-cancel(v-if="searchVisible" @click="hideSearchPage()") {{$t('book.cancel')}}
  .slide-contents-book-wrapper(v-show="!searchVisible")
    .slide-contents-book-img-wrapper
      img.slide-contents-book-img(:src="cover")
    .slide-contents-book-info-wrapper
      .slide-contents-book-title {{metadata.title}}
      .slide-contents-book-author {{metadata.creator}}
    .slide-contents-book-progress-wrapper
      .slide-contents-book-progress
        span.progress {{`${progress}%`}}
        span.progress-text {{$t('book.haveRead2')}}
      .slide-contents-book-time {{ getReadTimeText() }}
  scroll.slide-contents-list(:top="156" :bottom="48" ref="scroll" v-show="!searchVisible")
    .slide-contents-item(v-for="(item, index) in navigation" :key="index")
      span.slide-contents-item-label(
        :style="contentItemStyle(item)"
        :class="{'selected': section === index}"
        @click="displayContent(item.href)"
        ) {{item.label}}
      span.slide-contents-item-page
  scroll.slide-search-list(:top="66" :bottom="48" v-show="searchVisible")
    .slide-search-item(v-for="(item, index) in searchList"
      :key="index"
      v-html="item.excerpt"
      @click="displayContent(item.cfi,true)"
      )
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import Scroll from '@/components/common/Scroll'
import { px2rem } from '@/utils/utils'

export default {
  name: 'EbookSlideContents',
  components: { Scroll },
  mixins: [ebookMixin],
  data() {
    return {
      searchVisible: false,
      searchList: null,
      searchText: ''
    }
  },
  methods: {
    displayContent(target, highlight = false) {
      this.display(target, () => {
        this.hideTitleAndMenu()
        if (highlight) {
          this.currentBook.rendition.annotations.highlight(target)
        }
      })
    },

    hideSearchPage() {
      this.searchVisible = false
      this.searchList = null
      this.searchText = ''
    },
    showSearchPage() {
      this.searchVisible = true
    },
    // 解决多级目录缩进问题
    contentItemStyle(item) {
      return {
        marginLeft: `${px2rem(item.level * 15)}rem`
      }
    },
    doSearch(q) {
      return Promise.all(
        this.currentBook.spine.spineItems.map(item =>
          item
            .load(this.currentBook.load.bind(this.currentBook))
            .then(item.find.bind(item, q))
            .finally(item.unload.bind(item))
        )
      ).then(results => Promise.resolve([].concat.apply([], results)))
    },
    search() {
      if (this.searchText && this.searchText.length > 0) {
        this.doSearch(this.searchText).then(list => {
          this.searchList = list
          this.searchList.map(item => {
            item.excerpt = item.excerpt.replace(
              this.searchText,
              `<span class="content-search-text">${this.searchText}</span>`
            )
            return item.excerpt
          })
          console.log(list)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.ebook-slide-contents {
  width: 100%;
  font-size: 0;
  .slide-contents-search-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(36);
    margin: px2rem(20) 0 px2rem(10) 0;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-contents-search-input-wrapper {
      flex: 1;
      @include center;
      .slide-contents-search-icon {
        flex: 0 0 px2rem(28);
        font-size: px2rem(12);
        @include center;
      }
      .slide-contents-search-input {
        flex: 1;
        width: 100%;
        height: px2rem(32);
        font-size: px2rem(14);
        background: transparent;
        border: none;
        &:focus {
          outline: none;
        }
      }
    }
    .slide-contents-search-cancel {
      flex: 0 0 px2rem(50);
      font-size: px2rem(14);
      @include right;
    }
  }
  .slide-contents-book-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(90);
    padding: px2rem(10) px2rem(15) px2rem(20);
    box-sizing: border-box;
    .slide-contents-book-img-wrapper {
      flex: 0 0 px2rem(45);
      .slide-contents-book-img {
        width: px2rem(45);
        height: px2rem(60);
      }
    }
    .slide-contents-book-info-wrapper {
      flex: 1;
      padding: 0 px2rem(10);
      box-sizing: border-box;
      .slide-contents-book-title {
        // 375*0.85 - 30 - 20 - 45- 70 = 153.75
        width: px2rem(153.75);
        font-size: px2rem(14);
        @include ellipsis;
      }
      .slide-contents-book-author {
        width: px2rem(153.75);
        font-size: px2rem(12);
        margin-top: px2rem(5);
        @include ellipsis2(2);
      }
    }
    .slide-contents-book-progress-wrapper {
      flex: 0 0 px2rem(70);
      font-size: 0;
      .slide-contents-book-progress {
        margin-top: px2rem(10);
        .progress {
          font-size: px2rem(14);
        }
        .progress-text {
          font-size: px2rem(12);
        }
      }
      .slide-contents-book-time {
        margin-top: px2rem(10);
        font-size: px2rem(12);
      }
    }
  }
  .slide-contents-list {
    padding: 0 px2rem(10);
    box-sizing: border-box;
    .slide-contents-item {
      display: flex;
      padding: px2rem(20) 0;
      box-sizing: border-box;
      .slide-contents-item-label {
        flex: 1;
        font-size: px2rem(14);
        line-height: px2rem(16);
        @include ellipsis;
      }
      .slide-contents-item-page {
      }
    }
  }
  .slide-search-list {
    width: 100%;
    padding: 0 px2rem(15);
    box-sizing: border-box;
    .slide-search-item {
      font-size: px2rem(14);
      line-height: px2rem(16);
      padding: px2rem(20) 0;
      box-sizing: border-box;
      @include ellipsis2(3);
    }
  }
}
</style>
