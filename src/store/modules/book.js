const book = {
  state: {
    fileName: 1
  },
  mutations: {
    SET_FILENAME: (state, fileName) => {
      state.fileName = fileName
    }
  },
  actions: {
    setFileName: ({ commit }, fileName) => {
      return commit('SET_FILENAME', fileName)
    }
  }
}
export default book
