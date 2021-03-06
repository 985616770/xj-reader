const book = {
  state: {
    fileName: '', // 书籍路径
    menuVisible: false, // 菜单栏的显示隐藏
    settingVisible: -1, // 菜单栏的设置面板
    defaultFontSize: 16, // 默认字体大小
    defaultFontFamily: 'Default', // 默认字体主题
    fontFamilyVisible: false, // 是否显示字体设置
    defaultTheme: 'Default', // 默认主题
    bookAvailable: false, // 图书是否可用
    progress: 0, // 进度
    section: 0, // 章节
    isPaginating: true, // 是否分页
    currentBook: null, // 当前书籍
    navigation: null, // 导航
    cover: null, // 封面图片
    metadata: null, // 书籍信息
    paginate: '', // 页数
    pagelist: null, // 页数列表
    offsetY: 0, // 偏移量
    isBookmark: null // 是否为书签页
  },
  mutations: {
    SET_FILENAME: (state, fileName) => {
      state.fileName = fileName
    },
    SET_MENU_VISIBLE: (state, visible) => {
      state.menuVisible = visible
    },
    SET_SETTING_VISIBLE: (state, visible) => {
      state.settingVisible = visible
    },
    SET_DEFAULT_FONT_SIZE: (state, fontSize) => {
      state.defaultFontSize = fontSize
    },
    SET_DEFAULT_FONT_FAMILY: (state, font) => {
      state.defaultFontFamily = font
    },
    SET_FONT_FAMILY_VISIBLE: (state, visible) => {
      state.fontFamilyVisible = visible
    },
    SET_DEFAULT_THEME: (state, theme) => {
      state.defaultTheme = theme
    },
    SET_BOOK_AVAILABLE: (state, bookAvailable) => {
      state.bookAvailable = bookAvailable
    },
    SET_PROGRESS: (state, progress) => {
      state.progress = progress
    },
    SET_SECTION: (state, section) => {
      state.section = section
    },
    SET_IS_PAGINATING: (state, isPaginating) => {
      state.isPaginating = isPaginating
    },
    SET_CURRENT_BOOK: (state, currentBook) => {
      state.currentBook = currentBook
    },
    SET_NAVIGATION: (state, navigation) => {
      state.navigation = navigation
    },
    SET_COVER: (state, cover) => {
      state.cover = cover
    },
    SET_METADATA: (state, metadata) => {
      state.metadata = metadata
    },
    SET_PAGINATE: (state, paginate) => {
      state.paginate = paginate
    },
    SET_PAGELIST: (state, pagelist) => {
      state.pagelist = pagelist
    },
    SET_OFFSETY: (state, offsetY) => {
      state.offsetY = offsetY
    },
    SET_IS_BOOKMARK: (state, isBookmark) => {
      state.isBookmark = isBookmark
    }
  }
}

export default book
