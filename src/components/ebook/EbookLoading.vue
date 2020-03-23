<template lang="pug">
.ebook-loading
  .ebook-loading-wrapper
    .ebook-loading-item(v-for="(item, index) in data" :key="index")
      .ebook-loading-line-wrapper(v-for="(subItem,subIndex) in item" :key="subIndex")
        .ebook-loading-line(ref="line")
        .ebook-loading-mask(ref="mask")
    .ebook-loading-center
</template>

<script>
import { px2rem } from '@/utils/utils'

export default {
  name: 'EbookLoading',
  data() {
    return {
      data: [
        [{}, {}, {}],
        [{}, {}, {}]
      ],
      maskWidth: [{ value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }],
      lineWidth: [{ value: 16 }, { value: 16 }, { value: 16 }, { value: 16 }, { value: 16 }, { value: 16 }],
      add: true,
      end: false
    }
  },
  mounted() {
    this.task = setInterval(() => {
      this.$refs.mask.forEach((item, index) => {
        const mask = this.$refs.mask[index]
        const line = this.$refs.line[index]
        const maskWidth = this.maskWidth[index]
        const lineWidth = this.lineWidth[index]
        if (index === 0) {
          if (this.add && maskWidth.value < 16) {
            maskWidth.value++
            lineWidth.value--
          } else if (!this.add && lineWidth.value < 16) {
            maskWidth.value--
            lineWidth.value++
          }
        } else {
          if (this.add && maskWidth.value < 16) {
            const preMaskWidth = this.maskWidth[index - 1]
            if (preMaskWidth.value >= 8) {
              maskWidth.value++
              lineWidth.value--
            }
          } else if (!this.add && lineWidth.value < 16) {
            const preLineWidth = this.lineWidth[index - 1]
            if (preLineWidth.value >= 8) {
              maskWidth.value--
              lineWidth.value++
            }
          }
        }

        line.style.width = `${px2rem(lineWidth.value)}rem`
        line.style.flex = `0 0 ${px2rem(lineWidth.value)}rem`
        mask.style.width = `${px2rem(maskWidth.value)}rem`
        mask.style.flex = `0 0${px2rem(maskWidth.value)}rem`

        if (index === this.maskWidth.length - 1) {
          if (this.add) {
            if (maskWidth.value === 16) {
              this.end = true
            }
          } else {
            if (maskWidth.value === 0) {
              this.end = true
            }
          }
        }
        if (this.end) {
          this.add = !this.add
          this.end = false
        }
      })
    }, 20)
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.ebook-loading {
  position: relative;
  z-index: 400;
  width: px2rem(63);
  height: px2rem(40);
  background: transparent;
  border: px2rem(1.5) solid #d7d7d7;
  border-radius: px2rem(3);
  .ebook-loading-wrapper {
    display: flex;
    width: 100%;
    height: 100%;
    .ebook-loading-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(7) 0;
      box-sizing: border-box;
      .ebook-loading-line-wrapper {
        flex: 1;
        padding: 0 px2rem(7);
        box-sizing: border-box;
        @include left;
        .ebook-loading-line {
          flex: 0 0 px2rem(16);
          width: px2rem(16);
          height: px2rem(1.5);
          background: #d7d7d7;
        }
        .ebook-loading-mask {
          flex: 0 0 px2rem(0);
          width: px2rem(0);
          height: px2rem(1.5);
          box-sizing: border-box;
        }
      }
    }
    .ebook-loading-center {
      position: absolute;
      left: 50%;
      top: 0;
      width: px2rem(1.5);
      height: 100%;
      background: #d7d7d7;
    }
  }
}
</style>
