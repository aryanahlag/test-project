<template>
  <div id="waiting-live">
    <div class="waiting-logo"></div>
    <div class="waiting-img"></div>
    <div v-if="noLiveStream == false" class="waiting-content mt-5">
      <h4 class="waiting-text">방송 준비 중!</h4>
      <p>방송 <span class="red--text">준비 중</span> 입니다.</p>
      <p>자세한 내용<span class="grey--text">은</span> 공지 사항을 참고<span class="grey--text">해 주세요.</span></p>
    </div>
    <div v-else class="waiting-content mt-5">
      <h4 class="waiting-text red--text">라이브 스트리밍 없음</h4>
      <p>생방송이 없거나 생방송이 종료되었습니다</p>
    </div>
    <BottomNavigation :value='2'></BottomNavigation>
  </div>
</template>

<script>
export default {
  name: "waiting",
  layout: 'default',
  data() {
    return {
      noLiveStream: true
    }
  },
  mounted() {
    this.socket = this.$nuxtSocket({
      channel: '/',
      reconnection: true,
      secure: true
    })
    this.socket.emit('checkStream', {socket_id: this.socket.id}, (res) => {
      console.log('emitCheckStream:', res)
    })
    this.socket.on('streamStarted', (res) => {
      console.log('streamStart', res.livecode)
      if (res) {
        setTimeout(() => {
          this.$router.push('/live')
        }, 3000)
        this.noLiveStream = false
      }
    })
    this.socket.on(this.socket.id + '/streamChecked', (res) => {
      if (res.isLive === true) {
        this.noLiveStream = false
        setTimeout(() => {
          this.$router.push('/live')
        }, 3000)
      } else {
        this.noLiveStream = true
      }
    })
  }
}
</script>

<style lang="scss" scoped>
@import "assets/waiting";
</style>
