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

//音乐列表改变,标红当前播放歌曲
export function changeMusicList(list) {
  if (!store.state.hlAudio.currentMusic) {
    list.forEach((i) => {
      i.isPlay = false;
    });
  } else {
    list.forEach((i) => {
      i.isPlay = i.id == store.state.hlAudio.currentMusic.id;
    });
  }
  store.state.recommendList.musicList = list;
  return list;
}

export function changeCurrentMusic(item, list) {
  list.forEach((i) => {
    i.isPlay = i.id == item.id;
  });
  store.state.recommendList.musicList = list;
  return list;
}

export function playAllMusic(list) {
  let flag = false; //当前播放音乐是否在播放音乐列表
  //如果播放列表中存在当前播放歌曲，则播放全部不默认播放第一条
  if (store.state.hlAudio.currentMusic) {
    list.forEach((i) => {
      if (i.id == store.state.hlAudio.currentMusic.id) {
        flag = true;
        return;
      }
    });
  }

  if (!flag) {
    store.state.hlAudio.currentMusic = list[0];
    store.state.hlAudio.currentIndex = 0;
  }
}
