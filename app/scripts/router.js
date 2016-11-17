import Vue from 'vue';
import VueRouter from 'vue-router';

import Hello from 'components/Hello';
import Header from 'components/Header';
import Footer from 'components/Footer';

Vue.use(VueRouter);

const routes = [
  { path: '/',
    components: {
      default: Hello,
      Header,
      Footer,
    }
  },
  { path: '*', redirect: '/' },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
