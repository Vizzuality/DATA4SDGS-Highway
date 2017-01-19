<template src="./footer-template.html"></template>

<style lang="scss" src="./footer-style.scss"></style>

<script>
import IconComponent from 'components/Icon';
import PartnersCarousel from 'components/PartnersCarousel';

export default {
  name: 'footer-component',
  data() {
    return {
      msg: 'Footer',
    };
  },
  components: {
    IconComponent,
    PartnersCarousel
  }
};
</script>
