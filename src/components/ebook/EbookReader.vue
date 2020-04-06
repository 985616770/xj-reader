<template lang="pug">
  .ebook-reader
    #read
    .ebook-reader-mask(
      @click="onMaskClick"
      @touchmove="move"
      @touchend="moveEnd"
      @mousedown.left="onMouseEnter"
      @mousemove.left="onMouseMove"
      @mouseup.left="onMouseEnd"
    )
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
      if (this.mouseState && (this.mouseState === 2 || this.mouseState === 3)) return
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
    // 触摸移动
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
    // 触摸结束复位
    moveEnd(e) {
      this.setOffsetY(0)
      this.firstOffsetY = null
    },
    // 1.鼠标进入 2.鼠标进入后的移动 3.鼠标从移动状态松手 4.鼠标还原
    onMouseEnter(e) {
      this.mouseState = 1
      this.mouseStartTime = e.timeStamp
      e.preventDefault()
      e.stopPropagation()
    },
    onMouseMove(e) {
      if (this.mouseState === 1) {
        this.mouseState = 2
      } else if (this.mouseState === 2) {
        let offsetY = 0
        if (this.firstOffsetY) {
          offsetY = e.clientY - this.firstOffsetY
          this.setOffsetY(offsetY)
        } else {
          this.firstOffsetY = e.clientY
        }
      }
      e.preventDefault()
      e.stopPropagation()
    },
    onMouseEnd(e) {
      if (this.mouseState === 2) {
        this.setOffsetY(0)
        this.firstOffsetY = null
        this.mouseState = 3
      } else {
        this.mouseState = 4
      }
      const time = e.timeStamp - this.mouseStartTime
      if (time < 200) {
        this.mouseState = 4
      }
      e.preventDefault()
      e.stopPropagation()
    },
    // 初始化epubjs
    initEpub() {
      const url = `${process.env.VUE_APP_RES_URL}epub/${this.fileName}.epub`
      this.book = new Epub(url)
      this.setCurrentBook(this.book)

      this.initRendition()
      this.parseBook()
      this.book.ready
        .then(() => {
          return this.book.locations.generate((750 * (window.innerWidth / 375) * getFontSize(this.fileName)) / 16)
        })
        .then(locations => {
          // 每个章节含有的页数
          this.navigation.forEach(nav => {
            nav.pagelist = []
          })
          locations.forEach(item => {
            // 获取章节信息
            const loc = item.match(/\[(.*)\]!/)[1]
            // 获取navigation中的href 和 loc 的比较
            this.navigation.forEach(nav => {
              if (nav.href) {
                // xxx.html 取xxx
                const href = nav.href.match(/^(.*)\.x?html$/)[1]
                if (href === loc) {
                  nav.pagelist.push(item)
                }
              }
            })
            // 进行页数的统计,获取每一章节的起始页数
            let currentPage = 1
            this.navigation.forEach((nav, index) => {
              if (index === 0) {
                nav.page = 1
              } else {
                nav.page = currentPage
              }
              currentPage += nav.pagelist.length + 1
            })
          })
          this.setPagelist(locations)
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
    // 渲染页面
    initRendition() {
      this.rendition = this.book.renderTo('read', {
        width: global.innerWidth,
        height: global.innerHeight,
        method: 'default'
        // flow: 'scrolled'
      })
      const location = getLocation(this.fileName)

      this.display(location, () => {
        this.initFont()
        this.initFontSize()
        this.initTheme()
        this.initGlobalStyle()
        console.log('加载完成...')
      })

      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/IndieFlower.css`)
        ])
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
