<template src="./search-template.html"> </template>
<style lang="scss" src="./search-style.scss"> </style>
<script>
import router from 'router';
import { mapGetters } from 'vuex';
import IconComponent from 'components/Icon';

export default{
  name: 'search-component',
  created() {
    window.addEventListener('keydown', this.onKeydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeydown);
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
      this.$router.push(`/data-sets/${dataset.id}`);
    },
    navigateDown(e) {
      const element = e.target.tagName === 'LI'
      ? e.target.nextElementSibling
      : this.$refs['search-results-list'].firstChild;

      element && element.focus();
    },
    navigateUp(e) {
      const element = e.target.previousElementSibling
      ? e.target.previousElementSibling
      : this.$refs['search-input'];

      element && element.focus();
    },
    onKeydown(e) {
      const focusedElement = document.activeElement;
      if (e.which === 40 || e.which === 38) {
        if (focusedElement.classList.contains('js-search-input')
        || focusedElement.classList.contains('js-search-results-item')) {
          e.preventDefault();
        }
      }
    },
  },
  components: {
    router,
    IconComponent
  },
};
</script>
