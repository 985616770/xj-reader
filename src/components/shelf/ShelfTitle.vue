<template lang="pug">
transition(name="fade")
  .shelf-title(
    v-show="shelfTitleVisible"
    :class="{'hide-shadow':ifHideShadow}"
    )
    .shelf-title-text-wrapper
      span.shelf-title-text {{ title }}
      span.shelf-sub-title-text(v-show="isEditMode") {{ selectedText }}
    .shelf-title-btn-wrapper.shelf-title-left(@click="clearCache" v-if="!ifShowBack")
      span.shelf-title-btn-text {{ $t('shelf.clearCache') }}
    .shelf-title-btn-wrapper.shelf-title-left(@click="back" v-if="ifShowBack")
      span.icon-back
    .shelf-title-btn-wrapper.shelf-title-right(@click="onEditClick")
      span.shelf-title-btn-text {{ isEditMode? $t('shelf.cancel') : $t('shelf.edit') }}
</template>

<script>
import { storeShelfMixin } from '@/utils/mixin'
import { clearLocalStorage } from '@/utils/localStorage'
import { clearLocalForage } from '@/utils/localForage'

export default {
  name: 'ShelfTitle',
  mixins: [storeShelfMixin],
  props: {
    ifShowBack: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    }
  },
  watch: {
    offsetY(offsetY) {
      if (offsetY > 0) {
        this.ifHideShadow = false
      } else {
        this.ifHideShadow = true
      }
    }
  },
  data() {
    return {
      ifHideShadow: true
    }
  },
  computed: {
    selectedText() {
      const selectedNumber = this.shelfSelected ? this.shelfSelected.length : 0
      return selectedNumber <= 0
        ? this.$t('shelf.selectBook')
        : selectedNumber === 1
          ? this.$t('shelf.haveSelectedBook').replace('$1', selectedNumber)
          : this.$t('shelf.haveSelectedBooks').replace('$1', selectedNumber)
    }
  },
  methods: {
    onEditClick() {
      if (!this.isEditMode) {
        this.setShelfSelected([])
        this.shelfList.forEach(item => {
          item.selected = false
          if (item.itemList) {
            item.itemList.forEach(subItem => {
              subItem.selected = false
            })
          }
        })
      }
      this.setIsEditMode(!this.isEditMode)
    },
    /*
     * 清除所有的缓存数据
     * */
    clearCache() {
      clearLocalStorage()
      clearLocalForage()
      this.setShelfList([])
      this.setShelfSelected([])
      this.getShelfList()
      this.simpleToast(this.$t('shelf.clearCacheSuccess'))
    },
    back() {
      this.setIsEditMode(false)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/styles/global';

.shelf-title {
  position: relative;
  width: 100%;
  height: px2rem(42);
  background: white;
  z-index: 103;
  box-shadow: 0 px2rem(2) px2rem(2) 0 rgba(0, 0, 0, 0.1);
  &.hide-shadow {
    box-shadow: none;
  }
  .shelf-title-text-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(42);
    @include columnCenter;

    .shelf-title-text {
      font-size: px2rem(16);
      line-height: px2rem(20);
      color: #333;
      font-weight: bold;
    }

    .shelf-sub-title-text {
      font-size: px2rem(10);
      color: #333;
    }
  }

  .shelf-title-btn-wrapper {
    position: absolute;
    top: 0;

    .shelf-title-btn-text {
      font-size: px2rem(14);
      color: #666;
    }

    &.shelf-title-left {
      left: 0;
      padding-left: px2rem(15);
      .icon-back {
        font-size: px2rem(16);
      }
    }

    &.shelf-title-right {
      right: 0;
      padding-right: px2rem(15);
    }
  }
}
</style>
