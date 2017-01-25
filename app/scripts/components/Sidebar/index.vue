<template src="./sidebar-template.html"></template>

<style lang="scss" src="./sidebar-style.scss"></style>

<script>
  /*
    TODO: vue-multiselect pointing to beta version, update to stable release when
    Vue 2.0 compatible version is available
  */
  import SpinnerComponent from 'components/Spinner';
  import { mapGetters } from 'vuex';

  export default {
    name: 'sidebar-component',
    mounted() {
      this.$store.dispatch('resetCartoLayerOptions');
      setTimeout(() => {
        this.toggleLayer();
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
        layerLoading: 'getLayerLoading'
      }),
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
      toggleLayer(e) {
        // TODO: delete this component and use OtherVisualization/Legend component
        if (e) {
          const isActive = e.target.parentElement.classList.contains('-active');
          if (isActive) {
            // Google Analytics
            ga('send', 'event', 'Visualisation', 'Turn Layer Off', e.target.name);
          } else {
            // Google Analytics
            ga('send', 'event', 'Visualisation', 'Turn Layer On', e.target.name);
          }
        } else {
          e = { target: this.$refs.protected_areas }; // eslint-disable-line
        }

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
      SpinnerComponent
    },
  };
</script>
