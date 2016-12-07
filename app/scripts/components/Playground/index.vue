<template src="./playground-template.html"> </template>
<style lang="scss" src="./playground-style.scss"> </style>
<script>
import { mapGetters } from 'vuex';
import ArticleComponent from 'components/Article';
import DatasetListComponent from 'components/DatasetList';

export default{
  name: 'playground-component',
  created() {
    this.$store.dispatch('getFeaturedDatasets');
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
  },
};
</script>
