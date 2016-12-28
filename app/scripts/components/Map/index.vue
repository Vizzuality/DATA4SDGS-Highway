<template src="./map-template.html"></template>
<style lang="scss" src="./map-style.scss"></style>

<script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import { mapGetters } from 'vuex';

  export default {
    name: 'map-component',
    mounted() {
      this.renderMap();
    },
    data() {
      return {
        defaults: {
          center: [0, 0],
          scrollWheelZoom: false,
          basemap: null,
          attributionControl: false,
          zoom: 3
        },
        basemapUrl: 'http://stamen-tiles-{s}.a.ssl.fastly.net/toner-background/{z}/{x}/{y}.png',
      };
    },
    computed: {
      ...mapGetters({
        cartoLayerId: 'getCartoLayerIdData',
      }),
    },
    methods: {
      renderMap() {
        this.createMap();
        this.addBasemap();
      },

      createMap() {
        this.map = L.map('map', this.defaults);
      },

      addBasemap() {
        if (this.map && this.map instanceof L.Map) {
          this.basemap = L.tileLayer(this.basemapUrl);
          this.basemap.addTo(this.map);
          this.addAllLayers();
        }
      },

      addAllLayers() {
        this.$store.dispatch('cartoLayer');
      },

      addCartoLayer() {
        const layers = this.createLayer(this.cartoLayerId);
        this.addLayer(layers.layer);
      },

      addTorqueLayer() {
        this.addLayer();
      },

      addLayer(layer) {
        if (this.map && this.map instanceof L.Map) {
          this.map.addLayer(layer);
        }
      },

      createLayer(layerId) {
        const tileUrl = `https://wri-01.cartodb.com/api/v1/map/${layerId}/0/{z}/{x}/{y}`;
        const pngUrl = `${tileUrl}.png`;
        // const utfUrl = `${tileUrl}.grid.json?callback={cb}`;

        return {
          layer: new L.tileLayer(pngUrl)
          // utfGrid: new L.UtfGrid(utfUrl)
        };
      }

      // removeLayer: function(layer) {
      //   if (this.map && this.map instanceof L.Map) {
      //     this.map.removeLayer(layer);
      //   }
      // },
    },

    watch: {
      cartoLayerId() {
        this.addCartoLayer();
      },
    },
  };
</script>
