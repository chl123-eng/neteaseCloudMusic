const state = {
  innerAudioContext: null,
  currentMusic: null,
  currentSongUrl: null,
  playSeq: 1,
  musicList: [],
  currentIndex: 0,
  isPlay: false,
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
