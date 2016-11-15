import Vue from 'vue';
import VueRouter from 'vue-router';

import App from './App';
import store from './store';

import '../styles/lib/foundation.css';
import '../styles/index.scss';

Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  store,
});
