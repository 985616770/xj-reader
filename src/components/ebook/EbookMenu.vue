<template lang="pug">
.menu-bar
  transition(name="slide-up")
    .menu-wrapper(:class="{'hide-box-shadow':!menuVisible || settingVisible >= 0}" v-show="menuVisible")
      .icon-wrapper
        span.icon-menu(@click="showSetting(3)")
      .icon-wrapper
        span.icon-progress(@click="showSetting(2)")
      .icon-wrapper
        span.icon-bright(@click="showSetting(1)")
      .icon-wrapper
        span.icon-A(@click="showSetting(0)")
  ebook-setting-font
  ebook-setting-font-popup
  ebook-setting-theme
  ebook-setting-progress
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import EbookSettingFont from '@/components/ebook/EbookSettingFont'
import EbookSettingFontPopup from '@/components/ebook/EbookSettingFontPopup'
import EbookSettingTheme from '@/components/ebook/EbookSettingTheme'
import EbookSettingProgress from '@/components/ebook/EbookSettingProgress'

export default {
  name: 'EbookMenu',
  mixins: [ebookMixin],
  components: { EbookSettingProgress, EbookSettingTheme, EbookSettingFontPopup, EbookSettingFont },
  mounted() {
    console.log(this.settingVisible)
  },
  methods: {
    showSetting(key) {
      this.setSettingVisible(key)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.menu-bar {
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 102;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: white;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    font-size: px2rem(20);
    &.hide-box-shadow {
      box-shadow: none;
    }
    .icon-wrapper {
      flex: 1;
      @include center;
      .icon-progress {
        font-size: px2rem(24);
      }
      .icon-bright {
        font-size: px2rem(22);
      }
    }
  }

  .content-mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, 0.8);
  }
}
</style>
