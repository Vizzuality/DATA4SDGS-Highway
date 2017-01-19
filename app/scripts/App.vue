<template>
  <div id="app">
    <header :class="{'l-header': true, '-over': isExamplePage }">
      <router-view name="HeaderComponent"></router-view>
    </header>
    <main class="l-main">
      <router-view name="HeroComponent"></router-view>
      <router-view></router-view>
      <banner-component
        :cookie-name="bannerCookie"
        :action="hideBanner"
        :isVisible="bannerVisibility"
        heading="Welcome! This is still a beta."
        body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat."
        actionName="Got it!"
      >
      </banner-component>
    </main>
    <footer v-if="!isExamplePage" class="l-footer">
      <router-view name="FooterComponent"></router-view>
    </footer>
  </div>
</template>

<style></style>

<script>
import BannerComponent from 'components/Banner';

export default {
  name: 'app',
  created() {
    // Actions for hydrating store
    this.$store.dispatch('setTimeline');
    this.$store.dispatch('getWaterRiskLayers');
    this.$store.dispatch('getWaterBasins');
  },
  mounted() {
    this.bannerVisibility = !sessionStorage.getItem(this.bannerCookie);
  },
  data() {
    return {
      bannerVisibility: true,
      bannerCookie: 'data4sdg-beta',
    };
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
  methods: {
    hideBanner() {
      sessionStorage.setItem(this.bannerCookie, 'true');
      this.bannerVisibility = false;
    },
  },
  components: {
    BannerComponent,
  },
};

</script>
