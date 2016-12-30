<template src="./map-template.html"></template>
<style lang="scss" src="./map-style.scss"></style>

<script>
  import 'leaflet/dist/leaflet.css';
  import L from 'leaflet';
  import { mapGetters } from 'vuex';
  import BubbleClusterLayer from '../../utils/layers/BubbleClusterLayer';
  import Grid from '../../lib/leafletUtfgrid/leaflet-utfgrid';

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
        basemapUrl: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png',
      };
    },
    computed: {
      ...mapGetters({
        cartoLayerId: 'getCartoLayerIdData',
        markerLayer: 'getMarkerLayer',
        cartoLayerSpecs: 'getCartoLayerSpecs',
      }),
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
        this.slug = this.$store.getters.getCartoLayerSpecs.slug;
        // this.$store.dispatch('cartoLayer');
        this.$store.dispatch('markerLayer');
      },

      addCartoLayer() {
        this.createLayer(this.cartoLayerId);
        this.addLayer(this.cartoLayers[this.slug].layer);
        this.addLayer(this.cartoLayers[this.slug].utfGrid, {
          resolution: 2
        });

        this.setCartoLayerTooltip(this.cartoLayers[this.slug].utfGrid);
        this.$store.dispatch('resetCartoLayerId');
      },

      addLayer(layer) {
        if (this.map && this.map instanceof L.Map) {
          this.map.addLayer(layer);
        }
      },

      addClusterLayer() {
        const request = new Request(this.markerLayer.url, {
          method: 'GET'
        });

        fetch(request)
          .then((res) => {
            if (!res.ok) {
              const error = new Error(res.statusText);
              error.response = res;
              throw error;
            }
            return res.json();
          })
          .then((data) => {
            const geojson = data.rows[0].data.features || [];
            new BubbleClusterLayer(
              geojson, {}
            ).addTo(this.map);
          });
          // .catch((err) => {
          //   console.error('Request failed', err);
          // });
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
            .setContent(`<div><h3>${data.data.cartodb_id}</h3></div>`)
            .openOn(this.map);
        });
      },

      removeLayer(layer) {
        if (this.map && this.map instanceof L.Map) {
          this.map.removeLayer(layer);
        }
      },

      removeCurrentCartoLayer() {
        this.removeLayer(this.cartoLayers[this.slug].layer);
        this.removeLayer(this.cartoLayers[this.slug].utfGrid);

        const layers = {};
        Object.keys(this.cartoLayers).map((item) => {
          if (item !== this.slug) layers[item] = this.cartoLayers[item];
          return true;
        });
        this.cartoLayers = layers;
      },
    },

    watch: {
      cartoLayerId() {
        const carloLayerId = this.$store.getters.getCartoLayerIdData;

        if (carloLayerId) {
          this.slug = this.$store.getters.getCartoLayerSpecs.slug;
          this.addCartoLayer();
        }
      },
      markerLayer() {
        this.addClusterLayer();
      },
      cartoLayerSpecs() {
        this.slug = this.$store.getters.getCartoLayerSpecs.slug;
        const addLayer = this.$store.getters.getCartoLayerSpecs.addLayer;

        if (addLayer && !this.cartoLayers[this.slug]) {
          this.$store.dispatch('cartoLayer');
        } else {
          this.removeCurrentCartoLayer();
        }
      },
    },
  };
</script>
