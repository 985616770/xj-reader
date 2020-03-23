// 静态的资源
// 字号
import { realPx } from '@/utils/utils'

export const FONT_SIZE_LIST = [
  { fontSize: 12 },
  { fontSize: 14 },
  { fontSize: 16 },
  { fontSize: 18 },
  { fontSize: 20 },
  { fontSize: 22 },
  { fontSize: 24 }
]
// 字体
export const FONT_FAMILY = [
  { font: 'Default' },
  { font: 'Cabin' },
  { font: 'Days One' },
  { font: 'Montserrat' },
  { font: 'Tangerine' },
  { font: 'IndieFlower' }
]
// 主题
export function themeList(vue) {
  return [
    {
      alias: vue.$t('book.themeDefault'),
      name: 'Default',
      style: {
        body: {
          color: '#4c5059',
          background: '#cecece',
          'padding-top': `${realPx(48)}px !important`,
          'padding-bottom': `${realPx(48)}px !important`
        }
      }
    },
    {
      alias: vue.$t('book.themeGold'),
      name: 'Gold',
      style: {
        body: {
          color: '#5c5b56',
          background: '#c6c2b6',
          'padding-top': `${realPx(48)}px !important`,
          'padding-bottom': `${realPx(48)}px !important`
        }
      }
    },
    {
      alias: vue.$t('book.themeEye'),
      name: 'Eye',
      style: {
        body: {
          color: '#404c42',
          background: '#a9c1a9',
          'padding-top': `${realPx(48)}px !important`,
          'padding-bottom': `${realPx(48)}px !important`
        }
      }
    },
    {
      alias: vue.$t('book.themeNight'),
      name: 'Night',
      style: {
        body: {
          color: '#cecece',
          background: '#000000',
          'padding-top': `${realPx(48)}px !important`,
          'padding-bottom': `${realPx(48)}px !important`
        }
      }
    }
  ]
}
// 添加css
export function addCss(href) {
  const link = document.createElement('link')
  link.setAttribute('type', 'text/css')
  link.setAttribute('rel', 'stylesheet')
  link.setAttribute('href', href)
  document.getElementsByTagName('head')[0].appendChild(link)
}
// 删除css文件
export function removeCss(href) {
  const links = document.getElementsByTagName('link')
  for (let i = links.length; i >= 0; i--) {
    const link = links[i]
    if (link && link.getAttribute('href') && link.getAttribute('href') === href) {
      link.parentNode.removeChild(link)
    }
  }
}
// 删除所有的css文件
export function removeAllCss() {
  removeCss(`${process.env.VUE_APP_RES_URL}theme/theme_default.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}theme/theme_gold.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}theme/theme_eye.css`)
  removeCss(`${process.env.VUE_APP_RES_URL}theme/theme_night.css`)
}
// 树状数据结构转换为一维数组结构
export function flatten(arr) {
  return [].concat(...arr.map(item => [].concat(item, item.subitems)))
}
