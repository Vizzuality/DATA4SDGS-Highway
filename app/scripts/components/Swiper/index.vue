<template src="./swiper-template.html"> </template>
<style lang="scss" src="./swiper-style.scss"> </style>
<script>
import { Swipe } from 'vue-swipe';

export default {
  name: 'swiper-component',
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
