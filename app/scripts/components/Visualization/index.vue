<template src="./visualization-template.html"></template>

<style lang="scss" src="./visualization-style.scss"></style>

<script>

  import MapComponent from 'components/Map';
  import SidebarComponent from 'components/Sidebar';
  import TimelineComponent from 'components/Timeline';

  export default {
    name: 'visualization-component',
    data() {
      return {};
    },
    computed: {
    },
    components: {
      MapComponent,
      SidebarComponent,
      TimelineComponent
    }
  };
</script>
