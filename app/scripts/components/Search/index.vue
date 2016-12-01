<template src="./search-template.html"> </template>
<style lang="scss" src="./search-style.scss"> </style>
<script>
import { mapGetters } from 'vuex';
import DropdownComponent from 'components/Dropdown';

export default{
  name: 'search-component',
  data() {
    return {
      filters: ['all', 'noaa', 'nasa', 'wri', 'other'],
      loadingMessage: 'Searching...',
      errorMessage: 'Something weird happened!',
      notFoundMessage: 'No Datasets were found',
    };
  },
  computed: {
    queryState: {
      get() {
        return this.query;
      },
      set(value) {
        this.$store.dispatch('updateQuery', value);
      }
    },
    ...mapGetters({
      notFound: 'getNotFound',
      results: 'getListData',
      query: 'getQuery',
      loading: 'getLoading',
      error: 'getError',
    }),
  },
  components: {
    DropdownComponent,
  },
};
</script>
