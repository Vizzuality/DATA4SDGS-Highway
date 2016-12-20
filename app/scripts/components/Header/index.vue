<template src="./header-template.html"></template>

<style lang="scss" src="./header-style.scss"></style>

<script>
import d4sdgLogo from 'static/logos/logo_D4SDG.png';

export default {
  name: 'header-component',
  data() {
    return {
      d4sdgLogo,
    };
  },
  computed: {
    firstTabClass() {
      return this.$route.path === '/' ? 'header-tab -active' : 'header-tab';
    },
    secondTabClass() {
      return this.$route.path === '/playground' ? 'header-tab -active' : 'header-tab';
    },
  },
};
</script>
