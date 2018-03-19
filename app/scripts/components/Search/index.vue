<template src="./search-template.html"> </template>
<style lang="scss" src="./search-style.scss"> </style>
<script>
import router from 'router';
import { mapGetters } from 'vuex';
import IconComponent from 'components/Icon';
import vClickOutside from 'v-click-outside';
import sortBy from 'lodash/sortBy';

const SHOW_RECENT_DATASETS = process.env.SHOW_RECENT_DATASETS;
const SHOW_SEARCH_SUGGESTIONS = process.env.SHOW_SEARCH_SUGGESTIONS;

export default {
  name: 'search-component',
  created() {
    window.addEventListener('keydown', this.onKeydown);
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.onKeydown);
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data() {
    return {
      isOpen: false,
      query: '',
      showSearchSuggestions: SHOW_SEARCH_SUGGESTIONS
    };
  },
  computed: {
    queryState: {
      get() {
        return this.query;
      },
      set(value) {
        this.query = value;
        if (value.split('').length > 1 || value === '') {
          this.debounce(this.$store.dispatch, ['searchDatasets', value]);
        }
      }
    },
    ...mapGetters({
      notFound: 'getSearchNotFound',
      results: 'getSearchListData',
      recentDatasets: 'getRecentDatasets',
      loading: 'getSearchLoading',
      error: 'getSearchError',
    }),
    datasets() {
      if (this.recentDatasets.length && SHOW_RECENT_DATASETS) {
        const recentIds = this.recentDatasets.map(d => d.id);
        return sortBy(this.results.filter(d => recentIds.indexOf(d.id) > -1),
          item => recentIds.indexOf(item.id)
        );
      }
      return this.results;
    }
  },
  methods: {
    debounce(callback, params) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        callback(...params);
      }, 250);
    },
    onClickOutside() {
      this.isOpen = false;
    },
    selectDataset(dataset) {
      this.$store.dispatch('searchDatasets', dataset.name);
    },
    navigateDown(e) {
      if (!SHOW_SEARCH_SUGGESTIONS) return;
      const element = e.target.tagName === 'LI'
      ? e.target.nextElementSibling
      : this.$refs['search-results-list'].firstChild;

      element && element.focus();
    },
    navigateUp(e) {
      if (!SHOW_SEARCH_SUGGESTIONS) return;
      const element = e.target.previousElementSibling
      ? e.target.previousElementSibling
      : this.$refs['search-input'];

      element && element.focus();
    },
    onKeydown(e) {
      if (!SHOW_SEARCH_SUGGESTIONS) return;
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
