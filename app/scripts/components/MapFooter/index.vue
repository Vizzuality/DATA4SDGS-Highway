<template src="./map-footer-template.html"></template>
<style lang="scss" src="./map-footer-style.scss"></style>

<script>
  import { mapState } from 'vuex';
  import ModalComponent from 'components/Modal';
  import ShareComponent from 'components/Share';

  export default {
    name: 'map-footer-component',
    data() {
      return {
      };
    },
    computed: {
      ...mapState({
        modalContent: state => state.modal.type,
      }),
    },
    methods: {
      toggleModal() {
        this.$store.dispatch('setModal', { isOpen: true, type: 'about' });
      },
      goTo(path) {
        this.$store.dispatch('setModal', { isOpen: false });
        this.$router.push(path);
      },
    },
    components: {
      ModalComponent,
      ShareComponent,
    },
  };
</script>
