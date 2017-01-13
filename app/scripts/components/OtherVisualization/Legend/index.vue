<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>

<script>

  export default {

    name: 'legend-component',

    computed: {
      /* TODO: pass activeItems and items as property from parent component
        for making this component reusable
      */
      activeItems() {
        return this.$store.state.waterRiskLayers.layers.active;
      },
      items() {
        return this.$store.state.waterRiskLayers.layers.list;
      }
    },

    methods: {
      onCboxChange(event, id) {
        const aux = this.activeItems.slice(0);
        if (event.currentTarget.checked) {
          aux.push(id);
        } else {
          aux.splice(this.activeItems.indexOf(id), 1);
        }
        this.$store.dispatch('setActiveLayers', aux);
      }
    }
  };

</script>
