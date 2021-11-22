<template>
  <div v-if="this.$route.path == '/live'" style="background: rgba(0,0,0,0.3)" class='app-bar' :class='{bordered: bordered}'>
    <div class='back-press' v-if='backPress' @click='back'>
      <v-btn dark icon plain>
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
    </div>
    <div class='left'>
      <slot></slot>
    </div>
    <div class='right'>
      <slot name='right'></slot>
    </div>
  </div>
  <div v-else class='app-bar' :class='{bordered: bordered}'>
    <div class='back-press' v-if='backPress' @click='back'>
      <v-btn icon plain>
        <v-icon>
          mdi-arrow-left
        </v-icon>
      </v-btn>
    </div>
    <div class='left'>
      <slot></slot>
    </div>
    <div class='right'>
      <slot name='right'></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    backPress: {
      default: false,
      type: Boolean
    },
    onBackPressed: {
      default: () => -1,
      type: Function
    },
    bordered: {
      default: false,
      type: Boolean
    }
  },
  methods: {
    back() {
      if (this.onBackPressed() === -1)
        this.$router.back()
    }
  }
}
</script>
<style lang='sass' scoped>
.app-bar
  display: flex
  padding: 16px 10px 12px 10px
  border-radius: 0px 0px 10px 10px
  align-items: center
  max-height: 55px
  z-index: 100
  position: relative

  .back-press
    margin-right: 8px

  &.bordered
    border-bottom: 1px solid $greyLight

  .left
    flex-grow: 1
</style>
