<template src="./search-template.html"> </template>
<style lang="scss" src="./search-style.scss"> </style>
<script>
import DropdownComponent from 'components/Dropdown';

export default{
  name: 'search-component',
  data() {
    return {
      filters: ['all', 'noaa', 'nasa', 'wri', 'other'],
      query: null,
      loadingMessage: 'Searching...',
      errorMessage: 'Something weird happened!',
      notFoundMessage: 'No Datasets were found',
    };
  },
  computed: {
    loading() {
    },
    results() {
    },
    notFound() {
      return this.query && !this.results;
    },
    error() {
    },
  },
  watch: {
    query() {
    },
  },
  components: {
    DropdownComponent,
  },
};
</script>
