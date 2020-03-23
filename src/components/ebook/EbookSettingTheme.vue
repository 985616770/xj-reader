<template lang="pug">
  transition(name="slide-up")
    .setting-wrapper(v-show="menuVisible && settingVisible === 1")
      .setting-theme
        .setting-theme-item(v-for="(item, index) in themeList" :key="index" @click="setTheme(index)")
          .preview(:style="{background:item.style.body.background}" :class="{'selected' : item.name === defaultTheme}")
          .text() {{ item.alias}}
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import { saveTheme } from '@/utils/localStorage'

export default {
  name: 'EbookSettingTheme',
  mixins: [ebookMixin],
  methods: {
    setTheme(index) {
      const theme = this.themeList[index]
      this.setDefaultTheme(theme.name).then(() => {
        this.currentBook.rendition.themes.select(this.defaultTheme)
        this.initGlobalStyle()
      })
      saveTheme(this.fileName, theme.name)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 151;
  width: 100%;
  height: px2rem(90);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  background: #ffffff;
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      box-sizing: border-box;
      .preview {
        flex: 1;
        /*border: px2rem(1) solid #ccc;*/
        box-sizing: border-box;
        border: none;
        &.selected {
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.1);
          border: px2rem(2) solid #5e6369;
        }
      }
      .text {
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        padding-top: px2rem(4);
        @include center;
      }
    }
  }
}
</style>
