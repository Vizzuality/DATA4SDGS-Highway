<template src="./home-template.html"> </template>

<style lang="scss" src="./home-style.scss"> </style>

<script>
import router from 'router';
import ArticleComponent from 'components/Article';
import ButtonComponent from 'components/Button';
import IconComponent from 'components/Icon';
import SliderComponent from 'components/Slider';

export default {
  name: 'home-component',
  data() {
    return {
      twitterSlides: [{
        message: '“Awesome & timely, particularly given this morning\'s #datarevolution discussion. #TechWomenAfrica”',
        user: 'Datasc'
      },
      {
        message: '“Awesome & timely, particularly given this morning\'s #datarevolution discussion. #TechWomenAfrica”',
        user: 'Datasc'
      },
      {
        message: '“Awesome & timely, particularly given this morning\'s #datarevolution discussion. #TechWomenAfrica”',
        user: 'Datasc'
      }],
    };
  },
  methods: {
    goToPlayground() {
      router.push('/playground');
    },
  },
  components: {
    ArticleComponent,
    ButtonComponent,
    IconComponent,
    SliderComponent,
    router,
  },
};
</script>
