<template src="./dataset-template.html"> </template>

<style lang="scss" src="./dataset-style.scss"> </style>

<script>
export default{
  name: 'dataset-component',
  props: {
  },
  computed: {
  },
  data() {
    return {
      name: 'Worldbank agriculture',
      source: ' WRI',
      goal: 1,
      target: 3,
    };
  },
};
</script>
