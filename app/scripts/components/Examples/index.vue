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
  methods: {
    goToDetail(id) {
      // Google Analytics
      // ga('send', 'event', 'Example', 'Click Start', 'Click');
      // this.$router.push(`/examples/${id}`);
      console.log(id, 'EEEEE');
    },
  },
  components: {
    router,
  },
};
</script>
