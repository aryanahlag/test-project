import { bearerAuth } from '~/lib/variables'

export const state = () => ({
  notificationPaging: {
    offset: 0,
    limit: 10,
    back: false,
    next: false,
    notifications: [],
  },
})
export const mutations = {
  addNotifications(state, payload) {
    state.notificationPaging.offset += state.notificationPaging.limit
    state.notificationPaging.next = payload.next
    state.notificationPaging.notifications = [
      ...state.notificationPaging.notifications,
      ...payload.data,
    ]
  },
}

export const actions = {
  getPagingNotifications({ commit, state }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('notifications', {
          params: {
            offset: state.notificationPaging.offset,
            limit: state.notificationPaging.limit,
          },
          headers: bearerAuth(this),
        })
        .then(({ data }) => {
          console.log('abc: ', data)
          if (state.notificationPaging.notifications.length === 0){
            commit('addNotifications', data)
          }
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
