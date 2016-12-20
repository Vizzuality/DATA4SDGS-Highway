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
    },
    children: [
      { path: ':dataset', component: HeroComponent },
    ]
  },

  { path: '*', redirect: '/' },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
