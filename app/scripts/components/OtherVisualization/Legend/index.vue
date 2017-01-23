<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>

<script>

  export default {

    name: 'legend-component',
    data() {
      return {
        isOpen: true,
      };
    },
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
      toggle() {
        this.isOpen = !this.isOpen;
      },
      onCboxChange(event, id) {
        const layerName = event.target.nextElementSibling.innerText;
        const aux = this.activeItems.slice(0);
        if (event.currentTarget.checked) {
          // Google Analytics
          ga('send', 'event', 'Visualisation', 'Turn Layer On', layerName);
          aux.push(id);
        } else {
          // Google Analytics
          ga('send', 'event', 'Visualisation', 'Turn Layer Off', layerName);
          aux.splice(this.activeItems.indexOf(id), 1);
        }
        this.$store.dispatch('setActiveLayers', aux);
      }
    }
  };

</script>
