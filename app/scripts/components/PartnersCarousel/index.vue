<template src="./template.html"></template>
<style lang="scss" src="./style.scss"> </style>
<style lang="scss" src="slick-carousel/slick/slick.scss"> </style>
<script>

  import Slick from 'vue-slick';

  export default {

    name: 'search-component',

    data() {
      return {
        slickOptions: {
          slidesToShow: 8,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
          arrows: false,
        },
      };
    },

    components: {
      Slick
    },

    // All slick methods can be used too, example here
    methods: {
      next() {
        this.$refs.slick.next();
      },

      prev() {
        this.$refs.slick.prev();
      }
    }

  };
</script>
