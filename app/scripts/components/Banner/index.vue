<template src="./banner-template.html"> </template>

<style lang="scss" src="./banner-style.scss"> </style>

<script>
import ButtonComponent from 'components/Button';

export default{
  name: 'banner-component',
  mounted() {
    this.isVisible = !sessionStorage.getItem(this.cookieName);
  },
  props: {
    cookieName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    hide() {
      sessionStorage.setItem(this.cookieName, 'true');
      this.isVisible = false;
    },
  },
  components: {
    ButtonComponent,
  },
};
</script>
