<template src="./countries-template.html"> </template>

<style lang="scss" src="./countries-style.scss"> </style>

<script>
import { mapGetters } from 'vuex';
import ArticleComponent from 'components/Article';
import RankingComponent from 'components/Ranking';

export default{
  name: 'countries-component',
  created() {
    if (!this.countries.length) this.$store.dispatch('setCountries');
  },
  computed: {
    ...mapGetters({
      countries: 'getCountries',
    }),
  },
  components: {
    ArticleComponent,
    RankingComponent,
  },
};
</script>

