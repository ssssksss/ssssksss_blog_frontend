import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { timeFunction } from "@utils/timeFunction";
import { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import ModalButton from "src/component/common/modal/hybrid/ModalButton";
import usePlayerStore from "src/store/playerStore";
import YoutubePlayerModal from "./YoutubePlayerModal";

interface IMusicPlayerProps {
}

const MusicPlayer = (props: IMusicPlayerProps) => {
  const playerStore = usePlayerStore();
  const playerRef = useRef<ReactPlayer | null>(null);

  const [playTime, setPlayTime] = useState({
    playedSeconds: 0,
    played: 0,
  });

  const handleProgress = (state: { playedSeconds: number; played: number }) => {
    setPlayTime({
      playedSeconds: state.playedSeconds,
      played: state.played,
    });
  };

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
      }
      playerRef.current!.seekTo(0);
    }
  };

  useEffect(() => {
  // ✅ 새로고침 시 재생 시간 저장
    const handleBeforeUnload = () => {
      const storedPlayedSeconds = playTime.playedSeconds;
      const storedPlayed = playTime.played;
      localStorage.setItem("playedSeconds", String(storedPlayedSeconds));
      localStorage.setItem("played", String(storedPlayed));
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [playTime.played]);

  return (
    <section className="grid w-full grid-rows-[3rem_2rem] bg-default-1">
      {/* 플레이 바가 보이는 UI */}
      <button
        className={
          "grid h-[3rem] w-full cursor-pointer grid-cols-[3rem_auto] items-center transition-all duration-300 hover:bg-primary-20 disabled:cursor-not-allowed disabled:bg-gray-80"
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
        <div className="h-full default-primary-outline default-flex">
          {playerStore.youtubePlay ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </div>
        <div className="flex h-full w-[17rem] flex-col justify-between px-1">
          <span className={"text-start text-[1rem]"}>
            {timeFunction.secToTime(playTime.playedSeconds)} [
            {Math.floor(playTime.played * 100)}%]
          </span>
          <ReactPlayer
            width="0rem"
            height="0rem"
            url={
              playerStore.currentYoutube.youtubeUrl
                ? playerStore.currentYoutube.youtubeUrl
                : "https://www.youtube.com/watch?v=eyyAUFxlnGg"
            }
            muted={playerStore.isMuted}
            ref={playerRef}
            playing={playerStore.youtubePlay}
            onProgress={handleProgress}
            onReady={() => {
              const storedPlayed = parseFloat(
                localStorage.getItem("played") || "0",
              );
              playerRef.current?.seekTo(storedPlayed, "fraction");
            }}
            onError={() => {
              console.log("MusicPlayer.tsx 파일 : error1");
              ReactPlayerError();
            }}
            onEnded={() => ReactPlayerEnded()}
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={playTime.played}
            onChange={(e) =>
            {
              setPlayTime((prev) => ({
                playedSeconds: prev.playedSeconds,
                played: parseFloat(e.target.value),
              }));
            }
            }
            onMouseUp={(e) =>
            {
              playerRef.current?.seekTo(
                parseFloat(e.currentTarget.value),
                "fraction",
              );
            }
            }
            onTouchEnd={(e) =>
            {
              playerRef.current?.seekTo(
                parseFloat(e.currentTarget.value),
                "fraction",
              );
            }
            }
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
          "min-h-[2rem] w-full overflow-hidden whitespace-nowrap box-border outline outline-2 outline-offset-[-2px] outline-black-40 rounded-xl"
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
