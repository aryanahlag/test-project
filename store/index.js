import { bearerAuth } from '~/lib/variables'

export const state = () => ({
  snackBar: false,
  snackBarMessage: '',
  snackBarColor: '',
  snackBarIcon: '',
  vodPaging: {
    offset: 0,
    limit: 500,
    back: false,
    next: false,
    videos: [],
  },
})
export const mutations = {
  setSnackBarMessage(state, payload) {
    state.snackBar = true
    state.snackBarMessage = payload.message
    state.snackBarColor = payload.color
    state.snackBarIcon = payload.icon
  },
  setSnackBar(state, value) {
    state.snackBar = value
  },
  setDataVod(state, payload) {
    state.vodPaging.offset += state.vodPaging.limit
    state.vodPaging.next = payload.next
    state.vodPaging.videos = [...state.vodPaging.videos, ...payload.data]
  },
}
export const actions = {
  getDataVod({ commit, state }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('vods', {
          params: {
            offset: state.vodPaging.offset,
            limit: state.vodPaging.limit,
          },
          headers: bearerAuth(this),
        })
        .then(({ data }) => {
          if (state.vodPaging.videos.length === 0) {
            commit('setDataVod', data)
          }
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
