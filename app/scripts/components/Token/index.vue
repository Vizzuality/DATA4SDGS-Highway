<template src="./template.html"></template>
<style lang="scss" src="./style.scss"></style>

<script>
  import ButtonComponent from 'components/Button';
  import store from 'store';
  import { mapState } from 'vuex';

  export default {
    name: 'token-page',
    components: {
      ButtonComponent
    },
    computed: {
      ...mapState({
        token: state => state.token.token,
      }),
    },
    methods: {
      selectAll() {
        document.getElementById('token').select();
      },
      getToken() {
        store.dispatch('setToken');
        this.selectAll();
      }
    }
  };
</script>
