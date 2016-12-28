import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeComponent from 'components/Home';
import PlaygroundComponent from 'components/Playground';
import HeaderComponent from 'components/Header';
import FooterComponent from 'components/Footer';
import HeroComponent from 'components/Hero';
import Map from 'components/Map';

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

  {
    path: '/map',
    components: {
      default: Map
    }
  },

  { path: '*', redirect: '/' },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
