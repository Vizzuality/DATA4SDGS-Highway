<template src="./modal-template.html"> </template>

<style lang="scss" src="./modal-style.scss"> </style>

<script>
import IconComponent from 'components/Icon';
import ButtonComponent from 'components/Button';


export default{
  name: 'modal-component',
  props: {
    open: {
      type: Boolean,
    },
    close: {
      type: Function,
    },
  },
  components: {
    IconComponent,
    ButtonComponent,
  },
};
</script>
