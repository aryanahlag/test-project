<template>
  <v-app>
    <Nuxt v-if='$nuxt.isOnline'/>
    <div v-else class='absolute-xy-center'>
      <div>너는 지금 접속이 안되있어</div>
    </div>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  mounted() {
    if (this.$route.path === '/login') {
      console.log('login')
    } else {
      this.$store.dispatch('user/refreshToken')
        .then(() => {
          console.log('sukses')
        })
        .catch(err => {
          this.$cookies.removeAll()
          this.$router.push('/')
          console.log('erorrrrrr: ', err)
        })
    }
  }
}
</script>
