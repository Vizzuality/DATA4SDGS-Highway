<template src="./search-template.html"> </template>
<style lang="scss" src="./search-style.scss"> </style>
<script>
import router from 'router';
import { mapGetters } from 'vuex';
import { Tabs, Tab } from 'vue-tabs-component';
import TagComponent from 'components/Tag';
import IconComponent from 'components/Icon';
import vClickOutside from 'v-click-outside';
import CheckboxComponent from 'components/Checkbox';
import intersection from 'lodash/intersection';
import sortBy from 'lodash/sortBy';
import capitalize from 'lodash/capitalize';
import filters from '../../../data/search-filters.json';

const SHOW_RECENT_DATASETS = process.env.SHOW_RECENT_DATASETS;

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
      filters,
      isOpen: false,
      query: '',
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
      selectedFilters: 'getSearchFiltersArray'
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
    clearSelection(filter) {
      const newFilters = filter
        ? this.selectedFilters.filter(f => f !== filter).join(',')
        : '';
      this.$store.dispatch('setSearchDatasetsFilters', newFilters);
    },
  },
  filters: {
    capitalize
  },
  components: {
    router,
    Tabs,
    Tab,
    TagComponent,
    CheckboxComponent,
    IconComponent
  },
};
</script>
