<template src="./map-footer-template.html"></template>
<style lang="scss" src="./map-footer-style.scss"></style>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'map-footer-component',
    data() {
      return {
      };
    },
    computed: {
      ...mapGetters({
        openModal: 'getConsoleModal',
      }),
    },
    methods: {
      toggleModal() {
        this.$store.dispatch('openConsoleModal');
        this.$store.dispatch('setModalContentType', 'about');
      }
    }
  };
</script>
