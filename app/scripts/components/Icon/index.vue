<template src="./icon-template.html"> </template>

<style lang="scss" src="./icon-style.scss"> </style>

<script>
export default{
  name: 'icon-component',
  props: {
    name: {
      type: String,
      required: true
    }
  },
  computed: {
    selector() {
      return `#${this.name}`;
    }
  },
  data() {
    return {};
  },
};
</script>
