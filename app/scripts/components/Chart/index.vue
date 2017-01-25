<template src="./chart-template.html"></template>

<style lang="scss" src="./chart-style.scss"></style>

<script>
import 'c3/c3.css';
import c3 from 'c3';

export default{
  name: 'chart-component',
  mounted() {
    this.chart = c3.generate(this.computedOptions);
  },
  props: {
    options: {
      type: Object,
      required: true
    },
    chartData: {
      type: Object,
      required: true
    },
    container: {
      type: [Number, String],
    },
  },
  computed: {
    chart() {
      return `chart-container-${this.container}`;
    },
    formatedData() {
      const data = Object.values(this.chartData.transition_types);
      data.unshift('data');

      return [data];
    },
    computedOptions() {
      const options = Object.assign({}, this.options);
      options.bindto = this.$refs[this.chart];
      options.data.columns = this.formatedData;
      return options;
    },
  },
};

</script>
