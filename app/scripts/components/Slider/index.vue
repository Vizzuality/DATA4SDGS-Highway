<template src="./slider-template.html"> </template>
<style lang="sass?indentedSyntax" src="./slider-style.scss"> </style>
<script>
import { Swipe } from 'vue-swipe';

export default {
  name: 'slider-component',
  props: {
    slides: {
      type: Array,
      required: true
    },
  },
  data() {
    return {};
  },
  components: {
    Swipe
  },
};
</script>
