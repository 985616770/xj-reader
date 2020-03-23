<template lang="pug">
  .ebook-reader
    #read
    .ebook-reader-mask(@click="onMaskClick"
    @touchmove="move"
    @touchend="moveEnd")
</template>

<script>
import Epub from 'epubjs'
import { ebookMixin } from '@/utils/mixin'
import {
  getFontFamily,
  getFontSize,
  getLocation,
  getTheme,
  saveFontFamily,
  saveFontSize,
  saveTheme
} from '@/utils/localStorage'
import { flatten } from '@/utils/book'

global.ePub = Epub

export default {
  name: 'EbookReader',
  mixins: [ebookMixin],
  methods: {
    // 蒙板点击事件
    onMaskClick(e) {
      const offsetX = e.offsetX
      const width = window.innerWidth
      if (offsetX > 0 && offsetX < width * 0.3) {
        this.prevPage()
      } else if (offsetX > 0 && offsetX > width * 0.7) {
        this.nextPage()
      } else {
        this.toggleTitleAndMenu()
      }
    },
    move(e) {
      let offsetY = 0
      if (this.firstOffsetY) {
        offsetY = e.changedTouches[0].clientY - this.firstOffsetY
        this.setOffsetY(offsetY)
      } else {
        this.firstOffsetY = e.changedTouches[0].clientY
      }
      e.preventDefault()
      e.stopPropagation()
    },
    moveEnd(e) {
      this.setOffsetY(0)
      this.firstOffsetY = null
    },
    initEpub() {
      const url = `${process.env.VUE_APP_RES_URL}epub/${this.fileName}.epub`
      this.book = new Epub(url)
      this.setCurrentBook(this.book)

      this.initRendition()
      // this.initGesture()
      this.parseBook()
      this.book.ready
        .then(() => {
          return this.book.locations.generate((750 * (window.innerWidth / 375) * getFontSize(this.fileName)) / 16)
        })
        .then(() => {
          this.setBookAvailable(true)
          this.refreshLocation()
        })
    },
    // 解析书籍获取封面信息
    parseBook() {
      // 获取封面
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url)
        })
      })
      // 获取书籍信息
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata)
      })
      // 获取目录的信息,并对其进行处理.(难点)
      this.book.loaded.navigation.then(nav => {
        const navItem = flatten(nav.toc)
        function find(item, level = 0) {
          return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
        }
        navItem.forEach(item => {
          item.level = find(item)
        })
        this.setNavigation(navItem)
      })
    },
    // 初始化手势
    // initGesture() {
    //   this.rendition.on('touchstart', event => {
    //     this.touchStartX = event.changedTouches[0].clientX
    //     this.touchStartTime = event.timeStamp
    //   })
    //   this.rendition.on('touchend', event => {
    //     const offsetX = event.changedTouches[0].clientX - this.touchStartX
    //     const time = event.timeStamp - this.touchStartTime
    //     if (time < 500 && offsetX > 40) {
    //       this.prevPage()
    //       this.hideTitleAndMenu()
    //     } else if (time < 500 && offsetX < -40) {
    //       this.nextPage()
    //       this.hideTitleAndMenu()
    //     } else {
    //       this.toggleTitleAndMenu()
    //       this.setSettingVisible(-1)
    //       this.setFontFamilyVisible(false)
    //     }
    //     // event.preventDefault()
    //     event.stopPropagation()
    //   })
    //   this.rendition.on('touchmove', event => {
    //     console.log(123)
    //   })
    // },
    // 渲染页面
    initRendition() {
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight
      })
      const location = getLocation(this.fileName)

      this.display(location, () => {
        this.initFont()
        this.initFontSize()
        this.initTheme()
        this.initGlobalStyle()
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
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    // 下一页
    nextPage() {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    // 切换显示标题和菜单
    toggleTitleAndMenu() {
      this.setMenuVisible(!this.menuVisible)
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
    // 根据动态路由获取书籍路径
    this.setFileName(this.$route.params.fileName.split('|').join('/')).then(() => {
      this.initEpub()
    })
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.ebook-reader {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .ebook-reader-mask {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 150;
    top: 0;
    left: 0;
    background: transparent;
  }
}
</style>
