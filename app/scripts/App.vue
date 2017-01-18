<template>
  <div id="app">
    <header :class="{'l-header': true, '-over': isExamplePage }">
      <router-view name="HeaderComponent"></router-view>
    </header>
    <main class="l-main">
      <router-view name="HeroComponent"></router-view>
      <router-view></router-view>
    </main>
    <footer v-if="!isExamplePage" class="l-footer">
      <router-view name="FooterComponent"></router-view>
    </footer>
  </div>
</template>

<style></style>

<script>
export default {
  name: 'app',
  created() {
    this.$store.dispatch('setTimeline');
  },
  computed: {
    location() {
      const computedLocation = {};
      computedLocation.home = this.$route.path === '/';
      computedLocation.map = this.$route.path === '/map';

      return computedLocation;
    },
    isExamplePage() {
      return this.$route.path.startsWith('/examples/');
    }
  },
};

</script>
