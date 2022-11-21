const state = {
  innerAudioContext: null,
  currentMusic: null,
  currentSongUrl: null,
  changeMusic: 0,
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
