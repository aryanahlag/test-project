<template>
  <div class='signup'>
    <AppBar backPress>
      <b>정보 입력</b>
    </AppBar>
    <form @submit.prevent='signup'>
      <v-container>
        <v-row class='form'>
          <v-col cols="12">
            <h4 class="label">휴대전화 번호</h4>
            <v-text-field
              filled
              clearable
              @click='scrollTo($event)'
              clear-icon='mdi-close-circle-outline'
              dense
              hide-details='auto'
              required
              type="number"
              class="login-tf"
              placeholder="휴대전화 번호를 입력해 주세요."
              v-model="form.phone"
            />
          </v-col>
          <v-col cols="12" class="pt-0">
            <h4 class="label">비밀번호</h4>
            <v-text-field
              filled
              clearable
              clear-icon='mdi-close-circle-outline'
              dense
              required
              @click='scrollTo($event)'
              hide-details="auto"
              :append-icon="passvisible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passvisible ? 'text': 'password'"
              @click:append='passvisible = !passvisible'
              class="login-tf"
              placeholder="영어(소문자), 숫자, 특수문자 사용 가능"
              v-model="form.password"
            />
          </v-col>
          <v-col cols="12" class="pt-0">
            <h4 class="label">비밀번호 확인</h4>
            <v-text-field
              filled
              clearable
              clear-icon='mdi-close-circle-outline'
              dense
              required
              @click='scrollTo($event)'
              :rules='[rules.confirm_password]'
              hide-details="auto"
              :append-icon="passvisible ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passvisible ? 'text': 'password'"
              @click:append='passvisible = !passvisible'
              class="login-tf"
              placeholder="**********"
              v-model="confirmPassword"
            />
          </v-col>
          <v-col cols="12">
            <h4 class="label">이름</h4>
            <v-text-field
              filled
              clearable
              clear-icon='mdi-close-circle-outline'
              dense
              hide-details='auto'
              required
              @click='scrollTo($event)'
              type="text"
              class="login-tf"
              placeholder="홍길동"
              v-model="form.name"
            />
          </v-col>
          <v-col cols="12">
            <h4 class="label">생년월일</h4>
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="form.birth_date"
                  placeholder="YYYY-MM-DD"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="form.birth_date"
                locale="ko"
                :active-picker.sync="activePicker"
                :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                min="1920-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12">
            <h4 class="label">광역시/도</h4>
            <v-autocomplete
              filled
              clearable
              clear-icon='mdi-close-circle-outline'
              dense
              hide-details='auto'
              required
              id='locationInput'
              @click='scrollTo($event)'
              :items='cities'
              item-text="city_name_kr"
              item-value="city_id"
              class="login-tf"
              placeholder=""
              @change='getDistricts($event)'
            />
          </v-col>
          <v-col cols="12">
            <h4 class="label">시/군/구</h4>
            <v-autocomplete
              filled
              clearable
              clear-icon='mdi-close-circle-outline'
              dense
              hide-details='auto'
              required
              id='locationInput'
              @click='scrollTo($event)'
              :items='districts'
              class="login-tf"
              placeholder=""
              v-model="form.location"
              item-text='districts_name_kr'
              item-value='districts_id'
              :disabled='districts.length===0'
            />
          </v-col>
          <v-col cols="12">
            <h4 class="label">추천인 (소속명 또는 이름)</h4>
            <v-text-field
              filled
              clearable
              clear-icon='mdi-close-circle-outline'
              dense
              hide-details='auto'
              required
              @click='scrollTo($event)'
              type="text"
              class="login-tf"
              placeholder="홍길동"
              v-model="form.recommended_by"
            />
          </v-col>
          <v-col cols='12'>
            <ul>
              <li>본인이 <b>소속한 그룹의 이름</b>을 기재해 주세요.</li>
              <li>예) 민부정책연구원, 케이플랜, 지방분권포럼, 두드림 등</li>
              <li>가입시 <b>추천인의 이름</b>을 꼭 기재하여 주세요.</li>
              <li>추천인이 없을 경우에는, <b>본인의 이름을</b> 기재해 주세요.</li>
              <li>친애하는 기자 분들은 추천인을 <b>“0000기자”라고</b> 기재해 주세요.</li>
            </ul>
          </v-col>
        </v-row>
      </v-container>
      <Snackbar/>
      <div class='bottom-button'>
        <v-btn class='button' type='submit' depressed>동의</v-btn>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  layout: 'noauth',
  data() {
    return {
      form: {},
      activePicker: null,
      menu: false,
      rules: {
        confirm_password: x => x === this.form.password || '비밀번호가 일치하지 않습니다',
      },
      confirmPassword: '',
      passvisible: false,
      cities: [],
      districts: []
    }
  },
  async fetch() {
    await this.$axios.get('addresses/cities')
      .then(({data}) => {
        this.cities = data
      })
      .catch(err => {
        console.log(err)
      })
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.activePicker = 'YEAR'))
    },
  },
  mounted() {
    if (!this.$cookies.get('term-aggreement'))
      this.$router.push('/terms-and-conditions')
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date)
    },
    signup() {
      this.$store.dispatch('user/signUp', this.form)
        .then(_x => {
          this.$cookies.set('newMember', true, {maxAge: 60 * 60})
          this.$router.push('/welcome')
        })
        .catch(err => {
          console.log('err', err.response)
          if (err.response !== undefined) {
            if (err.response == 500) {
              this.$store.commit('setSnackBarMessage', {
                message: '이미 존재하는 휴대전화 번호입니다.',
                color: 'warning',
                icon: 'mdi-alert-octagon-outline'
              })
            }
          }
          if (err.response.status === 500) {
            this.$store.commit('setSnackBarMessage', {
              message: '이미 존재하는 휴대전화 번호입니다.',
              color: 'warning',
              icon: 'mdi-alert-octagon-outline'
            })
          } else {
            this.$store.commit('setSnackBarMessage', {
              message: '오류가 발생하여 계정을 등록할 수 없습니다.',
              color: 'red',
              icon: 'mdi-alert-octagon-outline'
            })
          }
          console.log(err)
        })
    },
    scrollTo(el) {
      el.target.focus()
    },
    async getDistricts(cityId) {
      await this.$axios.get(`addresses/cities/${cityId}/districts`)
        .then(({data}) => {
          this.districts = data
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang='sass' scoped>
@import 'assets/sass/signup'
</style>
