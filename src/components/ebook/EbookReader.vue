<template lang="pug">
  .ebook-reader
    #read
</template>

<script>
import Epub from 'epubjs'
import { ebookMixin } from '@/utils/mixin'
import { getFontFamily, getFontSize, getTheme, saveFontFamily, saveFontSize, saveTheme } from '@/utils/localStorage'

global.ePub = Epub

export default {
  name: 'EbookReader',
  mixins: [ebookMixin],
  methods: {
    initEpub() {
      const url = `${process.env.VUE_APP_RES_URL}epub/${this.fileName}.epub`
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight
      })

      this.rendition.display().then(() => {
        this.initFont()
        this.initFontSize()
        this.initTheme()
        this.initGlobalStyle()
      })

      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()
          this.hideTitleAndMenu()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
          this.hideTitleAndMenu()
        } else {
          this.toggleTitleAndMenu()
          this.setSettingVisible(-1)
          this.setFontFamilyVisible(false)
        }
        // event.preventDefault()
        event.stopPropagation()
      })

      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/IndieFlower.css`)
        ]).then(() => {
          console.log('down...')
        })
      })
    },
    // 上一页
    prevPage() {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    // 下一页
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
      }
    },
    // 切换显示标题和菜单
    toggleTitleAndMenu() {
      this.setMenuVisible(!this.menuVisible)
    },
    // 出现标题菜单不允许翻页
    hideTitleAndMenu() {
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
    },
    // 初始化字体
    initFont() {
      const font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    // 初始化字号
    initFontSize() {
      const fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(`${fontSize}px`)
        this.setDefaultFontSize(fontSize)
      }
    },
    // 初始化主题
    initTheme() {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        this.setDefaultTheme(defaultTheme)
        saveTheme(this.fileName, defaultTheme)
      }
      this.setDefaultTheme(defaultTheme)
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style)
      })
      this.rendition.themes.select(defaultTheme)
    }
  },
  mounted() {
    this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() => {
      this.initEpub()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
</style>
