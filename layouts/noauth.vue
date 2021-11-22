<template>
  <v-app>
    <Nuxt v-if='$nuxt.isOnline' />
    <div v-else class='is-offline'>
      <div>너는 지금 접속이 안되있어</div>
    </div>
  </v-app>
</template>


<style lang='sass' scoped>
.is-offline
  width: 100%
  height: 100vh
  position: absolute
  top: 0
  left: 0
  display: flex
  justify-content: center
  align-items: center
</style>
