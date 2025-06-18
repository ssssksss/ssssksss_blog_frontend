import { usePlayerControl } from "@hooks/usePlayerControl";
import { timeFunction } from "@utils/function/timeFunction";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import ModalButton from "src/component/common/modal/hybrid/ModalButton";
import usePlayerStore from "src/store/playerStore";
import YoutubePlayIconView from "../view/YoutubePlayIconView";
import YoutubePlayerModal from "./YoutubePlayerModal";

interface IMusicPlayerProps {
}

const MusicPlayer = (props: IMusicPlayerProps) => {
  const playerStore = usePlayerStore();
  const playerRef = useRef<ReactPlayer | null>(null);
  const { requestPlay } = usePlayerControl(); // 여러개의 탭 화면에서 재생/정지 공유
  const [isIframeLoaded, setIsIframeLoaded] = useState(false); // facade 용도
  // 플레이어 작동시 약 1초마다 실행되는 함수
  const handleProgress = (state: { playedSeconds: number; played: number }) => {
    playerStore.setPlayer({
      progressRatio: state.played,
      playedSeconds: state.playedSeconds,
    });
  };

  // 플레이어 실행시 실패할 경우 실행되는 함수
  const ReactPlayerError = () => {
    const playlist = playerStore.playlist.map((i) => {
      if (i.id == playerStore.currentYoutubePlaylist.id) {
        i.youtubeList = i.youtubeList.map((j) => {
          if (j.id != playerStore.currentYoutube.id) return j;
          j.title = "";
          j.tags = "";
          return j;
        });
        return i;
      }
      return i;
    });
    playerStore.setPlayer({
      playlist,
    });
    playerStore.removeCurrentYoutube();
  };

  // 플레이어의 컨텐츠가 작동이 완료된 후에 실행되는 함수
  const ReactPlayerEnded = () => {
    if (playerStore.playRepeatType == "one") {
      playerRef.current!.seekTo(0);
    }
    if (playerStore.playRepeatType == "all") {
      if (playerStore.isPlayRandom) {
        let max = playerStore.currentYoutubePlaylist.youtubeList.length;
        let num = Math.floor(Math.random() * max);
        playerStore.setPlayer({
          currentYoutube: playerStore.currentYoutubePlaylist.youtubeList[num],
          playedSeconds: 0,
          progressRatio: 0,
        });
        window.localStorage.setItem(
          "currentYoutube",
          JSON.stringify(playerStore.currentYoutubePlaylist.youtubeList[num]),
        );
      } else {
        playerStore.currentYoutubePlaylist.youtubeList.forEach((i, index) => {
          if (i.id == playerStore.currentYoutube.id) {
            playerStore.setPlayer({
              currentYoutube:
                playerStore.currentYoutubePlaylist.youtubeList[
                  playerStore.currentYoutubePlaylist.youtubeList.length - 1 ==
                  index
                    ? 0
                    : index + 1
                ],
              playedSeconds: 0,
              progressRatio: 0,
            });
            window.localStorage.setItem(
              "currentYoutube",
              JSON.stringify(
                playerStore.currentYoutubePlaylist.youtubeList[
                  playerStore.currentYoutubePlaylist.youtubeList.length - 1 ==
                  index
                    ? 0
                    : index + 1
                ],
              ),
            );
          }
        });
        playerStore.setPlayer({
          youtubePlay: false,
          playedSeconds: 0,
          progressRatio: 0,
        });
      }
      playerRef.current!.seekTo(0);
    }
    localStorage.setItem("progressRatio", "0");
    localStorage.setItem("playSeconds", "0");
  };

  // ✅ 새로고침 시 재생 시간 저장
  useEffect(() => {
    const handleBeforeUnload = () => {
      const storedPlayedSeconds = playerStore.playedSeconds;
      const storedProgressRatio = playerStore.progressRatio;
      localStorage.setItem("playedSeconds", String(storedPlayedSeconds));
      localStorage.setItem("progressRatio", String(storedProgressRatio));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [playerStore.progressRatio]);

  useEffect(() => {
    if (playerStore.youtubePlay) {
      setIsIframeLoaded(true);
    }
  }, [playerStore.youtubePlay]);

  return (
    <section className="grid w-full grid-rows-[3rem_2rem] bg-default-1">
      {/* 플레이 바가 보이는 UI */}
      <button
        className={
          "grid w-full cursor-pointer grid-cols-[3rem_auto] items-center transition-all duration-300 primary-border-radius"
        }
        onClick={() => {
          playerStore.setPlayer({
            youtubePlay: !playerStore.youtubePlay,
          });
          window.localStorage.setItem(
            "isPlay",
            !playerStore.youtubePlay ? "true" : "false",
          );
        }}
        disabled={!playerStore.currentYoutube.id}
      >
        <div className="pl-1">
          <YoutubePlayIconView youtubePlay={playerStore.youtubePlay} />
        </div>
        <div className="flex h-full flex-col justify-between px-1">
          <span className={"text-start text-[1rem]"}>
            {timeFunction.secToTime(playerStore.playedSeconds)} [
            {Math.floor(playerStore.progressRatio * 100)}%]
          </span>
          {isIframeLoaded &&
            <ReactPlayer
              width="0rem"
              height="0rem"
              url={
                playerStore.currentYoutube.youtubeUrl
              }
              muted={playerStore.isMuted}
              ref={playerRef}
              playing={playerStore.youtubePlay}
              onProgress={handleProgress}
              onReady={() => {
                const storedPlayed = parseFloat(
                  localStorage.getItem("progressRatio") || "0",
                );
                playerRef.current?.seekTo(storedPlayed, "fraction");
              }}
              onPlay={() => {
                requestPlay(); // 다른 탭에서 실행되고 있는 player 중단
              }}
              onError={() => {
                playerStore.setPlayer({
                  youtubePlay: false,
                });
                ReactPlayerError();
              }}
              onEnded={() => ReactPlayerEnded()}
            />
          }
          <input
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={playerStore.progressRatio}
            onChange={(e) => {
              playerStore.setPlayer({
                progressRatio: parseFloat(e.target.value),
              });
            }}
            onMouseUp={(e) => {
              playerRef.current?.seekTo(
                parseFloat(e.currentTarget.value),
                "fraction",
              );
            }}
            onTouchEnd={(e) => {
              playerRef.current?.seekTo(
                parseFloat(e.currentTarget.value),
                "fraction",
              );
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="h-full w-full bg-red-20 bg-transparent focus:outline-none disabled:bg-gray-40"
            disabled={!playerStore.currentYoutube.id}
          />
        </div>

      </button>
      {/* 하단에 어떤 음악인지 보여주는 UI */}
      <ModalButton
        buttonClassName={
          "min-h-[2rem] w-full overflow-hidden whitespace-nowrap box-border primary-border-radius"
        }
        modal={<YoutubePlayerModal />}
      >
        <div className="pl-full animate-marquee whitespace-nowrap px-1 hover:animate-none">
          {playerStore.currentYoutube.title || "아무런 노래가 없습니다."}
        </div>
      </ModalButton>
    </section>
  );
};

export default MusicPlayer;
