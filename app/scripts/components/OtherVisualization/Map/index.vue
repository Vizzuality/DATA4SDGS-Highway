<template src="./map-template.html"></template>
<style lang="scss" src="./map-style.scss"></style>

<script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import { mapGetters } from 'vuex';
  import LayerManager from '../../../utils/LayerManager';
  import LegendComponent from '../Legend';
  // import southAfrica from '../../../../data/south-africa-geom.json';

  export default {
    name: 'other-map',

    // Component lyfecycle
    created() {
      this.$store.dispatch('getWaterRiskLayers');
    },

    mounted() {
      this.renderMap();
      this.layerManager = new LayerManager(this.map);
    },

    // Data
    data() {
      return {
        // Map intial config
        defaults: {
          center: [0, 0],
          scrollWheelZoom: false,
          basemap: null,
          attributionControl: false,
          zoom: 3
        },
        basemapUrl: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png',
      };
    },

    // Methods
    methods: {
      // Instances and renders a Leaflet map
      renderMap() {
        this.cartoLayers = {};
        this.map = L.map('map', this.defaults);
        // this.map.fitBounds(southAfrica.geometry);
        L.tileLayer(this.basemapUrl).addTo(this.map);
      }
    },

    // Computed
    computed: {
      ...mapGetters({
        activeLayers: 'getActiveLayers'
      })
    },

    // Watchers
    watch: {
      // Displays active layers on map
      activeLayers(layers, oldActiveLayers) {
        layers.forEach((layer) => {
          if (!oldActiveLayers.find(l => l.id === layer.id)) {
            this.layerManager.addLayer(layer);
          }
        });
        oldActiveLayers.forEach((layer) => {
          if (!layers.find(l => l.id === layer.id)) {
            this.layerManager.removeLayer(layer.id);
          }
        });
      }
    },

    // Components
    components: {
      LegendComponent
    }
  };

</script>
