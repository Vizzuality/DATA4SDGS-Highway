<template src="./table-template.html"> </template>

<style lang="scss" src="./table-style.scss"> </style>

<script>
import IconComponent from 'components/Icon';

export default {
  name: 'table-component',
  props: {
    data: {
      type: Array,
      required: true
    },
    cols: {
      type: Array,
      required: true
    },
  },
  components: {
    IconComponent,
  },
};
</script>
