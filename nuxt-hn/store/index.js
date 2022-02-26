/* #data */
const state = () => ({
  // Explorer state
  explorerState: {
    categoryURL: String,
    metadataURL: String,
    categoryName: String,
    pageNumber: Number
  },
  // Article state
  articleState: {
    articleURL: String
  }
})

/* mutations for actions */
const mutations = {
  SET_EXPLORER_STATE (state, data) {
    state.explorerState = data
  },
  SET_ARTICLE_STATE (state, data) {
    state.articleState = data
  }
}

/* #computed */
const getters = {
  // Necessary for watchers
  explorerState (state) {
    return state.explorerState
  },
  getArticleState (state) {
    return state.articleState
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
  },
  setArticleState (context, articleURL) {
    context.commit('SET_ARTICLE_STATE', {
      articleURL
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
