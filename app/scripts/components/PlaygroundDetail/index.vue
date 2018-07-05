<template src="./playground-detail-template.html" ></template >
<style lang="scss" src="./playground-detail-style.scss" ></style >
<script >
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
      vocabulary() {
        if (this.selectedDataset && this.selectedDataset.vocabulary.length > 0) {
          return this.selectedDataset.vocabulary[0].attributes;
        }
        return null;
      },
      metadataDetails() {
        const details = [];

        const humanFriendlyType = (type) => {
          switch (type) {
            case 'bigquery':
              return 'Big Query';
            case 'gee':
              return 'Google Earth Engine';
            case 'cartodb':
              return 'Carto';
            case 'worldbank':
              return 'World Bank';
            case 'resourcewatch':
              return 'Resource Watch API';
            case 'hdx':
              return 'HDX Watch';
            case 'genericindex':
              return 'Generic indexed dataset';
            case 'un':
              return 'UN';
            case 'json':
              return 'JSON Document';
            case 'csv':
              return 'CSV Document';
            default:
              return type;
          }
        };

        if (this.selectedDataset.provider) {
          details.push({ heading: 'Type', value: humanFriendlyType(this.selectedDataset.provider), info: this.isShallow });
        }

        if (this.selectedDataset.id) {
          details.push({ heading: 'Identifier', value: this.selectedDataset.id });
        }

        if (this.metadata) {
          if (this.metadata.sourceOrganization) {
            details.push({ heading: 'Owner / Source', value: this.metadata.sourceOrganization });
          }

          if (this.metadata.dataSourceUrl) {
            details.push({
              heading: 'Data download URL',
              value: `<a href='${this.metadata.dataSourceUrl}' target="_blank" rel="noopener noreferrer">${this.metadata.dataSourceUrl}</a>`
            });
          }

          details.push({ heading: 'Language', value: (this.metadata.language === 'en' ? 'English' : this.metadata.language) });

          if (this.metadata.license) {
            details.push({ heading: 'License', value: this.metadata.license });
          }

          if (
            this.metadata.dataSourceEndpoint
            && this.metadata.dataSourceEndpoint !== this.metadata.dataSourceUrl
          ) {
            details.push({
              heading: 'Data source endpoint',
              value: `<a href='${this.metadata.dataSourceEndpoint}' target="_blank" rel="noopener noreferrer">${this.metadata.dataSourceEndpoint}</a>`
            });
          }
        }

        if (this.vocabulary) {
          details.push({ heading: 'Tags', value: this.vocabulary.tags.join(', ') });
        }
        return details.filter(detail => detail && (typeof detail.value !== 'undefined'));
      },
      isShallow() {
        if (!this.selectedDataset) return false;
        return ['worldbank', 'hdx', 'genericindex', 'resourcewatch'].includes(this.selectedDataset.provider);
      },
      showCodeExamples() {
        return this.selectedDataset && this.selectedDataset.provider !== 'genericindex' && (!this.isShallow || this.selectedDataset.provider === 'resourcewatch');
      },
      showDocsLink() {
        return this.selectedDataset && this.selectedDataset.provider !== 'genericindex' && this.isShallow && this.selectedDataset.provider !== 'resourcewatch';
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
        const bigPadding = !!(this.showDocsLink && !this.relatedDatasets);
        const paddingOffset = bigPadding ? 160 : 120;
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
      },
      openDocs() {
        switch (this.$store.state.selectedDataset) {
          case 'worldbank':
            window.open('https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information', '_blank');
            break;
          case 'resourcewatch':
            window.open('https://api.resourcewatch.org/', '_blank');
            break;
          case 'hdx':
            window.open('https://data.humdata.org/faq#body-faq-HDX_API', '_blank');
            break;
          case 'genericindex':
            window.open('https://datahelpdesk.worldbank.org/knowledgebase/topics/125589-developer-information', '_blank');
            break;
          case 'un':
            window.open('https://unstats.un.org/SDGAPI/swagger/', '_blank');
            break;
          default:
            window.open('https://doc.apihighways.org/index.html', '_blank');
            break;
        }
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

</script >
