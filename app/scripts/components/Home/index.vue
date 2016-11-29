<template src="./home-template.html"> </template>
<style lang="scss" src="./home-style.scss"> </style>
<script>
import router from 'router';
import ArticleComponent from 'components/Article';
import ButtonComponent from 'components/Button';
import SwiperComponent from 'components/Swiper';
import { SwipeItem } from 'vue-swipe';
import IconComponent from 'components/Icon';

export default {
  name: 'home-component',
  data() {
    return {
      twitterSlides: [{
        id: 0,
        message: '“Awesome & timely, particularly given this morning\'s #datarevolution discussion. #TechWomenAfrica”',
        user: 'Datasc'
      },
      {
        id: 1,
        message: '“Awesome & timely, particularly given this morning\'s #datarevolution discussion. #TechWomenAfrica”',
        user: 'Datasc'
      },
      {
        id: 2,
        message: '“Awesome & timely, particularly given this morning\'s #datarevolution discussion. #TechWomenAfrica”',
        user: 'Datasc'
      }],
    };
  },
  methods: {
    goToPlayground: () => {
      router.push('/playground');
    },
  },
  components: {
    ArticleComponent,
    ButtonComponent,
    SwiperComponent,
    SwipeItem,
    IconComponent,
    router,
  },
};
</script>
