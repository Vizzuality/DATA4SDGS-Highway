<template src="./article-template.html"> </template>
<style lang="scss" src="./article-style.scss"> </style>
<script>
export default{
  name: 'article-component',
  props: {
    gridRow: {
      type: [String, Array],
      default: 'row align-center',
    },
    gridColumn: {
      type: [String, Array],
      default: 'columns small-12 medium-10',
    },
  },
  data() {
    return {};
  },
};
</script>
