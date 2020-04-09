import axios from 'axios'
import { setLocalForage } from '@/utils/localForage'

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10000
})

export function home() {
  return instance({
    method: 'get',
    url: '/book/home'
  })
}

export function detail(book) {
  return axios({
    method: 'get',
    url: `${process.env.VUE_APP_BOOK_URL}/book/detail`,
    params: {
      fileName: book.fileName
    }
  })
}
export function list() {
  return instance({
    method: 'get',
    url: '/book/list'
  })
}

export function shelf() {
  return instance({
    method: 'get',
    url: '/book/shelf'
  })
}

export function download(book, onSuccess, onError, onProgress) {
  if (!onProgress) {
    onProgress = onError
    onError = null
  }
  return axios
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
    .get(`${book.categoryText}/${book.fileName}.epub`)
    .then(res => {
      // epbu.js 可以直接打开
      const blob = new Blob([res.data])
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
}
