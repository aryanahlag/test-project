<template>
  <div style='height: 55px'>
    <div class='bottom-navigation'>
      <v-bottom-navigation
        class='bottom-nav'
        :value='value'
        color='primary'
        grow
      >
        <v-btn to='/homepage' plain tile class='btn-notify-nav' :class='{active: value === 1}'>
        </v-btn>

        <v-btn to='/waiting' plain tile class='btn-live-nav' v-show="statLiveStream == true">
        </v-btn>

        <v-btn to='/profile' plain tile class='btn-profile-nav' :class='{active: value === 3}'>
        </v-btn>
      </v-bottom-navigation>
    </div>
  </div>
</template>

<script>

import {bearerAuth} from "@/lib/variables";

export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      statLiveStream: false
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
      reconnection: true,
      secure: true
    })
    this.$axios
      .get('members/myaccount', {headers: bearerAuth(this)})
      .then(({data}) => {
        this.$cookies.set('dataUser', data)
      })
      .catch((err) => {
        console.log('error when get data account: ',err)
      })
    if (this.$cookies.get('dataUser')) {
      this.socket.emit('checkStream', {socket_id: this.socket.id}, (res) => {
        console.log('emitCheckStream:', res)
      })
      this.socket.emit('setUser', this.$cookies.get('dataUser'), (err) => {
        console.log('setUserEmit: ', err)
      })
      this.socket.on('streamStarted', (res) => {
        if (res) {
          this.statLiveStream = true
          if (this.$cookies.get('liveCodeCookies')) {
            this.$cookies.remove('liveCodeCookies')
            setTimeout(() => {
              this.$cookies.set('liveCodeCookies', res)
            }, 100)
          } else {
            this.$cookies.set('liveCodeCookies', res)
          }
        }
      })
      this.socket.on(this.socket.id + '/streamChecked', (res) => {
        if (res.isLive === true) {
          this.statLiveStream = true
          if (this.$cookies.get('liveCodeCookies')) {
            this.$cookies.remove('liveCodeCookies')
            setTimeout(() => {
              this.$cookies.set('liveCodeCookies', res.livecode)
            }, 100)
          } else {
            this.$cookies.set('liveCodeCookies', res.livecode)
          }
        }
      })
    } else {
      console.log('you haven`t cookies data')
      this.$cookies.removeAll()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang='sass' scoped>
@import '../assets/sass/bottom-navigation'
</style>
