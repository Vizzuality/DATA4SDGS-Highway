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
  methods: {
    getTabClass(path) {
      let location = this.$route.path;
      let params = [...Object.values(this.$route.params)];

      params = params.join('/');
      params = params && `/${params}`;
      location = params ? location.split(params)[0] : location;

      return location === path ? 'header-tab -active' : 'header-tab';
    },
  },
};
</script>
