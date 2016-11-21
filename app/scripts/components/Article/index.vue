<template src="./article-template.html"> </template>
<style lang="sass?indentedSyntax" src="./article-style.scss"> </style>
<script>
export default{
  name: 'article-component',
  props: {
    split: Boolean
  },
  data() {
    return {};
  },
  computed: {
    classObject: function hasSplitClass() {
      return {
        '-split': this.split
      };
    },
  },
};
</script>
