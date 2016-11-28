<template src="./button-template.html"> </template>
<style lang="sass?indentedSyntax" src="./button-style.scss"> </style>
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
