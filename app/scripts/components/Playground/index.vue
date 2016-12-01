<template src="./playground-template.html"> </template>
<style lang="scss" src="./playground-style.scss"> </style>
<script>
import ArticleComponent from 'components/Article';
import DatasetComponent from 'components/Dataset';

export default{
  name: 'playground-component',
  data() {
    return {};
  },
  components: {
    ArticleComponent,
    DatasetComponent,
  },
};
</script>
