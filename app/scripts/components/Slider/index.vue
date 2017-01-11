<template src="./slider-template.html"> </template>
<style lang="scss" src="./slider-style.scss"> </style>
<script>
import Siema from 'siema/dist/siema.min';

export default {
  name: 'slider-component',
  mounted() {
    const pause = 5000;
    const siema = new Siema({
      selector: '.c-slider',
      duration: 160,
      easing: 'ease',
      perPage: 1,
      startIndex: 0,
      draggable: true,
      threshold: 20,
      loop: true,
    });

    setInterval(() => requestAnimationFrame(siema.next.bind(siema)), pause);
  },
};
</script>
