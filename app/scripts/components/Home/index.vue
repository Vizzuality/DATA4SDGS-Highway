<template src="./home-template.html"> </template>
<style lang="sass?indentedSyntax" src="./home-style.scss"> </style>
<script>
import ArticleComponent from 'components/Article';
import ButtonComponent from 'components/Button';
import SliderComponent from 'components/Slider';
import { SwipeItem } from 'vue-swipe';
import IconComponent from 'components/Icon';

export default {
  name: 'home-component',
  data() {
    return {
      twitterSlides: [{
        id: 0,
        message: 'Hola',
        user: 'un_usuario'
      },
      {
        id: 1,
        message: 'Ciao',
        user: 'un_utente'
      },
      {
        id: 1,
        message: 'Hello',
        user: 'a_user'
      }],
    };
  },
  components: {
    ArticleComponent,
    ButtonComponent,
    SliderComponent,
    SwipeItem,
    IconComponent,

  },
};
</script>
