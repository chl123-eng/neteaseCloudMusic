const state = {
  innerAudioContext: null,
  currentMusic: null,
  currentSongUrl: null,
  playSeq: 1,
  musicList: [],
  currentIndex: 0,
  isPlay: false,
  currentSongAllTime: 0,
  currentSongPlayTime: 0, //当前播放的时间
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
