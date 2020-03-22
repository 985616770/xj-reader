<template lang="pug">
  .ebook
    ebook-title
    ebook-reader
    ebook-menu
</template>

<script>
import EbookReader from '@/components/ebook/EbookReader'
import EbookTitle from '@/components/ebook/EbookTitle'
import EbookMenu from '@/components/ebook/EbookMenu'
import { getReadTime, saveReadTime } from '@/utils/localStorage'
import { ebookMixin } from '@/utils/mixin'

export default {
  name: 'Ebook',
  mixins: [ebookMixin],
  components: { EbookMenu, EbookTitle, EbookReader },
  methods: {
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    }
  },
  mounted() {
    this.startLoopReadTime()
  },
  beforeDestroy() {
    if (this.task) {
      clearInterval(this.task)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
</style>
