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
    styles: function getStyles() {
      let classes = 'c-hero';
      if (this.location.home) {
        classes += ' -home';
      }
      return classes;
    },
    location: function getlocation() {
      const computedLocation = {};
      if (this.$route.path === '/') {
        computedLocation.home = true;
      }
      return computedLocation;
    },
  },
  methods: {
    goToFindOutMore: function goToFindOutMore() {
      return false;
    },
  },
};
</script>
