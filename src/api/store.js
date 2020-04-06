import axios from 'axios'

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
