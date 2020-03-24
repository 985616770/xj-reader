<template lang="pug">
  .store-home
    search-bar
    flap-card
    scroll(
      :top="scrollTop"
      @onScroll="onScroll"
      ref="scroll"
    )
</template>

<script>
import SearchBar from '@/components/home/SearchBar'
import Scroll from '@/components/common/Scroll'
import { storeHomeMixin } from '@/utils/mixin'
import FlapCard from '@/components/home/FlapCard'

export default {
  name: 'StoreHome',
  mixins: [storeHomeMixin],
  components: { FlapCard, Scroll, SearchBar },
  data() {
    return {
      scrollTop: 94
    }
  },
  methods: {
    onScroll(offsetY) {
      this.setOffsetY(offsetY)
      if (offsetY > 0) {
        this.scrollTop = 52
      } else {
        this.scrollTop = 94
      }
      this.$refs.scroll.refresh()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.store-home {
  width: 100%;
  height: 100%;
}
</style>
