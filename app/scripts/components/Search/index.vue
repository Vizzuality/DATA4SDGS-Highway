<template src="./search-template.html"> </template>
<style lang="scss" src="./search-style.scss"> </style>
<script>
import { mapGetters } from 'vuex';
import DropdownComponent from 'components/Dropdown';
import CheckboxComponent from 'components/Checkbox';

export default{
  name: 'search-component',
  data() {
    return {
      filters: [{
        value: 'noaa',
        label: 'NOAA',
      },
      {
        value: 'nasa',
        label: 'NASA'
      },
      {
        value: 'iucn_unep_wcmc',
        label: 'IUCN & UNEP-WCMC'
      },
      {
        value: 'cait',
        label: 'CAIT'
      },
      {
        value: 'joe_casola',
        label: 'JOE CASOLA, U. OF WASHINGTON'
      }],
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
      }, 700);
    },
    selectDataset(dataset) {
      this.$store.dispatch('setSelectedDataset', dataset);
      this.$store.dispatch('openConsoleModal');
    },
  },
  components: {
    DropdownComponent,
    CheckboxComponent,
  },
};
</script>
