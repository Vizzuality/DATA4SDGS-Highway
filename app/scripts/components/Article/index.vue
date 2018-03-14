<template src="./article-template.html"> </template>
<style lang="scss" src="./article-style.scss"> </style>
<script>
export default{
  name: 'article-component',
  props: {
    gridRow: {
      type: [String, Boolean],
      default: 'row',
    },
    gridColumn: {
      type: [String, Boolean],
      default: 'columns small-12 medium-10 medium-offset-1',
    },
  },
  data() {
    return {};
  },
};
</script>
