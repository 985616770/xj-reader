<template lang="pug">
  .book-list-wrapper
    detail-title(
    :title="title"
    :showShelf="true"
    @back="back"
    ref="title"
    )
    scroll.book-list-scroll-wrapper(
    :top="42"
    @onScroll="onScroll"
    ref="scroll"
    )
      featured(
        :data="value"
        :titleText="titleText ? titleText : getCategoryText(key)"
        :btnTex="''"
        v-for="(value, key, index) in list"
        :key="index"
      )
</template>

<script>
import DetailTitle from '@/components/detail/DetailTitle'
import Scroll from '@/components/common/Scroll'
import Featured from '@/components/home/Featured'

import { list } from '@/api/store'
import { realPx } from '@/utils/utils'
import { categoryText, categoryList } from '@/utils/store'

export default {
  name: 'StoreList',
  components: { Featured, Scroll, DetailTitle },
  computed: {
    title() {
      if (this.list) {
        return this.total && this.$t('home.allBook').replace('$1', this.totalNumber)
      } else {
        return null
      }
    },
    totalNumber() {
      let num = 0
      Object.keys(this.list).forEach(key => {
        num += this.list[key].length
      })
      return num
    }
  },
  data() {
    return {
      list: null,
      total: null
    }
  },
  methods: {
    getCategoryText(key) {
      return `${categoryText(categoryList[key], this)}(${this.list[key].length})`
    },
    back() {
      this.$router.go(-1)
    },
    onScroll(offsetY) {
      if (offsetY > realPx(42)) {
        this.$refs.title.showShadow()
      } else {
        this.$refs.title.hideShadow()
      }
    },
    getList() {
      list().then(response => {
        this.list = response.data.data
        this.total = response.data.total
        const category = this.$route.query.category
        const keyword = this.$route.query.keyword
        if (category) {
          const key = Object.keys(this.list).filter(item => item === category)[0]
          const data = this.list[key]
          this.list = {}
          this.list[key] = data
        } else if (keyword) {
          Object.keys(this.list).filter(key => {
            this.list[key] = this.list[key].filter(book => book.fileName.indexOf(keyword) >= 0)
            return this.list[key].length > 0
          })
        }
      })
    }
  },
  created() {
    this.getList()
    this.titleText = this.$route.query.categoryText
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.book-list-wrapper {
  width: 100%;
  height: 100%;
  background: white;
}
</style>
