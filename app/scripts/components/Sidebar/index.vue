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
    mounted() {
      setTimeout(() => {
        const e = {
          target: this.$refs.protected
        };
        this.toggleLayer(e);
      }, 0);
    },
    data() {
      return {
        isOpen: true,
      };
    },
    computed: {
      ...mapGetters({
        cartoLayerSpecs: 'getCartoLayerSpecs',
        layerLoading: 'getLayerLoading',
        selected: 'getSelectedCountryName',
        options: 'getCountriesForSelect',
      }),
      countries() {
        return this.$store.state.countries.list;
      },
      contentOpen() {
        const isOpen = this.isOpen ? ' -active' : '';
        return `sidebar-content${isOpen}`;
      },
      arrowOpen() {
        const isOpen = this.isOpen ? ' -active' : '';
        return `arrow-down${isOpen}`;
      },
    },
    methods: {
      onChange(selectedCountry) {
        /*
          NOTE: Matching by country name is not consistent,
          but multiselect does not allow a custom search function
        */
        this.$store.dispatch('setSelectedCountry', this.countries.find(country => country.properties.name === selectedCountry));
      },
      toggleLayer(e) {
        const slugStore = this.cartoLayerSpecs.slug;
        const addLayerStore = this.cartoLayerSpecs.addLayer;
        const addLayer = !slugStore || e.target.name !== slugStore ||
          (e.target.name === slugStore && !addLayerStore);

        e.target.parentElement.classList.toggle('-active');
        this.$store.dispatch('setCartoLayerSlug', { slug: e.target.name, addLayer });
      },
      showLayerLegend(e) {
        const layer = e.target === this.$refs.protectedAreas ?
          e.target : e.target.parentElement;

        layer.classList.toggle('-active');
        layer.parentElement.classList.toggle('-active');
      },
      openSidebar() {
        this.isOpen = !this.isOpen;
      },
    },
    components: {
      Multiselect,
      SpinnerComponent,
    },
  };
</script>
