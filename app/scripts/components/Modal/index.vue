<template src="./modal-template.html"></template>

<style lang="scss" src="./modal-style.scss"></style>

<script>
import { mapState } from 'vuex';
import IconComponent from 'components/Icon';
import ButtonComponent from 'components/Button';

export default{
  name: 'modal-component',
  created() {
    window.addEventListener('keyup', this.onKeyup);
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.onKeyup);
  },
  computed: {
    ...mapState({
      open: state => state.modal.open,
      onClose: state => state.modal.onClose
    }),
  },
  methods: {
    close() {
      if (this.onClose) this.onClose();
      this.$store.dispatch('setModal', { isOpen: false });
    },
    onKeyup(e) {
      if (e.keyCode === 27) this.close();
    },
  },
  components: {
    IconComponent,
    ButtonComponent,
  },
};

</script>
