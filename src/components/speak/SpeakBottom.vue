<template lang="pug">
  .speak-bottom-wrapper(:class="{'hide-play':!showPlay}")
    .bottom-playing-wrapper(
      @click.stop.prevent="onPlayingCardClick"
      v-if="showPlay"
      )
      .bottom-playing-left
        .icon-play-wrapper(@click.stop.prevent="togglePlay")
          span.icon-play_go(v-if="!isPlaying")
          span.icon-play_pause(v-else)
      .bottom-playing-right
        .bottom-playing-chapter-text
          span.chapter-label {{ chapter ? chapter.label : '' }}
          span.bottom-playing-page-text(
            v-if="currentSectionIndex && currentSectionTotal"
          ) ( {{currentSectionIndex}} / {{currentSectionTotal}} )
        .bottom-playing-page-text {{ playInfo ? playInfo.currentMinute : '00'}}:{{playInfo ? playInfo.currentSecond : '00'}} / {{playInfo ? playInfo.totalMinute : '00'}}:{{playInfo ? playInfo.totalSecond : '00'}}
    .bottom-btn-wrapper
      span.bottom-btn-text {{ $t('detail.addOrRemoveShelf') }}
</template>

<script>
export default {
  name: 'SpeakBottom',
  props: {
    chapter: Object,
    currentSectionIndex: Number,
    currentSectionTotal: Number,
    showPlay: Boolean,
    isPlaying: Boolean,
    playInfo: Object
  },
  methods: {
    togglePlay() {
      this.$parent.togglePlay()
    },
    onPlayingCardClick() {
      this.$emit('onPlayingCardClick')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';

.speak-bottom-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 110;
  width: 100%;
  height: px2rem(116);
  background: white;
  box-shadow: 0 px2rem(-2) px2rem(2) 0 rgba(0, 0, 0, .1);
  &.hide-play {
    height: px2rem(52);
  }
  .bottom-playing-wrapper {
    display: flex;
    width: 100%;
    height: px2rem(64);
    .bottom-playing-left {
      flex: 0 0 px2rem(70);
      width: px2rem(70);
      @include center;
      .icon-play-wrapper {
        flex: 0 0 px2rem(100);
        @include center;
        &:active {
          opacity: .5;
        }
        .icon-play_go {
          font-size: px2rem(40);
          color: $color-blue;
        }
        .icon-play_pause {
          font-size: px2rem(40);
          color: $color-blue;
        }
      }
    }
    .bottom-playing-right {
      flex: 1;
      padding-right: px2rem(15);
      box-sizing: border-box;
      @include columnLeft;
      .bottom-playing-chapter-text {
        max-width: px2rem(305);
        color: #333;
        font-size: px2rem(16);
        line-height: px2rem(19);
        @include ellipsis;
      }
      .bottom-playing-page-text {
        color: #666;
        font-size: px2rem(10);
        margin-top: px2rem(5);
      }
    }
  }
  .bottom-btn-wrapper {
    width: 100%;
    height: px2rem(52);
    border-top: px2rem(1) solid #eee;
    box-sizing: border-box;
    @include center;
    .bottom-btn-text {
      font-size: px2rem(14);
      color: $color-blue;
      font-weight: bold;
    }
  }
}
</style>
