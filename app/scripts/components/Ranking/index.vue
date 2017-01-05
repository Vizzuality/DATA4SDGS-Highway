<template src="./ranking-template.html"> </template>

<style lang="scss" src="./ranking-style.scss"> </style>

<script>
import ChartComponent from 'components/Chart';

export default{
  name: 'ranking-component',
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  components: {
    ChartComponent,
  },
};
</script>
