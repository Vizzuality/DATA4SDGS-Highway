<template src="./footer-template.html"></template>

<style lang="sass?indentedSyntax" src="./footer-style.scss"></style>

<script>
import logoGlobalSDD from 'images/logos/global_partnership_sdg.jpg';
import logoVizz from 'images/logos/vizzuality.jpg';

export default {
  name: 'Footer',
  data() {
    return {
      logoGlobalSDD,
      logoVizz,
      msg: 'Footer',
    };
  },
};
</script>
