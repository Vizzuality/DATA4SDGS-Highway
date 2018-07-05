<template src="./playground-template.html"></template>
<style lang="scss" src="./playground-style.scss"></style>
<script>
import router from 'router';
import sortBy from 'lodash/sortBy';
import { mapGetters } from 'vuex';
import ArticleComponent from 'components/Article';
import DatasetListComponent from 'components/DatasetList';
import ModalComponent from 'components/Modal';
import SpinnerComponent from 'components/Spinner';
import ButtonComponent from 'components/Button';

const SHOW_RECENT_DATASETS = process.env.SHOW_RECENT_DATASETS;

export default {
  name: 'playground-component',
  created() {
    this.$store.dispatch('searchDatasets', '');
    this.$store.dispatch('setSearchDatasetsFilters', '');
  },
  data() {
    return {
      loadingMessage: 'Searching...',
      errorMessage: 'Something weird happened!',
      notFoundMessage: 'No Datasets were found',
      timeout: null,
      page: 0,
      showRecentDatasets: SHOW_RECENT_DATASETS
    };
  },
  computed: {
    ...mapGetters({
      searchDatasets: 'getSearchListData',
      loading: 'getSearchLoading',
      error: 'getSearchError',
      recentDatasets: 'getRecentDatasets',
      searchLoading: 'getSearchLoading',
      selectedFilters: 'getSearchFilters'
    }),
    datasets() {
      if (this.showRecentDatasets && this.recentDatasets.length) {
        const recentIds = this.recentDatasets.map(d => d.id);
        return sortBy(this.searchDatasets.filter(d => recentIds.indexOf(d.id) > -1),
          item => recentIds.indexOf(item.id)
        );
      }
      return this.searchDatasets;
    }
  },
  methods: {
    closeModal() {
      this.$router.push('/data-sets');
    },
    showAllDatasets() {
      this.showRecentDatasets = false;
    },
  },
  watch: {},
  components: {
    ArticleComponent,
    DatasetListComponent,
    ModalComponent,
    SpinnerComponent,
    router,
    ButtonComponent
  },
};

</script>
