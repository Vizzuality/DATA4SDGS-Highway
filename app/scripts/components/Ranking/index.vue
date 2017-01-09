<template src="./ranking-template.html"> </template>

<style lang="scss" src="./ranking-style.scss"> </style>

<script>
import ChartComponent from 'components/Chart';

export default {
  name: 'ranking-component',
  props: {
    list: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      chartOptions: {
        size: {
          width: undefined,
          height: undefined,
        },
        color: {
          pattern: ['#EFA600'],
        },
        data: {
          types: {
            data: 'bar',
          },
        },
        axis: {
          x: {
            show: false,
          },
          y: {
            show: false,
          },
        },
        bar: {
          width: {
            ratio: 0.75
          },
        },
        interaction: {
          enabled: false,
        },
        legend: {
          show: false
        },
        tooltip: {
          show: false,
        },
      }
    };
  },
  methods: {
    hasProps(item) {
      return !!Object.values(item.properties.transition_types).length;
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
