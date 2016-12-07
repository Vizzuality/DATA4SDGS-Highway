<template src="./dataset-list-template.html"> </template>

<style lang="scss" src="./dataset-list-style.scss"> </style>

<script>
import DatasetComponent from 'components/Dataset';

export default{
  name: 'dataset-list-component',
  props: {
    datasets: {
      type: Array
    },
  },
  methods: {
    getSource(index) {
      return this.datasets[index].metadata.attributes ?
      this.datasets[index].metadata.attributes.source : null;
    },
  },
  data() {
    return {
    };
  },
  components: {
    DatasetComponent,
  },
};
</script>
