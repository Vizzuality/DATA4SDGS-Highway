<template src="./examples-template.html"> </template>

<style lang="scss" src="./examples-style.scss"> </style>

<script>
import router from 'router';
import IconComponent from 'components/Icon';
import ModalComponent from 'components/Modal';
import ShareComponent from 'components/Share';
import CarouselComponent from 'components/Carousel';
import examples from '../../../data/examples.json';

export default {
  name: 'examples-detail-component',
  data() {
    const { id } = this.$route.params;
    const example = examples.find(ex => ex.id === id) || {};
    return {
      example
    };
  },
  computed: {
    imagesFiltered() {
      return this.example && this.example.images.slice(0, 3);
    },
    hasEmbed() {
      return this.example && !!this.example.html;
    },
    hasSingleImage() {
      return this.example && this.example.images.length === 1;
    },
    hasMultipleImages() {
      return this.example && this.example.images.length > 1;
    }
  },
  methods: {
    openShare() {
      this.$store.dispatch('setModal', { isOpen: true });
    }
  },
  components: {
    router,
    IconComponent,
    ModalComponent,
    ShareComponent,
    CarouselComponent
  },
};
</script>
