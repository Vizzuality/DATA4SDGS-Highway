import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeComponent from 'components/Home';
import PlaygroundComponent from 'components/Playground';
import HeaderComponent from 'components/Header';
import FooterComponent from 'components/Footer';
import HeroComponent from 'components/Hero';
import VisualizationComponent from 'components/Visualization';
import OtherVisualizationPage from 'components/OtherVisualization/Page';
import CountriesComponent from 'components/Countries';
import CountryComponent from 'components/Country';

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
      {
        path: ':dataset',
        components: {
          default: PlaygroundComponent,
        },
      },
    ],
  },

  {
    path: '/countries',
    components: {
      default: CountriesComponent,
      HeroComponent,
      HeaderComponent,
      FooterComponent,
    },
  },

  {
    path: '/countries/:country',
    components: {
      default: CountryComponent,
      HeroComponent,
      HeaderComponent,
      FooterComponent,
    },
  },

  {
    path: '/examples',
    redirect: '/examples/1'
  },

  {
    path: '/examples/1',
    components: {
      default: VisualizationComponent,
      HeaderComponent,
    },
  },

  {
    path: '/examples/2',
    components: {
      default: OtherVisualizationPage,
      HeaderComponent,
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
    if (savedPosition) return savedPosition;
    return { x: 0, y: 0 };
  },
});
