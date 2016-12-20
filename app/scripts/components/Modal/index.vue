<template src="./modal-template.html"> </template>

<style lang="scss" src="./modal-style.scss"> </style>

<script>
import IconComponent from 'components/Icon';
import ButtonComponent from 'components/Button';


export default{
  name: 'modal-component',
  created() {
    window.addEventListener('keyup', (e) => {
      if (e.keyCode === 27) {
        this.close();
      }
    });
  },
  props: {
    open: {
      type: Boolean,
    },
    close: {
      type: Function,
    },
    beforeDestroy() {
      window.removeEventListener('keyup');
    },
  },
  components: {
    IconComponent,
    ButtonComponent,
  },
};
</script>
