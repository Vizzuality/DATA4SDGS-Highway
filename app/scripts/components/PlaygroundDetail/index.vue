<template src="./playground-detail-template.html"></template>
<style lang="scss" src="./playground-detail-style.scss"></style>
<script>
import store from 'store';
import { mapGetters } from 'vuex';
import findLast from 'lodash/findLast';
import ArticleComponent from 'components/Article';
import ConsoleComponent from 'components/Console';
import ButtonComponent from 'components/Button';
import IconComponent from 'components/Icon';
import DatasetComponent from 'components/Dataset';
import SpinnerComponent from 'components/Spinner';

export default {
  name: 'playground-detail-component',
  beforeRouteEnter(to, from, next) {
    if (to.params.dataset) {
      store.dispatch('setSelectedDataset', to.params.dataset);
    }
    next();
  },
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },
  mounted() {
    if (
      this.showCodeExamples &&
      this.metadata &&
      Object.keys(this.metadata.info).length > 0 &&
      this.$refs.metadataInfo
    ) {
      hljs.highlightBlock(this.$refs.metadataInfo);
    }
  },
  updated() {
    if (
      this.showCodeExamples &&
      this.metadata &&
      Object.keys(this.metadata.info).length > 0 &&
      this.$refs.metadataInfo
    ) {
      hljs.highlightBlock(this.$refs.metadataInfo);
    }
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  data() {
    const header = document.getElementById('header');
    return {
      fixSidebar: !!header && window.pageYOffset >= header.offsetHeight,
      activeAnchor: 'about'
    };
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
        console.log(this.isShallow);
        const details = [
          { heading: 'Owner / Source', value: this.metadata.sourceOrganization },
          { heading: 'Data download URL', value: this.metadata.dataSourceUrl },
          { heading: 'Type', value: this.selectedDataset.provider, info: this.isShallow },
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
    isShallow() {
      if (!this.selectedDataset) return false;
      return ['worldbank', 'hdx', 'genericindex', 'resourcewatch'].includes(this.selectedDataset.provider);
    },
    showCodeExamples() {
      return !this.isShallow || this.selectedDataset.provider === 'resourcewatch';
    },
    loading() {
      return this.$store.state.selectedDataset.selected.loading;
    },
    ...mapGetters({
      selectedDataset: 'getSelectedDataset',
      relatedDatasets: 'getRelatedDatasets'
    })
  },
  methods: {
    handleScroll() {
      const header = document.getElementById('header');
      const paddingOffset = 120;
      const examples = [
        { id: 'examples', el: document.getElementById('examples') },
        { id: 'info', el: document.getElementById('info') }
      ];
      const docs = [
        { id: 'docs', el: document.getElementById('docs') }
      ];
      const anchors = [
        { id: 'about', el: document.getElementById('about') },
        ...(this.showCodeExamples ? examples : docs),
        { id: 'related-datasets', el: document.getElementById('related-datasets') }
      ];
      this.fixSidebar = !!header && window.scrollY >= header.offsetHeight;
      const anchor = findLast(
        anchors,
        a => a.el && a.el.offsetTop < (window.scrollY + paddingOffset)
      );
      if (anchor) {
        this.activeAnchor = anchor && anchor.id;
      }
    },
    onRouteChange() {
      this.$store.dispatch('setSelectedDataset', this.$route.params.dataset);
    },
    scrollTo(selector) {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView();
    }
  },
  watch: {
    $route: 'onRouteChange'
  },
  components: {
    ArticleComponent,
    IconComponent,
    ConsoleComponent,
    ButtonComponent,
    DatasetComponent,
    SpinnerComponent
  },
};

</script>
