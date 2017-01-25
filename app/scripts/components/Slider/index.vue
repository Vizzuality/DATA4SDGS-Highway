<template src="./slider-template.html"> </template>
<style lang="scss" src="./slider-style.scss"> </style>
<script>
import Siema from 'siema/dist/siema.min';

export default {
  name: 'slider-component',
  mounted() {
    this.renderSiema();
  },
  updated() {
    this.$nextTick().then(() => {
      this.siema.destroy();
      this.renderSiema();
    });
  },
  props: {
    options: {
      type: Object,
    },
  },
  data() {
    return {
      siema: null,
    };
  },
  methods: {
    renderSiema() {
      const defaults = {
        selector: this.$refs.slider,
        duration: 160,
        easing: 'ease-out',
        perPage: 1,
        startIndex: 0,
        draggable: true,
        threshold: 20,
        loop: true,
      };
      const config = Object.assign(defaults, this.options);
      const pause = 5000;
      this.siema = new Siema(config);

      clearInterval(this.interval);
      this.interval = setInterval(
        () => requestAnimationFrame(this.siema.next.bind(this.siema)
      ), pause);
    },
  },
};
</script>
