import 'styles/lib/foundation.css';
import 'styles/index.scss';

import { sync } from 'vuex-router-sync';

import Vue from 'vue';
import App from './App';

import store from './store';
import router from './router';

sync(store, router);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store,
  router,
});
