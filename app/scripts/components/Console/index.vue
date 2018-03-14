<template src="./console-template.html"> </template>

<style lang="scss" src="./console-style.scss"> </style>

<script>
import HTTPSnippet from 'httpsnippet';
import { mapGetters } from 'vuex';
import ArticleComponent from 'components/Article';
import DatasetComponent from 'components/Dataset';
import IconComponent from 'components/Icon';
import uniq from 'lodash/uniq';

export default {
  name: 'console-component',
  data() {
    return {
      tab: 'code',
      displayedCodeLang: 'javascript',
      displayedLang: 'en',
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
    snippet() {
      if (this.tab === 'code') {
        let url = this.selectedDatasetURI;
        if (url) {
          url = encodeURI(url);
          const snippet = new HTTPSnippet({
            method: 'GET',
            url,
          });
          return snippet.convert(this.displayedCodeLang);
        }
      }
      if (this.tab === 'meta') {
        return JSON.stringify(this.selectedDataset.metadata.find(m =>
          m.attributes.language === this.displayedLang), null, 2);
      }
      return 'No Available Data';
    },
    languages() {
      return uniq(this.selectedDataset.metadata.map(m => m.attributes.language));
    },
    ...mapGetters({
      selectedDataset: 'getSelectedDataset',
      selectedDatasetURI: 'getSelectedDatasetURI',
    }),
  },
  methods: {
    classList(item) {
      return item === this.displayedLang ? 'tab-bar-pill -active' : 'tab-bar-pill';
    },
    classListCode(item) {
      return item === this.displayedCodeLang ? 'tab-bar-pill -active' : 'tab-bar-pill';
    },
    setTab(tab) {
      this.tab = tab;
    },
    setDisplayedCodeLang(lang) {
      // Google Analytics
      ga('send', 'event', 'Data', 'Change language', lang);
      this.displayedCodeLang = lang;
    },
    setDisplayedLang(lang) {
      // Google Analytics
      ga('send', 'event', 'Data', 'Change language', lang);
      this.displayedLang = lang;
    }
  },
  components: {
    ArticleComponent,
    DatasetComponent,
    IconComponent
  },
};
</script>
