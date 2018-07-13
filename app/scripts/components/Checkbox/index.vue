<template src="./checkbox-template.html" ></template >

<style lang="scss" src="./checkbox-style.scss" ></style >

<script >
  import { mapGetters } from 'vuex';
  import IconComponent from 'components/Icon';

  export default {
    name: 'checkbox-component',
    props: {
      group: {
        type: String,
        required: true,
      },
      items: {
        type: Array,
        required: true,
      },
      initial: {
        type: Array,
        required: true,
      },
      icon: {
        type: String
      },
    },
    data() {
      return {
        selectedFilters: this.initial || {}
      };
    },
    computed: {
      ...mapGetters({
        currentFilters: 'getSearchFilters'
      }),
    },
    methods: {
      getId(value, index) {
        return `checkbox-${value}-${index}`;
      },
    },
    watch: {
      selectedFilters() {
        const newFilters = Object.assign({}, this.currentFilters);
        newFilters[this.group] = this.selectedFilters;

        this.$store.dispatch('setSearchDatasetsFilters', newFilters);
      },
    },
    components: {
      IconComponent,
    },
  };
</script >

