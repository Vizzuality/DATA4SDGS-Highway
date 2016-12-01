import 'styles/lib/foundation.css';
import 'vue-swipe/dist/vue-swipe.css';
import 'styles/index.scss';

import Vue from 'vue';
import App from './App';
import store from './store';
import router from './router';


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store,
  router,
});
