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
import VModal from 'vue-js-modal'
import Vuelidate from 'vuelidate'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTrashAlt)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuelidate)
Vue.use(VModal)

Vue.component('multiselect', Multiselect)
Vue.component('datetime', Datetime);

Vue.config.productionTip = false;

Vue.filter('formatDateTime', function (value) {
  if (value) {
    return moment(String(value)).format('D MMMM YYYY - HH:mm')
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



