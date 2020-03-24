<template lang="pug">
  .store
    router-view
</template>

<script>
export default {
  name: 'Store'
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.store{
  height: 100%;
  width: 100%;
  background: #fff;
}
</style>
