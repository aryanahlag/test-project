<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      <p>시스템 오류가 있거나 계정 데이터에 문제가 있습니다.</p>
      <br>
      <p>다시 시작하고 다시 로그인</p>
    </h1>
    <br>
    <v-btn @click="redirectPage" color="red" class="text-center text--white" small rounded>
      지금 다시 시작
    </v-btn>

  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      pageNotFound: '404 Not Found',
    }
  },
  methods: {
    redirectPage(){
      this.$cookies.removeAll()
      this.$router.push('/')
    }
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 20px;
}
</style>
