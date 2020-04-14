/**
 * 给数组 的原型添加不重复的数据
 */

// eslint-disable-next-line no-extend-native
Array.prototype.pushWithoutDuplicate = function() {
  for (let i = 0; i < arguments.length; i++) {
    const arg = arguments[i]
    if (this.indexOf(arg) === -1) {
      this.push(arg)
    }
  }
}
