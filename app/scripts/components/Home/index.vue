<template src="./home-template.html"> </template>
<style lang="sass?indentedSyntax" src="./home-style.scss"> </style>
<script>
import ArticleComponent from 'components/Article';
import ButtonComponent from 'components/Button';
import { Swipe, SwipeItem } from 'vue-swipe';

export default {
  name: 'home-component',
  data() {
    return {};
  },
  components: {
    ArticleComponent,
    ButtonComponent,
    Swipe,
    SwipeItem
  },
};
</script>
