<template src="./dataset-template.html"> </template>

<style lang="scss" src="./dataset-style.scss"> </style>

<script>
export default{
  name: 'dataset-component',
  props: {
    name: {
      type: String
    },
    source: {
      type: String
    },
    goal: {
      type: Number
    },
    target: {
      type: Number
    },
    large: {
      type: Boolean
    },
  },
  computed: {
  },
  data() {
    return {};
  },
};
</script>
