<template src="./home-template.html"> </template>
<style lang="sass?indentedSyntax" src="./home-style.scss"> </style>
<script>
import ArticleComponent from 'components/Article';
import ButtonComponent from 'components/Button';

export default {
  name: 'home',
  data() {
    return {
    };
  },
  components: {
    ArticleComponent,
    ButtonComponent
  }
};
</script>
