<template src="./ranking-template.html"> </template>

<style lang="scss" src="./ranking-style.scss"> </style>

<script>
import ChartComponent from 'components/Chart';

export default{
  name: 'ranking-component',
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  methods: {
    hasProps(item) {
      return !!item.properties.pixel_area
      && !!Object.values(item.properties.transition_types).length;
    },
    selectItem(name) {
      this.$router.push(`/countries/${name}`);
    },
  },
  components: {
    ChartComponent,
  },
};
</script>
