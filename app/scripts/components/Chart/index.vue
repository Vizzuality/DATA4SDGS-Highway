<template src="./chart-template.html"></template>

<style lang="scss" src="./chart-style.scss"></style>

<script>
import 'c3/c3.css';
import c3 from 'c3';

export default{
  name: 'chart-component',
  mounted() {
    this.chart = c3.generate({
      bindto: this.$refs[this.name],
      size: {
        width: undefined,
        height: undefined,
      },
      data: {
        json: this.formatedData,
        keys: {
          value: ['waterData', 'area'],
        },
        axes: {
          waterData: 'y2'
        },
        types: {
          area: 'line',
          waterData: 'bar',
        },
      },
      axis: {
        x: {
          show: false,
        },
        y: {
          show: false,
        },
        y2: {
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
      point: {
        show: false,
      },
    });
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    container: {
      type: [Number, String],
    },
  },
  computed: {
    name() {
      return `chart-container-${this.container}`;
    },
    formatedData() {
      return {
        area: this.options.pixel_area,
        waterData: Object.values(this.transition_types),
      };
    },
  },
  data() {
    return {};
  },
};

</script>
