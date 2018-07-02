<template src="./carousel-template.html"></template>

<style lang="scss" src="./carousel-style.scss"></style>

<script>
export default {
  name: 'carousel-component',
  computed: {
    currentImage() {
      this.timeLeft = this.autoSlideInterval;
      return this.images[this.activeImage].src;
    }
  },
  data() {
    return {
      activeImage: 0,
    };
  },
  methods: {
    nextImage() {
      let active = this.activeImage + 1;
      if (active >= this.images.length) {
        active = 0;
      }
      this.activateImage(active);
    },
    prevImage() {
      let active = this.activeImage - 1;
      if (active < 0) {
        active = this.images.length - 1;
      }
      this.activateImage(active);
    },
    activateImage(imageIndex) {
      this.activeImage = imageIndex;
    },
  },
  created() {
    if (this.startingImage && this.startingImage >= 0 && this.startingImage < this.images.length) {
      this.activeImage = this.startingImage;
    }
  },
  props: ['startingImage', 'images']
};
</script>

