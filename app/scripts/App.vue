<template>
  <div id="app">
    <header :class="{'l-header': true, '-map': isExamplePage }">
      <router-view name="HeaderComponent"></router-view>
    </header>
    <main class="l-main">
      <router-view name="HeroComponent"></router-view>
      <router-view></router-view>
      <banner-component
        :cookie-name="bannerCookie"
        :action="hideBanner"
        :isVisible="bannerVisibility"
        heading="Connect with us!"
        body='API Highways is an early stage initiative. Please contact us if you have data to contribute, a potential use case, are a developer interested in using our tools, or for any other reason. For detailed information on how to get involved you can download/share our <a href="https://www.apihighways.org/static/doc/API_Highways.pdf" target="_blank">2-page PDF</a> summarizing this initiative.'
        actionName="Contact Us"
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
    },
    isAboutPage() {
      return this.$route.path.startsWith('/about');
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
