import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeComponent from 'components/Home';
import PlaygroundComponent from 'components/Playground';
import HeaderComponent from 'components/Header';
import FooterComponent from 'components/Footer';
import HeroComponent from 'components/Hero';
import TokenPage from 'components/Token';
import VisualizationComponent from 'components/Visualization';
import OtherVisualizationPage from 'components/OtherVisualization/Page';
import LandingPage from 'components/Landing/Page';
import LandingFooter from 'components/Landing/Footer';

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
    path: '/data-sets',
    components: {
      default: PlaygroundComponent,
      HeroComponent,
      HeaderComponent,
      FooterComponent,
    },
    children: [
      {
        path: ':dataset',
        components: {
          default: PlaygroundComponent,
        },
      },
    ],
  },
  {
    path: '/token',
    components: {
      default: TokenPage,
      HeroComponent,
      HeaderComponent,
      FooterComponent,
    },
  },

  {
    path: '/examples',
    redirect: '/examples/conflicts-related-to-protected-areas'
  },

  {
    path: '/examples/conflicts-related-to-protected-areas',
    components: {
      default: VisualizationComponent,
      HeaderComponent,
    },
  },

  {
    path: '/examples/regions-with-greatest-water-risks',
    components: {
      default: OtherVisualizationPage,
      HeaderComponent,
    },
  },
  {
    path: '/about',
    components: {
      default: LandingPage,
      HeaderComponent,
      FooterComponent: LandingFooter
    },
  },

  {
    path: '*',
    redirect: '/'
  }
];

export default new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.params.dataset || from.params.dataset) return savedPosition;
    return { x: 0, y: 0 };
  },
});
