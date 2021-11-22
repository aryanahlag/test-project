<template>
  <div class='welcome'>
    <div class='wrap'>
      <div class='welcome-image'></div>
      <div class='title'>환영합니다</div>
      <div class='additional'><b>회원가입</b>이 <b>완료</b> 되었습니다.</div>
      <div class='additional'><b>로그인</b>을 하여 <b>접속 후 이용 가능</b>합니다.</div>
    </div>
    <div class='bottom-button'>
      <v-btn class='button' @click="redirectLogin">로그인하러 가기</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Welcome',
  layout: 'noauth',
  methods: {
    redirectLogin(){
      this.$cookies.removeAll()
      this.$router.push('/login')
    }
  }
}
</script>
<style lang='sass' scoped>
.welcome
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 96vh
  display: flex
  justify-content: center
  align-items: center
  .wrap
    display: flex
    justify-content: center
    align-items: center
    flex-direction: column
    .welcome-image
      width: 318.27px
      height: 208.31px
    .title
      font-size: 24px
      font-weight: bold
      color: $blue
      margin-top: 24px
      margin-bottom: 30px
    .additional
      font-size: 16px
    .additional+.additional
      margin-top: 16px
</style>
