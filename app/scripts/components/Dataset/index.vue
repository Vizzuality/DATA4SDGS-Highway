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
      return this.dataset.metadata.attributes ? this.dataset.metadata.attributes.source : null;
    },
  },
  methods: {
    selectDataset() {
      this.$store.dispatch('setSelectedDataset', this.dataset);
      this.$store.dispatch('openConsoleModal');
    },
  },
};
</script>
