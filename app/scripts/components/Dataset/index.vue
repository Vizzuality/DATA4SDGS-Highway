<template src="./dataset-template.html"> </template>

<style lang="scss" src="./dataset-style.scss"> </style>

<script>
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
    selectDataset() {
      this.$store.dispatch('setSelectedDataset', this.dataset);
      this.$store.dispatch('openConsoleModal');
      this.$store.dispatch('addRecentDataset', this.dataset);
    },
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
};
</script>
