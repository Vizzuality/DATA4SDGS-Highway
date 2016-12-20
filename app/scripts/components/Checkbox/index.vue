<template src="./checkbox-template.html"></template>

<style lang="scss" src="./checkbox-style.scss"></style>

<script>
import IconComponent from 'components/Icon';

export default {
  name: 'checkbox-component',
  props: {
    items: {
      type: Array,
      required: true,
    },
    icon: {
      type: String
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
  components: {
    IconComponent,
  },
};
</script>

