<template lang="pug">
  .speak-bottom-wrapper(:class="{'hide-play':!showPlay}")
    .bottom-playing-wrapper(
      @click.stop.prevent="onPlayingCardClick"
      v-if="showPlay"
      )
    .bottom-playing
</template>

<script>
export default {
  name: 'SpeakBottom'
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
</style>
