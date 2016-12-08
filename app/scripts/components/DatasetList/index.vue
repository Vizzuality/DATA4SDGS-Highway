<template src="./dataset-list-template.html"> </template>

<style lang="scss" src="./dataset-list-style.scss"> </style>

<script>
import DatasetComponent from 'components/Dataset';

export default{
  name: 'dataset-list-component',
  props: {
    datasets: {
      type: Array,
      required: true,
    },
  },
  components: {
    DatasetComponent,
  },
};
</script>
