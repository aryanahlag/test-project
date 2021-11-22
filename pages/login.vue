<template>
  <div>
    <AppBar>
      <b>로그인</b>
    </AppBar>
    <v-form @submit.prevent="login">
      <v-container class="login-form">
        <v-row>
          <v-col>
            <div class="logo"></div>
          </v-col>
        </v-row>
        <v-row class="form">
          <v-col cols="12">
            <h4 class="label">휴대전화 번호</h4>
            <v-text-field
              filled
              clearable
              clear-icon='mdi-close-circle-outline'
              dense
              hide-details
              :rules='[rules.required]'
              type="number"
              class="login-tf"
              placeholder="휴대전화 번호를 입력해 주세요."
              v-model="form.id"
            />
          </v-col>
          <v-col cols="12" class="pt-0">
            <h4 class="label">비밀번호</h4>
            <v-text-field
              filled
              clearable
              clear-icon='mdi-close-circle-outline'
              dense
              :rules='[rules.required]'
              hide-details="auto"
              :append-icon="passvisible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passvisible ? 'text': 'password'"
              @click:append='passvisible = !passvisible'
              class="login-tf"
              placeholder="비밀번호를 입력해 주세요."
              v-model="form.password"
            />
          </v-col>
        </v-row>
        <v-row>
          <v-col class="checkbox-container">
            <div class="checkbox-wrap">
              <input type="checkbox" v-model="autoLogin" class="checkbox" id="auto-login"/>
              <label class="checkbox-label" for="auto-login" style="font-size:12px">자동 로그인</label>
            </div>
          </v-col>
        </v-row>
      </v-container>
      <div class="footer">
        <div class="login-button-wrap">
          <v-btn type="submit" v-if="form.id && form.password !== ''" :loading="btnLoading" class="login-button"
                 depressed>로그인
          </v-btn>
          <v-btn type="submit" v-else disabled class="login-button" depressed>로그인</v-btn>
        </div>
        <div class='additional-button'>
          <v-btn type="button" class="login-button" depressed>비밀번호 재설정</v-btn>
          <v-btn type="button" class="login-button" depressed to='/terms-and-conditions'>회원가입</v-btn>
        </div>
      </div>
    </v-form>
    <Snackbar/>
  </div>
</template>
<script>
export default {
  name: 'login',
  layout: 'noauth',
  middleware: 'login',
  data() {
    return {
      passvisible: false,
      btnLoading: false,
      image: null,
      rules: {
        required: value => !!value || '필수'
      },
      autoLogin: true,
      form: {
        id: '',
        password: '',
        type: 'phone'
      }
    }
  },
  mounted() {
    if (this.$cookies.get('autoLogin')) {
      if (this.$cookies.get('token') !== undefined) {
        this.$store.dispatch('user/refreshToken')
          .then(() => {
            this.$router.push('/homepage')
          })
          .catch(err => {
            this.$store.commit('setSnackBarMessage', {
              message: '휴대전화 번호와 비밀번호를 다시 확인해주세요.',
              color: 'red',
              icon: 'mdi-key-remove'
            })
            console.log(err)
          })
      } else {
        console.log('Token undefined')
      }
    } else {
      this.$cookies.remove('token')
    }
  },
  methods: {
    async login() {
      this.btnLoading = true
      await this.$store.dispatch('user/login', {
        form: this.form,
        autoLogin: this.autoLogin,
      })
        .then((data) => {
          if (data.user.user_stat === 'member' || data.user.user_stat === 'admin') {
            this.btnLoading = false
            this.$router.push('/homepage')
          } else {
            this.$store.commit('setSnackBarMessage', {
              message: '귀하는 더 이상 회원이 아닙니다.',
              color: 'warning',
              icon: 'mdi-alert-octagon-outline'
            })
            this.btnLoading = false
          }
        })
        .catch(err => {
          this.btnLoading = false
          if (err.response !== undefined) {
            if (err.response.status === 401) {
              this.$store.commit('setSnackBarMessage', {
                message: '휴대전화 번호와 비밀번호를 다시 확인해주세요.',
                color: 'red',
                icon: 'mdi-key-remove'
              })
              this.btnLoading = false
            } else if (err.response.status === 500) {
              this.$store.commit('setSnackBarMessage', {
                message: '서버 유지 보수',
                color: 'red',
                icon: 'mdi-server-off'
              })
              this.btnLoading = false
            } else if (err.response.status === 450) {
              this.$store.commit('setSnackBarMessage', {
                message: '귀하는 더 이상 회원이 아닙니다.',
                color: 'warning',
                icon: 'mdi-alert-octagon-outline'
              })
              this.btnLoading = false
            }
            this.$store.commit('setSnackBarMessage', {
              message: '오류가 발생했습니다',
              color: 'red',
              icon: 'mdi-close-octagon-outline'
            })
            this.btnLoading = false
          }
          if (err.response.status === 401) {
            this.$store.commit('setSnackBarMessage', {
              message: '휴대전화 번호와 비밀번호를 다시 확인해주세요.',
              color: 'red',
              icon: 'mdi-key-remove'
            })
            this.btnLoading = false
          } else if (err.response.status === 500) {
            this.$store.commit('setSnackBarMessage', {
              message: '서버 유지 보수',
              color: 'red',
              icon: 'mdi-server-off'
            })
            this.btnLoading = false
          } else if (err.response.status === 450) {
            this.$store.commit('setSnackBarMessage', {
              message: '귀하는 더 이상 회원이 아닙니다.',
              color: 'warning',
              icon: 'mdi-alert-octagon-outline'
            })
            this.btnLoading = false
          } else {
            this.$store.commit('setSnackBarMessage', {
              message: '네트워크 오류가 발생했습니다.',
              color: 'red',
              icon: 'mdi-earth-remove'
            })
          }
        })
    },
    imageSend() {
      this.$axios.get('/filestores/' + '3ba0c1b9-9aa4-456a-ae03-11771fd59aa3')
        .then((data) => {
          console.log(data)
        }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang='sass' scoped>
@import 'assets/sass/login'
</style>
