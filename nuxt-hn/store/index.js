/* #data */
const state = () => ({
  test: 'initial',

  // Article page

  // Explorer page
  explorerState: {
    loading: false,
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
  },
  SET_EXPLORER_LOADING (state, bool) {
    state.explorerState.loading = bool
  }
}

/* #computed */
const getters = {
  // Necessary for watcher
  explorerLoading (state) {
    return state.explorerState.loading
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
      loading: true,
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
