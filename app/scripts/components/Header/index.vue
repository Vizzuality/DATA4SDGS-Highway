<template src="./header-template.html"></template>

<style lang="scss" src="./header-style.scss"></style>

<script>
import IconComponent from 'components/Icon';

export default {
  name: 'header-component',
  components: {
    IconComponent
  },
  data() {
    return {
      loginLink: `http://api.apihighways.org/auth/login?callbackUrl=${window.location.origin}/token&token=true`
    };
  }
};
</script>
