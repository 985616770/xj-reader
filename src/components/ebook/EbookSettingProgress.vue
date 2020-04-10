<template lang="pug">
  transition(name="slide-up")
    .setting-wrapper(v-show="menuVisible && settingVisible === 2")
      .setting-progress
        .read-time-wrapper
          .read-time-text {{ getReadTimeText() }}
          span.icon-forward
        .progress-wrapper
          .progress-icon-wrapper(@click="prevSection()")
            span.icon-back
          input.progress(type="range"
            max="100"
            min="0"
            step="1"
            @change="onProgressChange($event.target.value)"
            @input="onProgressInput($event.target.value)"
            :value ="progress"
            :disabled="!bookAvailable"
            ref="progress"
            )
          .progress-icon-wrapper(@click="nextSection()")
            span.icon-forward
        .text-wrapper
          span.progress-section-text {{ getSectionName }}
          span ({{bookAvailable ? progress + '%' : 'loading...'}})
</template>

<script>
import { ebookMixin } from '@/utils/mixin'

export default {
  name: 'EbookSettingProgress',
  mixins: [ebookMixin],
  methods: {
    // 松手时调用的方法
    onProgressChange(progress) {
      this.setProgress(progress).then(() => {
        this.displayProgress()
        this.updateProgressBg()
      })
    },
    // 拖动过程中调用的方法
    onProgressInput(progress) {
      this.setProgress(progress).then(() => {
        this.updateProgressBg()
      })
    },
    // 展示进度条所在的位置
    displayProgress() {
      const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
      this.display(cfi)
    },
    // 更新进度条
    updateProgressBg() {
      // css设置important的方法
      this.$refs.progress.style.setProperty('background-size', `${this.progress}% 100%`, 'important')
    },
    // 上一章
    prevSection() {
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          this.displaySection()
        })
      }
    },
    // 下一章
    nextSection() {
      if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection()
        })
      }
    },
    // 切换章节
    displaySection() {
      const sectionInfo = this.currentBook.section(this.section)
      if (sectionInfo && sectionInfo.href) {
        this.display(sectionInfo.href)
      }
    }
  },
  updated() {
    this.updateProgressBg()
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';
.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 151;
  width: 100%;
  height: px2rem(90);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
    .read-time-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: px2rem(40);
      @include center;
      font-size: px2rem(12);
    }
    .progress-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .progress {
        flex: 1;
        width: 100%;
        -webkit-appearance: none;
        height: px2rem(2);
        background: linear-gradient(#5d6268, #5d6268) no-repeat, #b4b5b7;
        background-size: 0 100%;
        margin: 0 px2rem(10);
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: #ceced0;
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.15);
          border: none;
        }
      }
      .progress-icon-wrapper {
        flex: 0 0 px2rem(22);
        font-size: px2rem(22);
        @include center;
      }
    }
    .text-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(5);
      width: 100%;
      font-size: px2rem(12);
      text-align: center;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      @include center;
      .progress-section-text {
        line-height: px2rem(15);
        @include ellipsis;
      }
      .progress-text {
      }
    }
  }
}
</style>
