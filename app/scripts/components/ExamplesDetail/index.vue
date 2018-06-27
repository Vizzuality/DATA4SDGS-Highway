<template src="./examples-template.html"> </template>

<style lang="scss" src="./examples-style.scss"> </style>

<script>
import router from 'router';
import examples from '../../../data/examples.json';

export default {
  name: 'examples-detail-component',
  data() {
    const { id } = this.$route.params;
    const example = examples.find(ex => ex.id === id) || {};
    return { example };
  },
  components: {
    router,
  },
};
</script>
