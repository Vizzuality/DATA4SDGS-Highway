<template src="./dropdown-template.html"> </template>
<style lang="scss" src="./dropdown-style.scss"> </style>
<script>
import ButtonComponent from 'components/Button';
import CheckboxComponent from 'components/Checkbox';

export default{
  name: 'dropdown-component',
  props: {
    items: {
      type: Array
    },
  },
  data() {
    return {
      open: false,
      selected: null,
      buttonClasses: '-bordered dropdown-button',
    };
  },
  computed: {
    getButtonClasses() {
      if (this.open) {
        return `${this.buttonClasses} -opened`;
      }
      return this.buttonClasses;
    },
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
  components: {
    ButtonComponent,
    CheckboxComponent,
  },
};
</script>
