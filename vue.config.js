// function mock(app, url, data) {
//   app.get(url, (req, res) => {
//     res.json(data)
//   })
// }
// const homeData = require('./src/mock/bookHome')
// const shelfData = require('./src/mock/bookShelf')
// const listData = require('./src/mock/bookList')
// const flatListData = require('./src/mock/bookFlatList')

const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProduction ? './' : '/',
  configureWebpack: config => {
    if (isProduction) {
      config.externals = {
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
      // 开启gzip压缩
      config.plugins.push(
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: /\.js$|\.html$|\.json$|\.css/,
          threshold: 10240,
          minRatio: 0.8
        })
      )
      // 开启分离js
      config.optimization = {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 20000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1]
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`
              }
            }
          }
        }
      }
    }
  },
  css: {},
  productionSourceMap: false
  // devServer: {
  //   // before(app) {
  //   //   mock(app, '/book/home', homeData)
  //   //   mock(app, '/book/shelf', shelfData)
  //   //   mock(app, '/book/list', listData)
  //   //   mock(app, '/book/flat-list', flatListData)
  //   // }
  // }
}
