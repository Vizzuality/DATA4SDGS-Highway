<template src="./playground-template.html"> </template>
<style lang="sass?indentedSyntax" src="./playground-style.scss"> </style>
<script>
import ArticleComponent from 'components/Article';

export default{
  name: 'playground-component',
  data() {
    return {};
  },
  components: {
    ArticleComponent,
  },
};
</script>
