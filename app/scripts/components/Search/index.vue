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
      results: [],
    };
  },
  components: {
    DropdownComponent,
  },
  watch: {
    query() {
      !this.results.length && this.results.push('Searching...');
      !this.query && this.results.pop();
    },
  },
};
</script>
