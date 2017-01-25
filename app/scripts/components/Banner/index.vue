<template src="./banner-template.html"> </template>

<style lang="scss" src="./banner-style.scss"> </style>

<script>
import ButtonComponent from 'components/Button';

export default{
  name: 'banner-component',
  props: {
    isVisible: {
      type: Boolean,
    },
    cookieName: {
      type: String,
      required: true,
    },
    heading: {
      type: String,
    },
    body: {
      type: String,
    },
    actionName: {
      type: String,
    },
    action: {
      type: Function,
      required: true,
    },
  },
  components: {
    ButtonComponent,
  },
};
</script>
