<template src="./map-footer-template.html"></template>
<style lang="scss" src="./map-footer-style.scss"></style>

<script>
  import store from 'store';
  import { mapGetters } from 'vuex';
  import ModalComponent from 'components/Modal';
  import ButtonComponent from 'components/Button';

  export default {
    name: 'map-footer-component',
    data() {
      return {
        open: false,
      };
    },
    computed: {
      ...mapGetters({
        openModal: 'getConsoleModal',
      }),
    },
    methods: {
      toggleModal() {
        this.open = !this.open;
      },
    },

    watch: {
      openModal() {
        store.dispatch('openConsoleModal');
      },
    },
    components: {
      ModalComponent,
      ButtonComponent,
    },
  };
</script>
