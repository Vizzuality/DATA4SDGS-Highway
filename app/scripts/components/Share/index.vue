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
        sharedUrl: 'http://www.google.es'
      };
    }
  };
</script>
