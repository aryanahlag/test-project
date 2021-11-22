import { bearerAuth } from '~/lib/variables'

export const state = () => ({
  user: null,
  imageUser: null,
  defaultImageProfile:
    'https://s3-ap-northeast-1.amazonaws.com/ojuz-attach/profile/images/GioChkhaidze',
})
export const mutations = {
  setUser(state, payload) {
    state.user = payload
  },
}
export const actions = {
  login({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('auth/signin', payload.form)
        .then(({ data }) => {
          if (
            data.user.user_stat === 'member' ||
            data.user.user_stat === 'admin'
          ) {
            this.$cookies.set('token', data.token, {
              path: '/',
              maxAge: 60 * 60 * 24 * 30,
            })
            if (payload.autoLogin) this.$cookies.set('autoLogin', true)
            this.$cookies.set('dataUser', data.user, {
              maxAge: 60 * 60 * 24 * 30,
            })
            commit('setUser', data.user)
          }
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  refreshToken({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('auth/token/refresh', {}, { headers: bearerAuth(this) })
        .then(({ data }) => {
          this.$cookies.set('token', data.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
          })
          commit('setUser', data.user)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  getUserProfile({ commit }) {
    return new Promise((resolve, reject) => {
      this.$axios
        .get('members/myaccount', { headers: bearerAuth(this) })
        .then(({ data }) => {
          commit('setUser', data)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  logout({ commit }) {
    this.$router.push({ name: 'login' })
    this.$cookies.remove('token')
    commit('setUser', null)
  },
  updateUserProfile({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .put(
          'members/myaccount/edit',
          {
            phone: payload.phone,
            name: payload.name,
            location: payload.location,
            birth_date: payload.birth_date,
            recommended_by: payload.recommended_by,
            avatar: payload.avatar,
          },
          { headers: bearerAuth(this) }
        )
        .then(({ data }) => {
          console.log('hasil proses: ', data)
          commit('setUser', data)
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  signUp({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('auth/signup', payload)
        .then(({ data }) => {
          this.$cookies.set('token', data.token, {
            path: '/',
            maxAge: 60 * 60 * 24 * 30,
          })
          commit('setUser', data.user)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  userWithdrawal({ commit }, payload) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('members/myaccount/withdrawal', payload, {
          headers: bearerAuth(this),
        })
        .then(() => {
          this.$cookies.removeAll()
          commit('setUser', null)
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}
