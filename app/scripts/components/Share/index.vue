<template src="./share-template.html"></template>

<style lang="scss" src="./share-style.scss"></style>

<script>

  import IconComponent from '../Icon';

  const urlEncoded = encodeURIComponent(window.location.href);

  export default {
    name: 'share-component',
    components: {
      IconComponent
    },
    data() {
      return {
        sharedUrl: window.location.href,
      };
    },
    computed: {
      facebookEncondedUrl() {
        return `https://www.facebook.com/sharer/sharer.php?u=${urlEncoded}&t=Global Cancer Project Map`;
      },
      twitterEncondedUrl() {
        return `https://twitter.com/share?url=${urlEncoded}`;
      },
    },
    methods: {
      handleCopy() {
        document.getElementById('copyInput').select();
        document.execCommand('copy');
      },
    },
  };
</script>
