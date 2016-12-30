<template src="./sidebar-template.html"></template>

<style lang="scss" src="./sidebar-style.scss"></style>

<script>
  /*
    TODO: vue-multiselect pointing to beta version, update to stable release when
    Vue 2.0 compatible version is available
  */
  import Multiselect from 'vue-multiselect';
  import SpinnerComponent from 'components/Spinner';
  import { mapGetters } from 'vuex';

  export default {
    name: 'sidebar-component',
    computed: {
      selected() {
        return this.$store.getters.getSelectedCountryName;
      },
      options() {
        return this.$store.getters.getCountriesForSelect;
      },
      ...mapGetters({
        cartoLayerSlug: 'getCartoLayerSlug',
        layerLoading: 'getLayerLoading',
      }),
    },
    methods: {
      onChange(selectedCountry) {
        /*
          NOTE: Matching by country name is not consistent,
          but multiselect does not allow a custom search function
        */
        this.$store.dispatch('setSelectedCountry', this.$store.state.countries.list.find(country => country.properties.name === selectedCountry));
      },
      toggleLayer(e) {
        const slugStore = this.$store.getters.getCartoLayerSpecs.slug;
        const addLayerStore = this.$store.getters.getCartoLayerSpecs.addLayer;
        const addLayer = !slugStore || e.target.name !== slugStore ||
          (e.target.name === slugStore && !addLayerStore);

        e.target.nextElementSibling.classList.toggle('-right');
        this.$store.dispatch('setCartoLayerSlug', { slug: e.target.name, addLayer });
      },
    },
    components: {
      Multiselect,
      SpinnerComponent,
    },
  };
</script>
