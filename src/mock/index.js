import Mock from 'mockjs'
import home from './bookHome'
import shelf from './bookShelf'
import list from './bookList'
import flatList from './bookFlatList'
// import categoryList from './bookCategoryList'

/*
 * rurl => 正则表达匹配url
 * rtype => 请求的方式
 * template => 模版|| 对象 ||数据
 * */
Mock.mock(/\/book\/home/, 'get', home)
Mock.mock(/\/book\/shelf/, 'get', shelf)
Mock.mock(/\/book\/list/, 'get', list)
Mock.mock(/\/book\/flat-list/, 'get', flatList)
