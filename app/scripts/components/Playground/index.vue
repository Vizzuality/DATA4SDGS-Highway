<template src="./playground-template.html"> </template>
<style lang="scss" src="./playground-style.scss"> </style>
<script>
import { mapGetters } from 'vuex';
import ArticleComponent from 'components/Article';
import DatasetListComponent from 'components/DatasetList';
import ModalComponent from 'components/Modal';
import DatasetComponent from 'components/Dataset';

export default{
  name: 'playground-component',
  created() {
    if (!this.featuredDatasets.length) this.$store.dispatch('getFeaturedDatasets');
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      featuredDatasets: 'getFeaturedListData',
      loading: 'getFeaturedLoading',
      error: 'getFeaturedError',
    })
  },
  components: {
    ArticleComponent,
    DatasetListComponent,
    ModalComponent,
    DatasetComponent,
  },
};
</script>
