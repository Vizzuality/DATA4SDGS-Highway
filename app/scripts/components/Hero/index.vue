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
      computedLocation.home = this.$route.path === '/';
      computedLocation.playground = this.$route.path === '/playground';

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
