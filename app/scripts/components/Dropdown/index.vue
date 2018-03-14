<template src="./dropdown-template.html"> </template>
<style lang="scss" src="./dropdown-style.scss"> </style>
<script>
import ButtonComponent from 'components/Button';
import vClickOutside from 'v-click-outside';
import CheckboxComponent from 'components/Checkbox';

export default{
  name: 'dropdown-component',
  props: {
    items: {
      type: Array
    },
    selectedItems: {
      type: String
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
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
    selectedLength() {
      return (this.selectedItems && `${this.selectedItems.split(',').length} selected`) || 'Filter by';
    }
  },
  methods: {
    toggleVisibility() {
      this.open = !this.open;
    },
    onClickOutside() {
      this.open = false;
    },
    selectItem(index) {
      this.selected = this.items[index];
      this.toggleVisibility();
    },
  },
  components: {
    CheckboxComponent,
    ButtonComponent
  },
};
</script>
