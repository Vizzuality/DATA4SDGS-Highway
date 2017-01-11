<template src="./modal-template.html"> </template>

<style lang="scss" src="./modal-style.scss"> </style>

<script>
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
  props: {
    open: {
      type: Boolean,
    },
    close: {
      type: Function,
    },
  },
  methods: {
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
