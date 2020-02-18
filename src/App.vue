<template lang="pug">
  #app
    #nav
      router-link(to="/") Home
        span.text Abcdefyhisdjfljska
    router-view
</template>
<script>
export default {}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  console.log(html)
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = `${fontSize}px`
})
</script>

<style lang="scss">
.text {
  font-family: 'Indie Flower';
  font-size: 1rem;
}
</style>
