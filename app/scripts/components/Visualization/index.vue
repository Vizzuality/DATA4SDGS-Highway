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
      modalType() {
        const computedType = {};
        computedType.share = this.modalContent === 'share';
        computedType.about = this.modalContent === 'about';
        return computedType;
      },
      ...mapGetters({
        openModal: 'getConsoleModal',
        modalContentType: 'getModalContentType',
      }),
    },
    methods: {
      closeModal() {
        this.$store.dispatch('closeConsoleModal');
      },
    },
    watch: {
      modalContentType() {
        this.modalContent = this.$store.getters.getModalContentType;
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
