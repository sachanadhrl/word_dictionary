import { createStore } from "vuex"

import axiosClient from '../axios.js'

const store = createStore({
  state: {
    word: {
      loading: false,
      data: {}
    }
  },
  actions: {
    async getWord({ state, commit }, query) {
      state.word.loading = true
      try {
        const word = await axiosClient(`/${query}`)
        setTimeout(() => {
          commit("GET_WORD", word.data)
        }, 2000)
        console.log(word.data)
      } catch (err) {
        throw err.response.data
      }
    }
  },
  mutations: {
    GET_WORD: (state, word) => {
      state.word.data = word
      state.word.loading = false
    }
  }
})

export default store