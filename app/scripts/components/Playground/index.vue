<template src="./playground-template.html"> </template>
<style lang="scss" src="./playground-style.scss"> </style>
<script>
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
  computed: {
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
    },
  },
  components: {
    ArticleComponent,
    DatasetListComponent,
    ModalComponent,
    DatasetComponent,
    ConsoleComponent,
    SpinnerComponent
  },
};
</script>
