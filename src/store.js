import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined,
    acces_token: undefined,
    latest_tracks: undefined,
    current_song_id: undefined
  },
  mutations: {
    setAccesToken(state, payload) {
      state.acces_token = payload
    },
    setUserDetails(state, payload) {
      state.user = payload
    },
    setLatestTracks(state, payload) {
      state.latest_tracks = payload
    },
    setCurrentSongId(state, payload) {
      state.current_song_id = payload
    }
  },
  actions: {
    setAccesToken({commit}, payload) {
      commit('setAccesToken', payload)
    },
    setUserDetails({commit}, payload) {
      commit('setUserDetails', payload)
    },
    setLatestTracks({commit}, payload) {
      commit('setLatestTracks', payload)
    },
    setCurrentSongId({commit}, payload) {
      commit('setCurrentSongId', payload)
    }
  }
})
