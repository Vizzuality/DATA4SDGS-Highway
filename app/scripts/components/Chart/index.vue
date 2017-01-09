<template src="./chart-template.html"></template>

<style lang="scss" src="./chart-style.scss"></style>

<script>
import 'c3/c3.css';
import c3 from 'c3';

export default{
  name: 'chart-component',
  mounted() {
    this.chart = c3.generate({
      bindto: this.$refs[this.chart],
      size: {
        width: undefined,
        height: undefined,
      },
      color: {
        pattern: ['#EFA600', '#ff0065'],
      },
      data: {
        columns: this.formatedData,
        types: {
          data1: 'line',
          data2: 'bar',
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
    chart() {
      return `chart-container-${this.container}`;
    },
    formatedData() {
      const data1 = ['data1', this.options.pixel_area];
      const data2 = Object.values(this.options.transition_types);

      data2.forEach(() => {
        data1.push(this.options.pixel_area);
      });
      data2.unshift('data2');
      return [data1, data2];
    },
  },
  data() {
    return {};
  },
};

</script>
