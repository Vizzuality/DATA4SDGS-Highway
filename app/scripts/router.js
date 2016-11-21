import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from 'components/Home';
import HeaderComponent from 'components/Header';
import FooterComponent from 'components/Footer';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    components: {
      default: Home,
      HeaderComponent,
      FooterComponent,
    },
  },
  {
    path: '/playbook',
    components: {
      HeaderComponent,
      FooterComponent,
    },
  },
  {
    path: '/developer',
    components: {
      HeaderComponent,
      FooterComponent,
    },
  },
  {
    path: '/playground',
    components: {
      HeaderComponent,
      FooterComponent,
    },
  },
  {
    path: '/partnership',
    components: {
      HeaderComponent,
      FooterComponent,
    },
  },
  { path: '*', redirect: '/' },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
