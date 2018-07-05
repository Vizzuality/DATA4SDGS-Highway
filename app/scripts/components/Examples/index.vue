<template src="./examples-template.html"> </template>

<style lang="scss" src="./examples-style.scss"> </style>

<script>
import router from 'router';
import examples from '../../../data/examples.json';

export default {
  name: 'examples-component',
  data() {
    return { examples };
  },
  components: {
    router,
  },
};
</script>
