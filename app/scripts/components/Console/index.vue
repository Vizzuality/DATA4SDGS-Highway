<template src="./console-template.html"> </template>

<style lang="scss" src="./console-style.scss"> </style>

<script>
import HTTPSnippet from 'httpsnippet';
import { mapGetters } from 'vuex';
import ArticleComponent from 'components/Article';
import DatasetComponent from 'components/Dataset';
import IconComponent from 'components/Icon';

export default{
  name: 'console-component',
  data() {
    return {
      languages: ['javascript', 'node', 'ruby', 'go', 'java', 'php', 'python', 'shell'],
      displayedLang: 'javascript',
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
      let url = this.selectedDatasetURI;
      if (url) {
        url = encodeURI(url);
        const snippet = new HTTPSnippet({
          method: 'GET',
          url,
        });
        return snippet.convert(this.displayedLang);
      }
      return 'No Available Data';
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
    setDisplayedLang(lang) {
      // Google Analytics
      ga('send', 'event', 'Data', 'Change language', lang);
      this.displayedLang = lang;
    },
  },
  components: {
    ArticleComponent,
    DatasetComponent,
    IconComponent
  },
};
</script>
