<template src="./visualization-template.html"></template>

<style lang="scss" src="./visualization-style.scss"></style>

<script>
  import MapComponent from 'components/Map';
  import SidebarComponent from 'components/Sidebar';
  import TimelineComponent from 'components/Timeline';
  import MapFooterComponent from 'components/MapFooter';
  import d4sdgLogo from 'static/logos/logo_D4SDG.png';
  import IconComponent from '../Icon';

  export default {
    name: 'visualization-component',
    created() {
      this.$store.dispatch('setCountries');
    },
    data() {
      return {
        d4sdgLogo,
      };
    },
    components: {
      MapComponent,
      SidebarComponent,
      TimelineComponent,
      MapFooterComponent,
      IconComponent
    }
  };
</script>
