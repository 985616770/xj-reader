// function mock(app, url, data) {
//   app.get(url, (req, res) => {
//     res.json(data)
//   })
// }
// const homeData = require('./src/mock/bookHome')
// const shelfData = require('./src/mock/bookShelf')
// const listData = require('./src/mock/bookList')
// const flatListData = require('./src/mock/bookFlatList')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    devtool: 'source-map',
    // performance: {
    //   hints: 'warning',
    //   maxAssetSize: 524288,
    //   maxEntrypointSize: 524288
    // }
    externals: {
      vue: 'Vue',
      vuex: 'Vuex',
      'vue-router': 'VueRouter',
      axios: 'axios',
      'vue-18n': 'VueI18n',
      'vue-lazy': 'VueLazyload',
      'web-storage-cache': 'WebStorageCache',
      epubjs: 'ePub',
      'vue-create-api': 'VueCreateAPI'
    }
  },
  devServer: {
    // before(app) {
    //   mock(app, '/book/home', homeData)
    //   mock(app, '/book/shelf', shelfData)
    //   mock(app, '/book/list', listData)
    //   mock(app, '/book/flat-list', flatListData)
    // }
  }
}
