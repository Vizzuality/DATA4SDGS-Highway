import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeComponent from 'components/Home';
import PlaygroundDetailComponent from 'components/PlaygroundDetail';
import PlaygroundComponent from 'components/Playground';
import PartnerComponent from 'components/PartnerApis';
import HeaderComponent from 'components/Header';
import FooterComponent from 'components/Footer';
import HeroComponent from 'components/Hero';
import TokenPage from 'components/Token';
import ExamplesComponent from 'components/Examples';
import ExamplesDetailComponent from 'components/ExamplesDetail';
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
  },
  {
    path: '/data-sets/:dataset',
    components: {
      default: PlaygroundDetailComponent,
      HeaderComponent,
      FooterComponent
    }
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
    path: '/partner-apis',
    components: {
      default: PartnerComponent,
      HeroComponent,
      HeaderComponent,
      FooterComponent,
    },
  },

  {
    path: '/partner-apis',
    components: {
      default: PartnerComponent,
      HeroComponent,
      HeaderComponent,
      FooterComponent,
    },
  },

  {
    path: '/examples',
    components: {
      default: ExamplesComponent,
      HeroComponent,
      HeaderComponent,
      FooterComponent,
    }
  },

  {
    path: '/examples/:id',
    components: {
      default: ExamplesDetailComponent,
      HeaderComponent,
      FooterComponent,
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
    const toDataset = to.params.dataset;
    const fromDataset = from.params.dataset;
    if ((toDataset || fromDataset) && toDataset === fromDataset) return savedPosition;
    return { x: 0, y: 0 };
  },
});
