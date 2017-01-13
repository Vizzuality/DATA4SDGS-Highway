<template src="./playground-template.html"></template>
<style lang="scss" src="./playground-style.scss"></style>
<script>
import router from 'router';
import store from 'store';
import { mapGetters } from 'vuex';
import ArticleComponent from 'components/Article';
import DatasetListComponent from 'components/DatasetList';
import ModalComponent from 'components/Modal';
import ConsoleComponent from 'components/Console';
import SpinnerComponent from 'components/Spinner';

export default{
  name: 'playground-component',
  created() {
    if (!this.featuredDatasets.length) this.$store.dispatch('getFeaturedDatasets');
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.dataset) {
      store.dispatch('setSelectedDataset', to.params.dataset)
      .then(() => store.dispatch('setModal', {
        isOpen: true,
        onClose: () => {
          router.push('/playground');
          store.dispatch('searchDatasets', '');
        },
      }));
    }
    next();
  },
  computed: {
    storeRouter() {
      return this.$store.route;
    },
    ...mapGetters({
      featuredDatasets: 'getFeaturedListData',
      loading: 'getFeaturedLoading',
      error: 'getFeaturedError',
      selectedDataset: 'getSelectedDataset',
      recentDatasets: 'getRecentDatasets',
      featuresLoading: 'getFeaturedLoading',
    }),
  },
  methods: {
    closeModal() {
      this.$router.push('/playground');
      this.$store.dispatch('searchDatasets', '');
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
    ModalComponent,
    SpinnerComponent,
    ConsoleComponent,
    router,
  },
};

</script>
