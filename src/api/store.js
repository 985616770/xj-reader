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
