<template src="./dropdown-template.html"> </template>
<style lang="scss" src="./dropdown-style.scss"> </style>
<script>
import ButtonComponent from 'components/Button';

export default{
  name: 'dropdown-component',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      open: false,
      selected: null
    };
  },
  components: {
    ButtonComponent,
  },
  methods: {
    toggleVisibility() {
      this.open = !this.open;
    },
    selectItem(index) {
      this.selected = this.items[index];
      this.toggleVisibility();
    },
  },
};
</script>
