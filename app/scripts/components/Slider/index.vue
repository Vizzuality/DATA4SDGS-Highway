<template src="./slider-template.html"> </template>
<style lang="scss" src="./slider-style.scss"> </style>
<script>
import Siema from 'siema/dist/siema.min';

export default {
  name: 'slider-component',
  mounted() {
    const siema = new Siema({
      selector: '.c-slider',
      duration: 1000,
      easing: 'ease-out',
      perPage: 1,
      startIndex: 0,
      draggable: true,
      threshold: 20,
      loop: true,
    });

    setInterval(() => siema.next(), 2000);
  },
};
</script>
