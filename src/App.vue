<template lang="pug">
  #app
    #nav
      router-link(to="/") Home
        span.text
    router-view
</template>
<script>
export default {
  mounted() {
    this.$store.dispatch('setTest', 10).then(() => {
      console.log(this.$store.state.test)
    })
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = `${fontSize}px`
})
</script>

<style lang="scss">
.text {
  font-family: 'Indie Flower',serif;
  font-size: 1rem;
}
</style>
