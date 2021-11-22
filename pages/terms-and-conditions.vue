<template>
  <div class='terms-conditions'>
    <AppBar backPress :onBackPressed='onBackPressed'>
      <b>이용 약관 동의</b>
    </AppBar>
    <div class='checkboxes'>
      <div class='box'>
        <v-checkbox
          v-model='aggreeAll'
          @change='aggreeAllCheck'
          class='ma-0 pa-0 item'
          label='서비스 이용 약관에 동의합니다.'
          hide-details
        ></v-checkbox>
        <div class='item d-flex flex-row justify-space-between'>
          <v-checkbox
            v-model='aggrement1'
            class='ma-0 pa-0'
            label='서비스 이용 약관에 동의합니다.'
            hide-details
            @change='checkAggreement'
          ></v-checkbox>
          <NuxtLink to=''>자세히</NuxtLink>
        </div>
        <div class='item d-flex flex-row justify-space-between'>
          <v-checkbox
            v-model='aggrement2'
            class='ma-0 pa-0'
            label='개인정보 수집 및 이용에 동의합니다.'
            hide-details
            @change='checkAggreement'
          ></v-checkbox>
          <NuxtLink to=''>자세히</NuxtLink>
        </div>
        <div class='item d-flex flex-row justify-space-between'>
          <v-checkbox
            v-model='aggrement3'
            class='ma-0 pa-0'
            label='위치기반 서비스 이용약관에 동의합니다.'
            hide-details
            @change='checkAggreement'
          ></v-checkbox>
          <NuxtLink to=''>자세히</NuxtLink>
        </div>
        <div class='item d-flex flex-row justify-space-between'>
          <v-checkbox
            v-model='aggrement4'
            class='ma-0 pa-0'
            label='마케팅 정보 수신에 동의합니다. (선택)'
            hide-details
            @change='checkAggreement'
          ></v-checkbox>
          <NuxtLink to=''>자세히</NuxtLink>
        </div>
        <v-checkbox
          v-model='aggrementAge'
          class='ma-0 pa-0 item'
          label='만 14세 이상입니다.'
          hide-details
          @change='checkAggreement'
        ></v-checkbox>
      </div>
    </div>
    <div class='bottom-button'>
      <v-btn class='button' type='submit' depressed v-if="aggreeAll == true" @click='submiting'>동의</v-btn>
      <v-btn class='button' type='submit' depressed v-else-if="aggrement1 == true && aggrement2 == true && aggrement3 == true && aggrement4 == false && aggrementAge == true" @click='submiting'>동의</v-btn>
      <v-btn class='button' type='submit' depressed v-else disabled @click='submiting'>동의</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TermsAndConditions',
  layout: 'noauth',
  data(){
    return{
      aggreeAll: false,
      aggrement1: false,
      aggrement2: false,
      aggrement3: false,
      aggrement4: false,
      aggrementAge: false
    }
  },
  methods:{
    onBackPressed() {
      this.$router.push('/login')
    },
    checkAggreement(){
      if(
        this.aggrement1 &&
        this.aggrement2 &&
        this.aggrement3 &&
        this.aggrement4 &&
        this.aggrementAge
      ) {
        this.aggreeAll = true
      } else {
        this.aggreeAll = false
      }
    },
    aggreeAllCheck(){
      this.aggrement1 = this.aggreeAll
      this.aggrement2 = this.aggreeAll
      this.aggrement3 = this.aggreeAll
      this.aggrement4 = this.aggreeAll
      this.aggrementAge = this.aggreeAll
    },
    submiting(){
      this.$cookies.set('term-aggreement', true, {path:'/', maxAge: 60 * 60});
      if(this.$cookies.get('term-aggreement'))
        this.$router.push('/signup')
    }
  }
}
</script>

<style lang='sass' scoped>
@import 'assets/sass/terms-and-conditions'
</style>
