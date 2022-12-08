import store from "../store/index";
export function selectOneSong(i) {
  //未初始化播放器
  if (!store.state.hlAudio.currentMusic) {
    store.state.hlAudio.currentMusic = i;
    store.state.hlAudio.musicList.push(store.state.hlAudio.currentMusic);
    store.state.hlAudio.currentIndex = 0;
    return;
  }
  //是否选择了与当前播放的歌曲一样id的
  let flag = false;
  if (store.state.hlAudio.currentMusic.id != i.id) {
    store.state.hlAudio.currentMusic = i;
  }
  store.state.recommendList.changeOrderMusicList = false;
  store.state.hlAudio.currentIndex++;
  //在播放器中的播放列表中添加
  store.state.hlAudio.musicList.forEach((item) => {
    if (item.id == i.id) {
      flag = true;
    }
  });
  if (!flag) {
    store.state.hlAudio.musicList.splice(
      store.state.hlAudio.currentIndex,
      0,
      store.state.hlAudio.currentMusic
    );
  }
}
