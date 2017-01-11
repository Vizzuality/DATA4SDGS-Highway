<template src="./template.html"></template>

<style lang="scss" src="./style.scss"></style>

<script>

  export default {
    name: 'toggle-menu',
    data() {
      return {
        closed: false
      };
    },
    methods: {
      toggle() {
        this.closed = !this.closed;
      }
    }
  };

</script>
