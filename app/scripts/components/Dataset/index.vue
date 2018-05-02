<template src="./dataset-template.html"> </template>

<style lang="scss" src="./dataset-style.scss"> </style>

<script>
import router from 'router';
// import uniq from 'lodash/uniq';

export default{
  name: 'dataset-component',
  props: {
    dataset: {
      type: Object,
      required: true,
    },
    large: {
      type: Boolean
    },
  },
  data() {
    return {
      sources: {
        worldbank: 'WORLDBANK',
        joe_casola: 'JOE CASOLA, U. OF WASHINGTON',
        cait: 'CAIT',
        nasa: 'NASA',
        noaa: 'NOAA',
        iucn_unep_wcmc: 'IUCN & UNEP-WCMC',
      },
    };
  },
  computed: {
    idRoute() {
      return `/data-sets/${this.dataset.id}`;
    },
    name() {
      return this.dataset.name;
    },
    target() {
      return this.dataset.target;
    },
    goal() {
      return this.dataset.goal;
    },
    source() {
      return this.dataset.metadata[0] && this.dataset.metadata[0].attributes.sourceOrganization;
    },
    link() {
      const info = this.getMetadataInfo();
      return info ? info.source : null;
    },
  },
  methods: {
    selectDataset() {
      this.$router.push(`/data-sets/${this.dataset.id}`);
    },
    getMetadataInfo() {
      const metadata = this.dataset.metadata && this.dataset.metadata[0];
      if (typeof metadata !== 'undefined') {
        const attributes = metadata.attributes;
        if (attributes.info) {
          return attributes.info;
        }
      }
      return null;
    },
    getSourceByTag() {
      const tags = (this.dataset && this.dataset.vocabulary) ? this.dataset.vocabulary
        .filter(v => v.attributes.name === 'legacy')
        .map(v => (v.attributes.tags)) : [];

      let source = null;
      tags && tags.forEach((tag) => {
        if (this.sources[tag]) {
          source = this.sources[tag];
        }
      });
      return source;
    },
    isDataSetsPage() {
      return this.$route.params.dataset;
    }
  },
  components: {
    router,
  },
};
</script>
