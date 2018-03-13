<template src="./map-template.html"></template>
<style lang="scss" src="./map-style.scss"></style>

<script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import { mapGetters } from 'vuex';
  import LayerManager from '../../../utils/LayerManager';
  import LegendComponent from '../Legend';
  import southAfrica from '../../../../data/south-africa-geom.json';

  export default {
    name: 'other-map',

    // Component lyfecycle
    mounted() {
      this.renderMap();
      this.layerManager = new LayerManager(this.map);
      this.activeLayers.forEach(layer => this.layerManager.addLayer(layer));
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
          zoom: 3,
          minZoom: 5
        },
        basemapUrl: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      };
    },

    // Methods
    methods: {
      // Instances and renders a Leaflet map
      renderMap() {
        this.map = L.map('map', this.defaults);
        this.fitBounds();
        L.tileLayer(this.basemapUrl).addTo(this.map);
      },
      fitBounds() {
        const geojsonLayer = L.geoJson(southAfrica.geometry);
        this.map.fitBounds(geojsonLayer.getBounds(), {
          paddingTopLeft: [600, 100],
          paddingBottomRight: [0, 0]
        });
      },
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
        const setA = new Set(layers);
        const setB = new Set(oldActiveLayers);
        const union = new Set([...layers, ...oldActiveLayers]);

        if (setA.size === setB.size) setB.clear();

        for (const layer of union) {
          if (!setB.has(layer)) {
            this.layerManager.addLayer(layer);
          } else if (!setA.has(layer)) {
            this.layerManager.removeLayer(layer.id);
          }
        }
      }
    },

    // Components
    components: {
      LegendComponent
    }
  };

</script>
