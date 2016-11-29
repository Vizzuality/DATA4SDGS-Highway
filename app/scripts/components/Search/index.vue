<template src="./search-template.html"> </template>
<style lang="scss" src="./search-style.scss"> </style>
<script>
import DropdownComponent from 'components/Dropdown';

export default{
  name: 'search-component',
  data() {
    return {
      filters: ['noaa', 'nasa', 'wri']
    };
  },
  components: {
    DropdownComponent,
  },
};
</script>
