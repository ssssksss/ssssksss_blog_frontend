// usePlayerControl.ts
import usePlayerStore from "@store/playerStore";
import { useEffect, useRef } from "react";

export function usePlayerControl() {
  const channelRef = useRef<BroadcastChannel>();
  const playerStore = usePlayerStore();

  useEffect(() => {
    const channel = new BroadcastChannel("video-control");
    channelRef.current = channel;

    channel.onmessage = (event) => {
      if (event.data === "play") {
        // 다른 탭에서 재생 시작 → 나는 중지
        // setCanPlay(false);
        playerStore.setPlayer({
          youtubePlay: false
        });
      } else if (event.data === "pause") {
        playerStore.setPlayer({
          youtubePlay: true,
        });
        // setCanPlay(true);
      }
    };

    return () => {
      channel.close();
    };
  }, []);

  const requestPlay = () => {
    if (channelRef.current) {
      channelRef.current.postMessage("play");
    }
    playerStore.setPlayer({
      youtubePlay: true,
    });
    // setCanPlay(true);
  };

  return { requestPlay };
}
