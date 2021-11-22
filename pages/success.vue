<template>
  <div id="success-withdraw">
    <AppBar>
      <b>회원 탈퇴 완료</b>
    </AppBar>
    <div class="success-container">
      <div class="success-img"></div>
      <div class="success-text">
        <h4>회원 탈퇴 완료</h4>
        <p class="mt-5">두관이 명관 LIVE tv를 <span>이용해주셔서 감사합니다.</span></p>
        <p>15일 이후<span>에 다시</span> 가입 <span>하실 수 있습니다.</span></p>
      </div>
    </div>
    <div class="success-footer">
      <v-btn to="/login" block shaped color="primary">탈퇴</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "success",
  layout: 'noauth'
}
</script>

<style lang="scss" scoped>
@import "../assets/withdrawal";
</style>
