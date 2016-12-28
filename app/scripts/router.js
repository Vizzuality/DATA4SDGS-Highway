import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeComponent from 'components/Home';
import PlaygroundComponent from 'components/Playground';
import HeaderComponent from 'components/Header';
import FooterComponent from 'components/Footer';
import HeroComponent from 'components/Hero';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    components: {
      default: HomeComponent,
      HeroComponent,
      HeaderComponent,
      FooterComponent,
    },
  },
  {
    path: '/playground',
    components: {
      default: PlaygroundComponent,
      HeroComponent,
      HeaderComponent,
      FooterComponent,
    }
  },

  {
    path: '/playground/:dataset',
    components: {
      default: PlaygroundComponent,
      HeroComponent,
      HeaderComponent,
      FooterComponent,
    }
  },

  { path: '*', redirect: '/' },
];

export default new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    return { x: 0, y: 0 };
  },
});
