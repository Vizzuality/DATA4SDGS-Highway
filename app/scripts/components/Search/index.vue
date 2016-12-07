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
      timeout: null,
    };
  },
  computed: {
    queryState: {
      get() {
        return this.query;
      },
      set(value) {
        if (value.split('').length > 1 || value === '') {
          this.debounce(this.$store.dispatch, ['searchDatasets', value]);
        }
      }
    },
    ...mapGetters({
      notFound: 'getSearchNotFound',
      results: 'getSearchListData',
      query: 'getSearchQuery',
      loading: 'getSearchLoading',
      error: 'getSearchError',
    }),
  },
  methods: {
    debounce(callback, params) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        callback(...params);
      }, 400);
    },
  },
  components: {
    DropdownComponent,
  },
};
</script>
