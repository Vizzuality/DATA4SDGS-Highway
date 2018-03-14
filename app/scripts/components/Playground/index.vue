<template src="./playground-template.html"></template>
<style lang="scss" src="./playground-style.scss"></style>
<script>
import router from 'router';
import store from 'store';
import { mapGetters } from 'vuex';
import ArticleComponent from 'components/Article';
import DatasetListComponent from 'components/DatasetList';
import ModalComponent from 'components/Modal';
import DropdownComponent from 'components/Dropdown';
import ConsoleComponent from 'components/Console';
import SpinnerComponent from 'components/Spinner';
import ButtonComponent from 'components/Button';

export default {
  name: 'playground-component',
  created() {
    this.$store.dispatch('searchDatasets', '');
    this.$store.dispatch('setSearchDatasetsFilters', '');
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.dataset) {
      store.dispatch('setSelectedDataset', to.params.dataset)
      .then(() => store.dispatch('setModal', {
        isOpen: true,
        onClose: () => {
          router.push('/data-sets');
        },
      }));
    }
    next();
  },
  data() {
    return {
      filters: [{
        value: 'noaa',
        label: 'NOAA',
      },
      {
        value: 'nasa',
        label: 'NASA',
      },
      {
        value: 'iucn_unep_wcmc',
        label: 'IUCN & UNEP-WCMC',
      },
      {
        value: 'cait',
        label: 'CAIT',
      },
      {
        value: 'joe_casola',
        label: 'JOE CASOLA, U. OF WASHINGTON',
      },
      {
        value: 'worldbank',
        label: 'WORLDBANK',
      }],
      loadingMessage: 'Searching...',
      errorMessage: 'Something weird happened!',
      notFoundMessage: 'No Datasets were found',
      timeout: null,
      page: 0,
      showRecentDatasets: true
    };
  },
  computed: {
    storeRouter() {
      return this.$store.route;
    },
    ...mapGetters({
      searchDatasets: 'getSearchListData',
      loading: 'getSearchLoading',
      error: 'getSearchError',
      selectedDataset: 'getSelectedDataset',
      recentDatasets: 'getRecentDatasets',
      searchLoading: 'getSearchLoading',
      selectedFilters: 'getSearchFilters'
    }),
    datasets() {
      if (this.showRecentDatasets && this.recentDatasets.length) {
        const recentIds = this.recentDatasets.map(d => d.id);
        return this.searchDatasets.filter(d => recentIds.indexOf(d.id) > -1);
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
  watch: {
    storeRouter() {
      if (this.$router.params.dataset) {
        this.$store.dispatch('setSelectedDataset', this.$router.to.params.dataset)
        .then(() => this.$store.dispatch('setModal', {
          isOpen: true,
          onClose: this.closeModal,
        }));
      }
      this.$router.next();
    }
  },
  components: {
    ArticleComponent,
    DatasetListComponent,
    DropdownComponent,
    ModalComponent,
    SpinnerComponent,
    ConsoleComponent,
    router,
    ButtonComponent
  },
};

</script>
