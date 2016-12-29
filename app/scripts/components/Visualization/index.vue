<template src="./visualization-template.html"></template>

<style lang="scss" src="./visualization-style.scss"></style>

<script>

  import MapComponent from 'components/Map';
  import SidebarComponent from 'components/Sidebar';
  import TimelineComponent from 'components/Timeline';
  import MapFooterComponent from 'components/MapFooter';
  import ModalComponent from 'components/Modal';
  import { mapGetters } from 'vuex';
  import d4sdgLogo from 'static/logos/logo_D4SDG.png';

  export default {
    name: 'visualization-component',
    created() {
      this.$store.dispatch('getCountries');
    },
    data() {
      return {
        d4sdgLogo,
        modalContent: 'No data available',
      };
    },
    computed: {
      ...mapGetters({
        openModal: 'getConsoleModal',
      }),
    },
    methods: {
      closeModal() {
        this.$store.dispatch('closeConsoleModal');
      },
    },
    components: {
      MapComponent,
      SidebarComponent,
      TimelineComponent,
      MapFooterComponent,
      ModalComponent,
    }
  };
</script>
