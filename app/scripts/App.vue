<template>
  <div id="app">
    <header :class="{'l-header': true, '-over': isExamplePage, '-about': isAboutPage }">
      <router-view name="HeaderComponent"></router-view>
    </header>
    <main class="l-main">
      <router-view name="HeroComponent"></router-view>
      <router-view></router-view>
      <banner-component
        :cookie-name="bannerCookie"
        :action="hideBanner"
        :isVisible="bannerVisibility"
        heading="Welcome! This is a proof of concept website."
        body='Thank you for taking a look at SDG Data Highways. We would love to hear your feedback,
         in particular from your software engineers. The aim is to make it as fast as possible to
         discover and use SDG data in your applications. If you think we’re meeting the aim, or have
         some suggestions to help us improve the site, please send us feedback using
         <a href="https://insights.hotjar.com/s?siteId=395952&surveyId=18062">this survey.</a>'
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
