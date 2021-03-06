import { mapActions, mapGetters } from 'vuex'
import { addCss, removeAllCss, themeList } from '@/utils/book'
import { getBookmark, getBookShelf, getReadTime, saveBookShelf, saveLocation } from '@/utils/localStorage'
import { appendAddToShelf, computeId, gotoBookDetail, removeAddFromShelf } from '@/utils/store'
import { shelf } from '@/api/store'

// 首页的 mixin混入
export const storeHomeMixin = {
  computed: {
    ...mapGetters(['offsetY', 'hotSearchOffsetY', 'flapCardVisible'])
  },
  methods: {
    ...mapActions(['setOffsetY', 'setHotSearchOffsetY', 'setFlapCardVisible']),
    showBookDetail(book) {
      gotoBookDetail(this, book)
    }
  }
}
// 阅读器的混入
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
    // 主题列表
    themeList() {
      return themeList(this)
    },
    // 获取章节名称
    getSectionName() {
      return this.section ? this.navigation[this.section].label : ''
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
    //  初始化全局主题
    initGlobalStyle() {
      removeAllCss()
      switch (this.defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
        case 'Gold':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_gold.css`)
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_eye.css`)
          break
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_night.css`)
          break
        default:
          addCss(`${process.env.VUE_APP_RES_URL}/theme/theme_default.css`)
          break
      }
    },
    // 变换百分比,保存进度
    refreshLocation() {
      // 当前的位置
      const currentLocation = this.currentBook.rendition.currentLocation()
      if (currentLocation && currentLocation.start) {
        const startCfi = currentLocation.start.cfi
        const progress = this.currentBook.locations.percentageFromCfi(startCfi)
        this.setProgress(Math.floor(progress * 100))
        this.setSection(currentLocation.start.index)
        saveLocation(this.fileName, startCfi)
        const bookmark = getBookmark(this.fileName)
        // 添加书签
        if (bookmark) {
          // 判断书签是否添加的算法
          if (bookmark.some(item => item.cfi === startCfi)) {
            this.setIsBookmark(true)
          } else {
            this.setIsBookmark(false)
          }
        } else {
          this.setIsBookmark(false)
        }
        // 总页数(极其不准)
        if (this.pagelist) {
          const totalPage = this.pagelist.length
          const currentPage = currentLocation.start.location
          if (currentPage && currentPage > 0) {
            const percentNum = Math.floor((currentPage / totalPage) * 100)
            this.setPaginate(`${percentNum}%`)
          } else {
            this.setPaginate('')
          }
        } else {
          this.setPaginate('')
        }
      }
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
    },
    // 出现标题菜单不允许翻页
    hideTitleAndMenu() {
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
    },
    // 显示阅读时间
    getReadTimeText() {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      } else {
        readTime = Math.ceil(readTime / 60)
      }
      return this.$t('book.haveRead').replace('$1', readTime)
    }
  }
}

// 书架的mixin
export const storeShelfMixin = {
  computed: {
    ...mapGetters([
      'isEditMode',
      'shelfList',
      'shelfSelected',
      'shelfTitleVisible',
      'offsetY',
      'shelfCategory',
      'currentType'
    ])
  },
  methods: {
    ...mapActions([
      'setIsEditMode',
      'setShelfList',
      'setShelfSelected',
      'setShelfTitleVisible',
      'setOffsetY',
      'setShelfCategory',
      'setCurrentType'
    ]),
    // 跳到详情页
    showBookDetail(book) {
      gotoBookDetail(this, book)
    },
    // 获取书架信息
    getShelfList() {
      // 对书架的书籍进行缓存
      let shelfList = getBookShelf()
      if (!shelfList) {
        // 发送axios请求
        shelf().then(res => {
          if (res.status === 200 && res.data && res.data.bookList) {
            shelfList = appendAddToShelf(res.data.bookList)
            saveBookShelf(shelfList)
            this.setShelfList(shelfList)
          }
        })
      } else {
        return this.setShelfList(shelfList)
      }
    },
    // 获取分类页详情
    getCategoryList(title) {
      this.getShelfList().then(() => {
        const categoryList = this.shelfList.filter(book => {
          return book.type === 2 && book.title === title
        })[0]
        this.setShelfCategory(categoryList)
      })
    },
    // 移出分类
    moveOutOfGroup(cb) {
      // 解决分类的书籍的算法
      this.setShelfList(
        this.shelfList.map(book => {
          if (book.type === 2 && book.itemList) {
            book.itemList = book.itemList.filter(subBook => {
              return !subBook.selected
            })
          }
          return book
        })
      ).then(() => {
        // 移出的书添加到主页书架中
        const list = computeId(appendAddToShelf([].concat(removeAddFromShelf(this.shelfList), ...this.shelfSelected)))
        this.setShelfList(list).then(() => {
          this.simpleToast(this.$t('shelf.moveBookOutSuccess'))
          if (cb) cb()
        })
      })
    }
  }
}
