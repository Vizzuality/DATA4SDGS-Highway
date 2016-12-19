<template src="./checkbox-template.html"></template>

<style lang="scss" src="./checkbox-style.scss"></style>

<script>
export default {
  name: 'checkbox-component',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedFilters: [],
    };
  },
  methods: {
    getId(value, index) {
      return `checkbox-${value}-${index}`;
    },
  },
  watch: {
    selectedFilters() {
      const newFilters = this.selectedFilters.join(',');
      this.$store.dispatch('setSearchDatasetsFilters', newFilters);
    },
  },
};
</script>

