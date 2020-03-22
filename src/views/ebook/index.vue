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

export default {
  name: 'Ebook',
  components: { EbookMenu, EbookTitle, EbookReader }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
</style>
