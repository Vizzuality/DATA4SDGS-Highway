<template src="./button-template.html"> </template>
<style lang="scss" src="./button-style.scss"> </style>
<script>
export default{
  name: 'button-component',
  props: {
    click: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {};
  },
};
</script>
