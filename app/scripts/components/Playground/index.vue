<template src="./playground-template.html"></template>
<style lang="scss" src="./playground-style.scss"></style>
<script>
import router from 'router';
import store from 'store';
import { mapGetters } from 'vuex';
import ArticleComponent from 'components/Article';
import DatasetListComponent from 'components/DatasetList';
import ModalComponent from 'components/Modal';
import DatasetComponent from 'components/Dataset';
import ConsoleComponent from 'components/Console';
import SpinnerComponent from 'components/Spinner';

export default{
  name: 'playground-component',
  created() {
    if (!this.featuredDatasets.length) this.$store.dispatch('getFeaturedDatasets');
  },
  beforeRouteEnter(to, from, next) {
    if (to.params.dataset) {
      store.dispatch('setSelectedDataset', to.params.dataset).then(() => store.dispatch('openConsoleModal'));
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
      openModal: 'getConsoleModal',
      recentDatasets: 'getRecentDatasets',
      featuresLoading: 'getFeaturedLoading',
    }),
  },
  methods: {
    closeModal() {
      this.$store.dispatch('closeConsoleModal');
      this.$router.push('/playground');
    },
  },
  watch: {
    storeRouter() {
      if (this.$router.params.dataset) {
        this.$store.dispatch('setSelectedDataset', this.$router.to.params.dataset).then(() => this.$store.dispatch('openConsoleModal'));
      }
      this.$router.next();
    }
  },
  components: {
    ArticleComponent,
    DatasetListComponent,
    ModalComponent,
    DatasetComponent,
    ConsoleComponent,
    SpinnerComponent,
    router,
  },
};

</script>
