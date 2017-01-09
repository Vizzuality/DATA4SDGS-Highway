<template src="./country-template.html"> </template>

<style lang="scss" src="./country-style.scss"> </style>

<script>
import ArticleComponent from 'components/Article';

export default{
  name: 'country-component',
  data() {
    return {
      name: this.$route.params.country
    };
  },
  components: {
    ArticleComponent,
  },
};
</script>
