const state = {
  innerAudioContext: null,
  currentMusic: null,
  currentSongUrl: null,
};

const getters = {
  innerAudioContext: () => {
    return uni.createInnerAudioContext();
  },
};
export default {
  namespaced: true,
  state,
  getters,
};
