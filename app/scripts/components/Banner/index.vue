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
  methods: {
    goToContactForm() {
      window.open(
        'https://docs.google.com/forms/d/e/1FAIpQLSeYC7oc0Fs2pL-QAPHl2Nk_Y-h_ClmvptakzSHL8k5AJakbow/viewform?usp=sf_link',
        '_blank'
      );
    },
  },
  components: {
    ButtonComponent,
  },
};
</script>
