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
  data() {
    return {};
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
        return [
          { heading: 'Owner / Source', value: this.metadata.sourceOrganization },
          { heading: 'Data download URL', value: this.metadata.dataSourceUrl },
          { heading: 'Type', value: this.selectedDataset.connectorType },
          { heading: 'Identifier', value: this.selectedDataset.id },
          { heading: 'Language', value: this.metadata.language },
          { heading: 'Endpoint', value: this.selectedDataset.connectorUrl },
          { heading: 'License', value: '' },
          { heading: 'Resource', value: '' },
        ];
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
