<template src="./console-template.html"> </template>

<style lang="scss" src="./console-style.scss"> </style>

<script>
import HTTPSnippet from 'httpsnippet';
import { mapGetters } from 'vuex';

export default{
  name: 'console-component',
  data() {
    return {
      languages: ['javascript', 'node', 'ruby', 'go', 'java', 'php', 'python', 'shell'],
      displayedLang: 'javascript',
    };
  },
  computed: {
    snippet() {
      const url = encodeURI(this.selectedDataset.connectorUrl);
      if (url) {
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
    }),
  },
  methods: {
    classList(item) {
      return item === this.displayedLang ? 'tab-bar-pill -active' : 'tab-bar-pill';
    },
    setDisplayedLang(lang) {
      this.displayedLang = lang;
    },
  },
};
</script>
