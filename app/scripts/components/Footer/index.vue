<template src="./footer-template.html"></template>

<style lang="scss" src="./footer-style.scss"></style>

<script>
import IconComponent from 'components/Icon';

export default {
  name: 'footer-component',
  data() {
    return {
      msg: 'Footer',
    };
  },
  components: {
    IconComponent
  }
};
</script>
