<template src="./dataset-template.html"> </template>

<style lang="scss" src="./dataset-style.scss"> </style>

<script>
import router from 'router';

export default{
  name: 'dataset-component',
  props: {
    dataset: {
      type: Object,
      required: true,
    },
    large: {
      type: Boolean
    },
  },
  computed: {
    idRoute() {
      return `/playground/${this.dataset.id}`;
    },
    name() {
      return this.dataset.name;
    },
    target() {
      return this.dataset.target;
    },
    goal() {
      return this.dataset.goal;
    },
    source() {
      const info = this.getMetadataInfo();
      return info ? info.organization : null;
    },
    link() {
      const info = this.getMetadataInfo();
      return info ? info.source : null;
    },
  },
  methods: {
    getMetadataInfo() {
      const metadata = this.dataset.metadata[0];
      if (metadata) {
        const attributes = metadata.attributes;
        if (attributes.info) {
          return attributes.info;
        }
      }
      return null;
    },
  },
  components: {
    router,
  },
};
</script>
