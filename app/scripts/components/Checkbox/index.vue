<template src="./checkbox-template.html"></template>

<style lang="scss" src="./checkbox-style.scss"></style>

<script>
export default {
  name: 'checkbox-component',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
    };
  },
};
</script>

