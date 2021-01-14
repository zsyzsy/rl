import Vue from 'vue'

Vue.prototype.$goBack = function() {
  window.history.back()
}
