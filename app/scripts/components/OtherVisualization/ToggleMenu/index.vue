<template src="./toggle-menu-template.html"></template>

<style lang="scss" src="./toggle-menu-style.scss"></style>

<script>
  import { mapState } from 'vuex';
  import SpinnerComponent from 'components/Spinner';

  export default {
    name: 'toggle-menu',
    mounted() {
      this.sortBasins();
    },
    data() {
      return {
        closed: false,
        sort: {
          field: 'water',
          direction: true
        },
        basinsList: []
      };
    },
    computed: {
      ...mapState({
        basins: state => state.waterRiskLayers.basins.list,
        basinsLoading: state => state.waterRiskLayers.basins.loading,
      }),
    },
    methods: {
      toggle() {
        this.closed = !this.closed;
      },
      setSortField(field) {
        this.sort.direction = field === this.sort.field ? !this.sort.direction : true;
        this.sort.field = field;
      },
      sortBasins() {
        const aux = this.basins.slice(0);
        aux.sort((a, b) => {
          if (this.sort.direction) {
            return a[this.sort.field] > b[this.sort.field] ? 1 : -1;
          }
          return a[this.sort.field] > b[this.sort.field] ? -1 : 1;
        });
        this.basinsList = aux;
      },
      // TODO: refactor this into a Vue.filter
      capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
      }
    },
    watch: {
      basins() {
        this.sortBasins();
      },
      'sort.field': function() { // eslint-disable-line
        this.sortBasins();
      },
      'sort.direction': function() { // eslint-disable-line
        this.sortBasins();
      }
    },
    components: {
      SpinnerComponent,
    },
  };

</script>
