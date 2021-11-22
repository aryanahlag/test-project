<template>
  <v-snackbar width='100px' transition='scale-transition' v-model='snackBar' rounded='pill' :color='snackBarColor'
              :timeout='3000'>
    <v-icon>
      {{ snackBarIcon }}
    </v-icon>
    {{ snackBarMessage }}
  </v-snackbar>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Snackbar",
  computed: {
    snackBar: {
      get() {
        return this.$store.state.snackBar
      },
      set(value) {
        this.$store.commit('setSnackBar', value)
      }
    },
    ...mapState(['snackBarMessage', 'snackBarColor', 'snackBarIcon'])
  },
}
</script>

<style scoped>
::v-deep .v-snack__wrapper {
  min-width: max-content;
  margin-bottom: 125px;
}
</style>
