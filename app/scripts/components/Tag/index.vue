
<template src="./tag-template.html"> </template>

<style lang="scss" src="./tag-style.scss"> </style>

<script>
export default{
  name: 'tag-component',
  props: {
    filled: {
      type: Boolean,
      required: false
    }
  }
};
</script>
