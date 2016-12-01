<template src="./search-template.html"> </template>
<style lang="scss" src="./search-style.scss"> </style>
<script>
import { mapState, mapGetters } from 'vuex';
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
    query: {
      get() {
        return this.$store.state.query;
      },
      set() {
        this.$store.dispatch('searchDatasets');
      }
    },
    ...mapState({
      loading: 'loading',
      error: 'error',
    }),
    ...mapGetters({
      notFound: 'getNotFound',
      results: 'getListData',
    }),
  },
  components: {
    DropdownComponent,
  },
};
</script>
