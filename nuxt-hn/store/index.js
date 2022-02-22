/* #data */
const state = () => ({
  test: 'initial'
})

/* All states mutations */
const mutations = {
  SET_INITIAL (state, str) {
    state.test = str
  }
}

/* #computed */
const getters = {}

/* #methods */
const actions = {}

/* Export all stores */
export default {
  state,
  mutations,
  getters,
  actions
}
