<template src="./console-template.html"> </template>

<style lang="scss" src="./console-style.scss"> </style>

<script>
import HTTPSnippet from 'httpsnippet';
import ArticleComponent from 'components/Article';
import DatasetComponent from 'components/Dataset';
import IconComponent from 'components/Icon';

const BASE_URL = global.API_BASE_URL;

export default {
  name: 'console-component',
  props: {
    selectedDataset: {
      type: Object
    }
  },
  data() {
    return {
      displayedCodeLang: 'javascript',
      codeLanguages: ['javascript', 'node', 'ruby', 'go', 'java', 'php', 'python', 'shell']
    };
  },
  mounted() {
    hljs.highlightBlock(this.$refs.snippet);
  },
  updated() {
    this.$refs.snippet.innerText = this.snippet;
    hljs.highlightBlock(this.$refs.snippet);
  },
  computed: {
    selectedDatasetURI() {
      if (this.selectedDataset) {
        if (this.selectedDataset.provider === 'resourcewatch') {
          return `https://api.resourcewatch.org/v1/query?sql=SELECT * FROM ${this.selectedDataset.tableName}`;
        }
        return `${BASE_URL}/query?sql=SELECT * FROM ${this.selectedDataset.id}`;
      }
      return null;
    },
    snippet() {
      let url = this.selectedDatasetURI;
      if (url) {
        url = encodeURI(url);
        const snippet = new HTTPSnippet({
          method: 'GET',
          url,
        });
        return snippet.convert(this.displayedCodeLang);
      }
      return 'No Available Data';
    }
  },
  methods: {
    classListCode(item) {
      return item === this.displayedCodeLang ? 'tab-bar-pill -active' : 'tab-bar-pill';
    },
    setDisplayedCodeLang(lang) {
      // Google Analytics
      ga('send', 'event', 'Data', 'Change language', lang);
      this.displayedCodeLang = lang;
    }
  },
  components: {
    ArticleComponent,
    DatasetComponent,
    IconComponent
  },
};
</script>
