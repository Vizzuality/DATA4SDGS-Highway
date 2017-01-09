<template src="./share-template.html"></template>

<style lang="scss" src="./share-style.scss"></style>

<script>

  import IconComponent from '../Icon';

  export default {
    name: 'share-component',
    components: {
      IconComponent
    },
    data() {
      return {
        sharedUrl: window.location.href
      };
    },
    methods: {
      handleCopy() {
        document.getElementById('copyInput').select();
        document.execCommand('copy');
      },
    },
  };
</script>
