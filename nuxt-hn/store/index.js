/* #data */
const state = () => ({
  // Explorer page
  explorerState: {
    categoryURL: String,
    metadataURL: String,
    categoryName: String,
    pageNumber: Number
  }
})

/* All states mutations */
const mutations = {
  SET_EXPLORER_STATE (state, data) {
    state.explorerState = data
  }
}

/* #computed */
const getters = {
  // Necessary for watcher
  explorerState (state) {
    return state.explorerState
  }
}

/* #methods */
const actions = {
  setExplorerState (context, { pageNumber, categoryURL = '', categoryName = '' }) {
    const newURL = (categoryURL === '' ? context.state.explorerState.categoryURL : categoryURL)
    const newCategoryName = (categoryName === '' ? context.state.explorerState.categoryName : categoryName)

    // Set url with the right pageNumber to get metadata
    const indexLastSlash = newURL.lastIndexOf('/')
    const metadataURL = newURL.slice(0, indexLastSlash) + '/' + String(pageNumber) + newURL.slice(indexLastSlash)

    // Set the explorer state
    context.commit('SET_EXPLORER_STATE', {
      categoryURL: newURL,
      metadataURL,
      categoryName: newCategoryName,
      pageNumber
    })
  }
}

/* Export all stores */
export default {
  state,
  mutations,
  getters,
  actions
}
