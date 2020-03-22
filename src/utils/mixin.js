import { mapActions, mapGetters } from 'vuex'
import { addCss, removeAllCss, themeList } from '@/utils/book'
import { saveLocation } from '@/utils/localStorage'

export const ebookMixin = {
  computed: {
    ...mapGetters([
      'fileName',
      'menuVisible',
      'settingVisible',
      'defaultFontSize',
      'defaultFontFamily',
      'fontFamilyVisible',
      'defaultTheme',
      'bookAvailable',
      'progress',
      'section',
      'isPaginating',
      'currentBook',
      'navigation',
      'cover',
      'metadata',
      'paginate',
      'pagelist',
      'offsetY',
      'isBookmark'
    ]),
    themeList() {
      return themeList(this)
    }
  },
  methods: {
    ...mapActions([
      'setFileName',
      'setMenuVisible',
      'setSettingVisible',
      'setDefaultFontSize',
      'setDefaultFontFamily',
      'setFontFamilyVisible',
      'setDefaultTheme',
      'setBookAvailable',
      'setProgress',
      'setSection',
      'setIsPaginating',
      'setCurrentBook',
      'setNavigation',
      'setCover',
      'setMetadata',
      'setPaginate',
      'setPagelist',
      'setOffsetY',
      'setIsBookmark'
    ]),
    //  初始化全局样式
    initGlobalStyle() {
      removeAllCss()
      switch (this.defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_URL}theme/theme_default.css`)
          break
        case 'Gold':
          addCss(`${process.env.VUE_APP_RES_URL}theme/theme_gold.css`)
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_URL}theme/theme_eye.css`)
          break
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_URL}theme/theme_night.css`)
          break
        default:
          addCss(`${process.env.VUE_APP_RES_URL}theme/theme_default.css`)
          break
      }
    },
    // 变换百分比,保存进度
    refreshLocation() {
      const currentLocation = this.currentBook.rendition.currentLocation()
      const startCfi = currentLocation.start.cfi
      const progress = this.currentBook.locations.percentageFromCfi(startCfi)
      this.setProgress(Math.floor(progress * 100))
      this.setSection(currentLocation.start.index)
      saveLocation(this.fileName, startCfi)
    },
    // 读取存储的cfi,跳转页数(无则直接跳转)
    display(target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      } else {
        this.currentBook.rendition.display().then(() => {
          this.refreshLocation()
          if (cb) cb()
        })
      }
    }
  }
}
