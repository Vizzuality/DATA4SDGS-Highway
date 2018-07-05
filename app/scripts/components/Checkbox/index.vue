<template src="./checkbox-template.html"></template>

<style lang="scss" src="./checkbox-style.scss"></style>

<script>
import { mapGetters } from 'vuex';
import IconComponent from 'components/Icon';
import difference from 'lodash/difference';
import uniq from 'lodash/uniq';

export default {
  name: 'checkbox-component',
  props: {
    items: {
      type: Array,
      required: true,
    },
    initial: {
      type: Array,
      required: false,
    },
    icon: {
      type: String
    },
  },
  data() {
    return {
      selectedFilters: this.initial || []
    };
  },
  computed: {
    ...mapGetters({
      currentFilters: 'getSearchFiltersArray'
    }),
  },
  methods: {
    getId(value, index) {
      return `checkbox-${value}-${index}`;
    },
  },
  watch: {
    selectedFilters() {
      const filters = difference(this.currentFilters, this.items.map(i => i.value));
      const newFilters = uniq([...filters, ...this.selectedFilters]).join(',');
      this.$store.dispatch('setSearchDatasetsFilters', newFilters);
    },
  },
  components: {
    IconComponent,
  },
};
</script>

