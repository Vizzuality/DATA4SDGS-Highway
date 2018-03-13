<template src="./map-template.html"></template>
<style lang="scss" src="./map-style.scss"></style>

<script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import { mapGetters } from 'vuex';
  import BubbleClusterLayer from 'services/layers/BubbleClusterLayer';
  import Grid from 'lib/leafletUtfgrid/leaflet-utfgrid';

  L.Grid = Grid;

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
        basemapUrl: 'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      };
    },
    computed: {
      ...mapGetters({
        cartoLayerId: 'getCartoLayerIdData',
        cartoLayerSpecs: 'getCartoLayerSpecs',
        clusterLayer: 'getClusterLayer',
      }),
      slug() {
        return this.cartoLayerSpecs.slug;
      },
    },
    methods: {
      renderMap() {
        this.cartoLayers = {};

        this.createMap();
        this.addBasemap();
        this.addAllLayers();
      },

      createMap() {
        this.map = L.map('map', this.defaults);
      },

      addBasemap() {
        if (this.map && this.map instanceof L.Map) {
          this.basemap = L.tileLayer(this.basemapUrl);
          this.basemap.addTo(this.map);
        }
      },

      addAllLayers() {
        // this.$store.dispatch('setCartoLayer');
        this.addClusterLayer();
      },

      addCartoLayer() {
        this.createLayer(this.cartoLayerId);
        this.addLayer(this.cartoLayers[this.slug].layer);
        // this.addLayer(this.cartoLayers[this.slug].utfGrid, {
        //  resolution: 2
        // });

        this.setCartoLayerTooltip(this.cartoLayers[this.slug].utfGrid);
        this.$store.dispatch('resetCartoLayerId');
      },

      addLayer(layer) {
        if (this.map && this.map instanceof L.Map) {
          this.map.addLayer(layer);
        }
      },

      addClusterLayer() {
        this.$store.dispatch('setMarkerLayer').then(() => this.$store.dispatch('setClusterLayer')).then(() => {
          new BubbleClusterLayer(this.clusterLayer, {}).addTo(this.map);
        });
      },

      createLayer(layerId) {
        const tileUrl = `https://wri-01.cartodb.com/api/v1/map/${layerId}/0/{z}/{x}/{y}`;
        const pngUrl = `${tileUrl}.png`;
        const utfUrl = `${tileUrl}.grid.json?callback={cb}`;

        this.cartoLayers[this.slug] = {
          layer: new L.tileLayer(pngUrl),
          utfGrid: new L.UtfGrid(utfUrl)
        };
      },

      setCartoLayerTooltip(utfGrid) {
        utfGrid.addEventListener('click', (data) => {
          data && data.data && L.popup()
            .setLatLng(data.latlng || data.latLng)
            .setContent(`<div><h3>${data.data.iucn_cat}</h3></div>`)
            .openOn(this.map);
        });
      },

      removeLayer(layer) {
        if (this.map && this.map instanceof L.Map) {
          this.map.removeLayer(layer);
        }
      },

      removeCurrentCartoLayer() {
        if (this.cartoLayers[this.slug]) {
          this.removeLayer(this.cartoLayers[this.slug].layer);
          // this.removeLayer(this.cartoLayers[this.slug].utfGrid);

          const layers = {};
          Object.keys(this.cartoLayers).forEach((item) => {
            if (item !== this.slug) layers[item] = this.cartoLayers[item];
          });
          this.cartoLayers = layers;
        }
      },
    },

    watch: {
      cartoLayerId() {
        if (this.cartoLayerId) {
          this.addCartoLayer();
        }
      },
      cartoLayerSpecs() {
        const addLayer = this.cartoLayerSpecs.addLayer;

        if (addLayer && !this.cartoLayers[this.slug]) {
          this.$store.dispatch('setCartoLayer');
        } else {
          this.removeCurrentCartoLayer();
        }
      },
    },
  };

</script>
