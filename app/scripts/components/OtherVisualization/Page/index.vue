<template src="./other-visualization-template.html"></template>

<style lang="scss" src="./other-visualization-style.scss"></style>

<script>
  import MapFooterComponent from 'components/MapFooter';
  import SidebarComponent from 'components/Sidebar';
  import OtherMap from '../Map';
  import ToggleMenu from '../ToggleMenu';

  export default {
    name: 'other-visualization-page',
    components: {
      OtherMap,
      MapFooterComponent,
      ToggleMenu,
      SidebarComponent
    }
  };

</script>
