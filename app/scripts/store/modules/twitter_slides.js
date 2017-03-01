import {
  SET_TWITTER_SLIDES_SUCCESS,
  SET_TWITTER_SLIDES_ERROR,
  SET_TWITTER_SLIDES_LOADING,
} from '../mutation-types';

const dummieData = [{
  entities: { urls: [{ expanded_url: 'https://www.google.com' }] },
  text: 'Google #hashtag #hashtag',
  user: { screen_name: 'GOOGLE' }
},
{
  entities: { urls: [{ expanded_url: 'https://www.yahoo.com' }] },
  text: 'Yahoo #hashtag #hashtag',
  user: { screen_name: 'YAHOO' }
}];

const twitter = {
  state: {
    timeline: [],
    loading: false,
    error: false,
  },
  mutations: {
    [SET_TWITTER_SLIDES_SUCCESS](state, timeline) {
      state.timeline = timeline;
    },
    [SET_TWITTER_SLIDES_ERROR](state, error) {
      state.error = error;
    },
    [SET_TWITTER_SLIDES_LOADING](state, loading) {
      state.loading = loading;
    },
  },
  actions: {
    setTimeline({ commit }) {
      return new Promise((resolve, reject) => {
        commit(SET_TWITTER_SLIDES_LOADING, true);
        commit(SET_TWITTER_SLIDES_ERROR, false);
        if (process.env.NODE_ENV === 'production') {
          fetch('/api/twitter')
            .then((response) => {
              if (response.status >= 400) throw new Error(response.status);

              return response.json();
            })
            .then((data) => {
              commit(SET_TWITTER_SLIDES_LOADING, false);
              commit(SET_TWITTER_SLIDES_SUCCESS, data.statuses);
              resolve();
            })
            .catch((error) => {
              commit(SET_TWITTER_SLIDES_LOADING, false);
              commit(SET_TWITTER_SLIDES_ERROR, error);
              reject();
            });
        } else {
          setTimeout(() => {
            commit(SET_TWITTER_SLIDES_LOADING, false);
            commit(SET_TWITTER_SLIDES_SUCCESS, dummieData);
            resolve();
          }, 4000);
        }
      });
    },
  },
  getters: {
    getFormatedTweets(state) {
      return state.timeline.map(tweet => ({
        url: tweet.entities.urls[0] ? tweet.entities.urls[0].expanded_url : null,
        text: tweet.text,
        user: tweet.user.screen_name
      }));
    },
    getTweetsAvailability(state) {
      return !state.loading && !state.error && state.timeline.length;
    },
  },
};

export default twitter;
