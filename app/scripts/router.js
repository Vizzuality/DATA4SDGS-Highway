import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeComponent from 'components/Home';
import HeaderComponent from 'components/Header';
import FooterComponent from 'components/Footer';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    components: {
      default: HomeComponent,
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
  { path: '*', redirect: '/' },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
