<template src="./home-template.html"> </template>

<style lang="scss" src="./home-style.scss"> </style>

<script>
import router from 'router';
import ArticleComponent from 'components/Article';
import ButtonComponent from 'components/Button';
import IconComponent from 'components/Icon';
import SliderComponent from 'components/Slider';
import PartnersCarousel from 'components/PartnersCarousel';
import FeedbackComponent from 'components/Feedback';

const SHOW_FEEDBACK = global.SHOW_FEEDBACK;

export default {
  name: 'home-component',
  data() {
    return {
      showFeedback: SHOW_FEEDBACK,
    };
  },
  computed: {
    twitterSlides() {
      return this.$store.getters.getFormatedTweets;
    },
    tweetsAvailable() {
      return this.$store.getters.getTweetsAvailability;
    },
  },
  methods: {
    goToPlayground() {
      // Google Analytics
      ga('send', 'event', 'Home', 'Click Start', 'Click');
      this.$router.push('/data-sets');
    },
  },
  components: {
    ArticleComponent,
    ButtonComponent,
    IconComponent,
    SliderComponent,
    PartnersCarousel,
    FeedbackComponent,
    router,
  },
};
</script>
