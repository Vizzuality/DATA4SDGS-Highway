<template src="./visualization-template.html"></template>

<style lang="scss" src="./visualization-style.scss"></style>

<script>

  import MapComponent from 'components/Map';
  import SidebarComponent from 'components/Sidebar';
  import ShareComponent from 'components/Share';
  import TimelineComponent from 'components/Timeline';
  import MapFooterComponent from 'components/MapFooter';
  import ModalComponent from 'components/Modal';
  import { mapGetters } from 'vuex';
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
        modalContent: 'No data available',
      };
    },
    computed: {
      ...mapGetters({
        openModal: 'getConsoleModal',
        modalContentType: 'getModalContentType',
      }),
    },
    methods: {
      closeModal() {
        this.$store.dispatch('closeConsoleModal');
      },
      toggleModal() {
        this.$store.dispatch('openConsoleModal');
        this.$store.dispatch('setModalContentType', 'share');
      }
    },
    watch: {
      modalContentType() {
        this.modalContent = this.$store.getters.getModalContentType;
      }
    },
    components: {
      MapComponent,
      SidebarComponent,
      TimelineComponent,
      MapFooterComponent,
      ModalComponent,
      ShareComponent,
      IconComponent
    }
  };
</script>
