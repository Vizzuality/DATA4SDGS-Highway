<template src="./template.html"></template>

<style lang="scss" src="./style.scss"></style>

<script>

  export default {
    name: 'toggle-menu',
    data() {
      return {
        closed: false
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
      }
    }
  };

</script>
