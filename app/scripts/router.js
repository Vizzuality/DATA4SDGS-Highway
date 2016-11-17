import Vue from 'vue';
import VueRouter from 'vue-router';

import Homepage from 'components/Homepage';
import Header from 'components/Header';
import Footer from 'components/Footer';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    components: {
      default: Homepage,
      Header,
      Footer,
    },
  },
  {
    path: '/playbook',
    components: {
      Header,
      Footer,
    },
  },
  {
    path: '/developer',
    components: {
      Header,
      Footer,
    },
  },
  {
    path: '/playground',
    components: {
      Header,
      Footer,
    },
  },
  {
    path: '/partnership',
    components: {
      Header,
      Footer,
    },
  },
  { path: '*', redirect: '/' },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
