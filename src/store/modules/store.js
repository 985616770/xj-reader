const store = {
  state: {
    hotSearchOffsetY: 0,
    flapCardVisible: true
  },
  mutations: {
    SET_HOT_SEARCH_OFFSET_Y(state, hotSearchOffsetY) {
      state.hotSearchOffsetY = hotSearchOffsetY
    },
    SET_FLAP_CARD_VISIBLE(state, visible) {
      state.flapCardVisible = visible
    }
  }
}
export default store
