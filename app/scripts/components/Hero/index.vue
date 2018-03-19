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
      let location = this.$route.path;
      let params = [...Object.values(this.$route.params)];

      params = params.join('/');
      params = params && `/${params}`;
      location = params ? location.split(params)[0] : location;

      computedLocation.home = location === '/';
      computedLocation.playground = location === '/data-sets';
      computedLocation.token = location === '/token';
      computedLocation.partners = location === '/partner-apis';

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
