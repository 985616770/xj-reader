import axios from 'axios'
import { setLocalForage } from '@/utils/localForage'
// 创建axios实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000
})

/*
 * 获取所有的书籍信息
 * return {Array}
 * */
export function flatList() {
  return instance({
    method: 'get',
    url: '/book/flat-list'
  })
}

/*
 * 首页的书籍信息
 * */
export function home() {
  return instance({
    method: 'get',
    url: '/book/home'
  })
}

/**
 * 单本书籍的信息
 * return {object}
 * */
export function detail(book) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
    params: {
      fileName: book.fileName
    }
  })
}

/*
 * 获取书籍的列表信息
 * */
export function list() {
  return instance({
    method: 'get',
    url: '/book/list'
  })
}

/*
 * 获取书架的信息
 * */
export function shelf() {
  return instance({
    method: 'get',
    url: '/book/shelf'
  })
}

/**
 * 下载书籍到本地indexDB数据库中
 * @param book 书籍
 * @param onSuccess 成功的回调
 * @param onError 失败的回调
 * @param onProgress axios返回的进度信息
 * @returns {Promise<AxiosResponse<T>>}
 */
export function download(book, onSuccess, onError, onProgress) {
  if (!onProgress) {
    onProgress = onError
    onError = null
  }
  return (
    axios
      .create({
        baseURL: process.env.VUE_APP_EPUB_URL,
        method: 'get',
        responseType: 'blob',
        timeout: 180 * 1000,
        // axios 提供的监控下载进度的方法
        onDownloadProgress: progressEvent => {
          if (onProgress) {
            onProgress(progressEvent)
          }
        }
      })

      // 获取远程的书籍
      .get(`${book.categoryText}/${book.fileName}.epub`)
      .then(res => {
        // epbu.js 可以直接打开blob对象
        const blob = new Blob([res.data])
        // 存储书籍
        setLocalForage(
          book.fileName,
          blob,
          () => {
            if (onSuccess) onSuccess(book)
          },
          err => {
            if (onError) onError(err)
          }
        )
      })
      .catch(err => {
        if (onError) onError(err)
      })
  )
}
