<template src="./spinner-template.html"> </template>

<style lang="scss" src="./spinner-style.scss"> </style>

<script>
import IconComponent from 'components/Icon';

export default{
  name: 'spinner-component',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    overlay: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    IconComponent,
  },
};
</script>
