<template src="./playground-template.html"> </template>
<style lang="sass?indentedSyntax" src="./playground-style.scss"> </style>
<script>
import ArticleComponent from 'components/Article';
import HeroComponent from 'components/Hero';

export default{
  name: 'playground-component',
  data() {
    return {};
  },
  components: {
    ArticleComponent,
    HeroComponent
  },
};
</script>
