<template src="./footer-template.html"></template>

<style lang="sass?indentedSyntax" src="./footer-style.scss"></style>

<script>
import logoGlobalSDD from 'static/logos/global_partnership_sdg.jpg';
import logoVizz from 'static/logos/vizzuality.jpg';

export default {
  name: 'footer-component',
  data() {
    return {
      logoGlobalSDD,
      logoVizz,
      msg: 'Footer',
    };
  },
};
</script>
