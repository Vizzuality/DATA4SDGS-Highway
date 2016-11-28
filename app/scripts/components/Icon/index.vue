<template src="./icon-template.html"> </template>
<style lang="sass?indentedSyntax" src="./icon-style.scss"> </style>
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
    selector: function formatSelector() {
      return `#${this.name}`;
    }
  },
  data() {
    return {};
  },
};
</script>
