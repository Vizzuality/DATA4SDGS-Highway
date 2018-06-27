<template src="./playground-detail-template.html"></template>
<style lang="scss" src="./playground-detail-style.scss"></style>
<script>
import store from 'store';
import { mapGetters } from 'vuex';
import ArticleComponent from 'components/Article';
import ConsoleComponent from 'components/Console';
import SpinnerComponent from 'components/Spinner';

export default {
  name: 'playground-detail-component',
  beforeRouteEnter(to, from, next) {
    if (to.params.dataset) {
      store.dispatch('setSelectedDataset', to.params.dataset);
    }
    next();
  },
  mounted() {
    if (this.metadata && Object.keys(this.metadata.info).length > 0) {
      hljs.highlightBlock(this.$refs.metadataInfo);
    }
  },
  updated() {
    if (this.metadata && Object.keys(this.metadata.info).length > 0) {
      hljs.highlightBlock(this.$refs.metadataInfo);
    }
  },
  computed: {
    metadata() {
      if (this.selectedDataset && this.selectedDataset.metadata.length > 0) {
        return this.selectedDataset.metadata[0].attributes;
      }
      return null;
    },
    metadataDetails() {
      if (this.metadata) {
        const details = [
          { heading: 'Owner / Source', value: this.metadata.sourceOrganization },
          { heading: 'Data download URL', value: this.metadata.dataSourceUrl },
          { heading: 'Type', value: this.selectedDataset.provider },
          { heading: 'Identifier', value: this.metadata.dataset },
          { heading: 'Language', value: this.metadata.language },
          null,
          { heading: 'License', value: this.metadata.license }
        ];
        if (this.metadata.dataSourceEndpoint !== this.metadata.dataSourceUrl) {
          details[5] = { heading: 'Endpoint', value: this.metadata.dataSourceEndpoint };
        }
        return details.filter(detail => detail && (typeof detail.value !== 'undefined'));
      }
      return [];
    },
    ...mapGetters({
      selectedDataset: 'getSelectedDataset'
    })
  },
  methods: {},
  components: {
    ArticleComponent,
    SpinnerComponent,
    ConsoleComponent,
  },
};

</script>
