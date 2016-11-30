<template src="./hero-template.html"> </template>
<style lang="scss" src="./hero-style.scss"> </style>
<script>
import ButtonComponent from 'components/Button';
import SearchComponent from 'components/Search';

export default {
  name: 'hero-component',
  data() {
    return {};
  },
  components: {
    ButtonComponent,
    SearchComponent
  },
  computed: {
    styles() {
      let classes = 'c-hero';
      if (this.location.home) {
        classes += ' -home';
      }
      return classes;
    },
    location() {
      const computedLocation = {};
      if (this.$route.path === '/') {
        computedLocation.home = true;
      }
      return computedLocation;
    },
  },
  methods: {
    goToFindOutMore() {
      return false;
    },
  },
};
</script>
