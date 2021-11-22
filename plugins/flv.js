import Vue from 'vue'
import flvjs from 'flv.js'

export default ({_app}, inject) => {
  inject('flv', Vue.observable(flvjs))
}
