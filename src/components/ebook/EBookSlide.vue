<template lang="pug">
transition(name="fade")
  .slide-content-wrapper(v-show="menuVisible && settingVisible === 3")
    transition(name="slide-right")
      .content(v-if="settingVisible === 3")
        .content-page-wrapper(v-if="bookAvailable")
          .content-page
            component(:is="currentTab === 1 ? content : bookmark")
          .content-page-tab
            .content-page-tab-item(:class="{'selected':currentTab === 1}" @click="selectTab(1)") {{$t('book.navigation')}}
            .content-page-tab-item(:class="{'selected':currentTab === 2}" @click="selectTab(2)") {{$t('book.bookmark')}}
        .content-empty(v-else)
          ebook-loading
    .content-bg(@click="hideTitleAndMenu()")
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import EbookLoading from '@/components/ebook/EbookLoading'

export default {
  name: 'EBookSlide',
  components: { EbookLoading },
  mixins: [ebookMixin],
  data() {
    return {
      currentTab: 1,
      content: () => import('./EbookSlideContents'),
      bookmark: () => import('./EbookSlideBookmark')
    }
  },
  methods: {
    selectTab(int) {
      this.currentTab = int
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.slide-content-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 300;
  display: flex;
  .content {
    flex: 0 0 85%;
    width: 85%;
    height: 100%;
    .content-page-wrapper {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 100%;

      .content-page {
        flex: 1;
        width: 100%;
        overflow: hidden;
      }
      .content-page-tab {
        flex: 0 0 px2rem(48);
        width: 100%;
        height: px2rem(48);
        display: flex;
        .content-page-tab-item {
          flex: 1;
          font-size: px2rem(12);
          @include center;
        }
      }
    }
    .content-empty {
      width: 100%;
      height: 100%;
      @include center;
    }
  }
  .content-bg {
    flex: 0 0 15%;
    width: 15%;
  }
}
</style>
