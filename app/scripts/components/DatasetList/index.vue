<template src="./dataset-list-template.html"> </template>

<style lang="scss" src="./dataset-list-style.scss"> </style>

<script>
import Vue from 'vue';
import DatasetComponent from 'components/Dataset';
import VuePaginate from 'vue-paginate';

Vue.use(VuePaginate);

export default{
  name: 'dataset-list-component',
  props: {
    datasets: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      paginate: ['datasets']
    };
  },
  components: {
    DatasetComponent,
  },
};
</script>
