<template>
  <div id='splash'>
    <div class='splash-icon'></div>
    <div class='splash-contain'>
      <h3 class='text-loading'>LOADING</h3>
      <p class='text-loading-2'>
        <span>현재 로딩 중입니다</span>
        <br>
        <span>잠시만 기다려 주세요</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    setTimeout(()=>{
      this.$router.push('/login')
    }, 2000)
  }
}
</script>

<style lang='scss' scoped>
@import 'assets/splash.scss';
</style>
