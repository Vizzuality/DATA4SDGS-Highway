<template src="./template.html"></template>

<style lang="scss" src="./style.scss"></style>

<script>

  export default {
    name: 'toggle-menu',
    data() {
      return {
        closed: false,
        sort: {
          field: 'water',
          direction: 1
        },
        basinsList: []
      };
    },
    computed: {
      basins() {
        return this.$store.state.waterRiskLayers.basins.list;
      }
    },
    methods: {
      toggle() {
        this.closed = !this.closed;
      },
      setSortField(field) {
        this.sort.direction = field === this.sort.field ? -this.sort.direction : 1;
        this.sort.field = field;
      },
      sortBasins() {
        const aux = this.basins.slice(0);
        aux.sort((a, b) => { // eslint-disable-line
          if (this.sort.direction === 1) {
            return a[this.sort.field] > b[this.sort.field] ? 1 : -1;
          }
          return a[this.sort.field] > b[this.sort.field] ? -1 : 1;
        });
        this.basinsList = aux;
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
    }
  };

</script>
