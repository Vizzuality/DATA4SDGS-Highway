<template src="./search-template.html"> </template>
<style lang="scss" src="./search-style.scss"> </style>
<script>
import router from 'router';
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
      this.$router.push(`/playground/${dataset.id}`);
    },
    navigateDown(e) {
      const element = e.target.tagName === 'LI'
      ? e.target.nextElementSibling
      : this.$refs['search-results-list'].firstChild;

      element.focus();
    },
    navigateUp(e) {
      const element = e.target.previousElementSibling
      ? e.target.previousElementSibling
      : this.$refs['search-input'];

      element.focus();
    },
  },
  components: {
    DropdownComponent,
    CheckboxComponent,
    router,
  },
};
</script>
