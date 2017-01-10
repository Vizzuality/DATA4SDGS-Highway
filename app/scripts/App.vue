<template>
  <div id="app">
    <header v-bind:class="{'l-header': true, '-over': location.map }">
      <router-view name="HeaderComponent"></router-view>
    </header>
    <main class="l-main">
      <router-view name="HeroComponent"></router-view>
      <router-view></router-view>
    </main>
    <footer v-if="!location.map" class="l-footer">
      <router-view name="FooterComponent"></router-view>
    </footer>
  </div>
</template>

<style></style>

<script>
export default {
  name: 'app',
  computed: {
    location() {
      const computedLocation = {};
      computedLocation.home = this.$route.path === '/';
      computedLocation.map = this.$route.path === '/map';
      return computedLocation;
    },
  },
};

</script>
