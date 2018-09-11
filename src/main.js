// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store'
import Multiselect from 'vue-multiselect'
import moment from 'moment'
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'

Vue.component('multiselect', Multiselect)
Vue.component('datetime', Datetime);

Vue.config.productionTip = false;

Vue.filter('formatDateTime', function (value) {
  if (value) {
    return moment(String(value)).format('D MMMM YYYY - hh:mm')
  }
})

Vue.filter('laterThanToday', function (value) {
  if (value) {
    return moment(value) > moment()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App, Multiselect, Datetime, moment },
  template: '<App/>'
});



