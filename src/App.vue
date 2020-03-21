<template lang="pug">
  #app
    router-view
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['test'])
  },
  mounted() {}
}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = `${fontSize}px`
})
</script>

<style lang="scss">
@import "~@/assets/styles/global.scss";

#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>
