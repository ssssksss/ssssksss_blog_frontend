import usePlayerStore from "@store/playerStore";
import { useEffect } from "react";

const useInitYoutubePlayer = () => {
  const playerStore = usePlayerStore();
  useEffect(() => {
    const currentYoutube = window.localStorage.getItem("currentYoutube")
      ? JSON.parse(window.localStorage.getItem("currentYoutube")!)
      : "";
    const currentYoutubePlaylist = window.localStorage.getItem(
      "currentYoutubePlaylist",
    )
      ? JSON.parse(window.localStorage.getItem("currentYoutubePlaylist")!)
      : "";
    const playRepeatType = window.localStorage.getItem("playRepeatType");
    const isPlay = window.localStorage.getItem("isPlay");
    const isPlayRandom = window.localStorage.getItem("isPlayRandom")
      ? true
      : false;
  
    // 유튜브 제목 로컬스토리지에서 꺼내오기
    playerStore.setPlayer({
      currentYoutube,
      currentYoutubePlaylist,
      playRepeatType,
      isPlayRandom,
    });
  }, []);

  return { playerStore };
};
export default useInitYoutubePlayer;