<template src="./search-template.html" ></template >
<style lang="scss" src="./search-style.scss" ></style >
<script >
  import router from 'router';
  import { mapGetters } from 'vuex';
  import { Tab, Tabs } from 'vue-tabs-component';
  import TagComponent from 'components/Tag';
  import IconComponent from 'components/Icon';
  import vClickOutside from 'v-click-outside';
  import CheckboxComponent from 'components/Checkbox';
  import intersection from 'lodash/intersection';
  import sortBy from 'lodash/sortBy';
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
      selectedFiltersLabels() {
        const filterLabels = [];

        if (this.selectedFilters && this.filters) {
          const filterValues = [].concat(...Object.values(this.selectedFilters));

          filterValues.forEach((filterValue) => {
            const match = Object.keys(this.filters).map(
              (filterSectionKey) => {
                const filterSection = this.filters[filterSectionKey];
                const filterMatch = filterSection.find(filterOption =>
                  filterOption.value === filterValue
                );

                if (filterMatch) {
                  return Object.assign({}, filterMatch, { key: filterSectionKey });
                }

                return null;
              }
            ).find(e => e);

            if (typeof match !== 'undefined') {
              filterLabels.push(match);
            }
          });
        }

        return filterLabels;
      },
      ...mapGetters({
        notFound: 'getSearchNotFound',
        results: 'getSearchListData',
        recentDatasets: 'getRecentDatasets',
        loading: 'getSearchLoading',
        error: 'getSearchError',
        selectedFilters: 'getSearchFilters'
      }),
      datasets() {
        if (this.recentDatasets.length && SHOW_RECENT_DATASETS) {
          const recentIds = this.recentDatasets.map(d => d.id);
          return sortBy(this.results.filter(d => recentIds.indexOf(d.id) > -1),
            item => recentIds.indexOf(item.id)
          );
        }
        return this.results;
      },
      selections() {
        const selection = {};
        Object.keys(filters).forEach((key) => {
          const selectedFilters = intersection(
            filters[key].map(f => f.value),
            this.selectedFilters[key]
          );
          selection[key] = selectedFilters.length
            ? `(${selectedFilters.length})`
            : '';
        });
        return selection;
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
      clearSelection(filter, key) {
        if (!key || !filter) {
          const emptyFilter = {};
          Object.keys(filters).forEach((filterKey) => {
            emptyFilter[filterKey] = [];
          });
          this.$store.dispatch('setSearchDatasetsFilters', emptyFilter);
        } else {
          const newSectionFilters = (key && filter)
            ? this.selectedFilters[key].filter(f => f !== filter)
            : {};

          const updatedFilter = {};
          updatedFilter[key] = newSectionFilters;
          this.$store.dispatch('setSearchDatasetsFilters', Object.assign({}, this.selectedFilters, updatedFilter));
        }
      },
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
</script >
