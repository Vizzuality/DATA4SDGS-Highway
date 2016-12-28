<template src="./sidebar-template.html"></template>

<style lang="scss" src="./sidebar-style.scss"></style>

<script>
  /*
    TODO: vue-multiselect pointing to beta version, update to stable release when
    Vue 2.0 compatible version is available
  */
  import Multiselect from 'vue-multiselect';

  export default {
    name: 'sidebar-component',
    methods: {
      onChange(newSelected) {
        this.$store.dispatch('setSelectedCountry', newSelected);
      },
      customLabel({ properties }) {
        return properties.name;
      }
    },
    components: {
      Multiselect
    },
    computed: {
      selected() {
        return this.$store.state.countries.selected ?
          this.$store.state.countries.selected.properties.name :
          null;
      },
      options() {
        return this.$store.state.countries.list;
      }
    },
  };
</script>
