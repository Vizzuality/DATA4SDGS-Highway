<template src="./spinner-template.html"> </template>

<style lang="scss" src="./spinner-style.scss"> </style>

<script>
export default{
  name: 'spinner-component',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
