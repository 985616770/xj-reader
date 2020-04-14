/**
 * 'px to rem
 * @param px
 * @returns {number}
 */
export function px2rem(px) {
  const ratio = 375 / 10
  return px / ratio
}

/**
 * px to 真实的px
 * @param px
 * @returns {number}
 */
export function realPx(px) {
  const maxWidth = window.innerWidth > 500 ? 500 : window.innerWidth
  return px * (maxWidth / 375)
}
