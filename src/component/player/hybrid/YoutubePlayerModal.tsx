import Button from "@component/common/button/hybrid/Button";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import usePlayerStore from "@store/playerStore";
import useToastifyStore from "@store/toastifyStore";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// src\component\common\layout\hybrid\Header.tsx 로컬에서 데이터를 받아옴

const YoutubePlayerModal = (props: IModalComponent) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const playerStore = usePlayerStore();
  const [openPlaylist, setOpenPlaylist] = useState<IYoutubePlaylist | null>(
    playerStore.currentYoutubePlaylist.id
      ? playerStore.currentYoutubePlaylist
      : null,
  ); // 화면에 보이는 플레이리스트
  const toastifyStore = useToastifyStore();

  const handlePlaylist = (item: IYoutubePlaylist) => {
    setOpenPlaylist((prev) => (prev != null ? null : item));
  };

  const createPlaylist = async () => {
    const title = inputRef.current?.value;
    const res = await fetch("/api/youtube/playlist", {
      method: "POST",
      body: JSON.stringify({playlistTitle: title}),
    });

    if (!res.ok) {
      return {
        type: "error",
        message: "플리 생성 실패"
      };
    }
    const result: createYoutubePlaylistResponse = await res.json();
    playerStore.setPlayer({
      playlist: [...playerStore.playlist, result.data],
    });
    inputRef.current!.value = "";
    return {
      message: "플리 생성 성공",
    };
  };

  const handlePlayItemClick = (item: IYoutube) => {
    playerStore.setPlayer({
      currentYoutube: item,
      currentYoutubePlaylist: openPlaylist!,
    });
    window.localStorage.setItem("currentYoutube", JSON.stringify(item));
    window.localStorage.setItem(
      "currentYoutubePlaylist",
      JSON.stringify(openPlaylist),
    );
    playerStore.setPlayer({
      playedSeconds: 0,
      progressRatio: 0
    });
  };

  const deletePlaylist = async (id: number) => {
    const res = await fetch(`/api/youtube/playlist?id=${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    if (!res.ok) {
      return {
        type: "error",
        message: "플리 제거 실패",
      };
    }
    let currentYoutubePlaylist: IYoutubePlaylist | null = JSON.parse(
      localStorage.getItem("currentYoutubePlaylist")!,
    );
    if (currentYoutubePlaylist) {
      if (currentYoutubePlaylist.id == id) {
        localStorage.removeItem("currentYoutubePlaylist");
        localStorage.removeItem("currentYoutube");
        playerStore.setPlayer({
          progressRatio: 0,
          playedSeconds: 0,
        });
      }
    }
    playerStore.setPlayer({
      playlist: playerStore.playlist.filter((i) => i.id != id),
    });
    setOpenPlaylist(null);
    return {
      message: "플리 삭제 성공"
    };
  };

  // ==================================================================

  const createYoutubeUrl = async () => {
    const url = inputRef.current?.value;
    const _url = new URL(url || "");
    const regex = /^(https?:\/\/|www\.)[^\s]+(\?|\&)([^&]*v=([^&]*))[^]*$/;
    if (!regex.test(url || "")) {
      return;
    }
    const v = _url.searchParams.get("v");
    const res = await fetch("/api/youtube/url", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        youtubePlaylistId: openPlaylist?.id,
        youtubeUrlKeyId: v,
        youtubeUrl: url,
      }),
    });

    if (!res.ok) {
      return {
        type: "error",
        message: "에러",
      };
    }
    const result: createYoutubeUrlResponse = await res.json();
    const temp: IYoutubePlaylist[] = playerStore.playlist.map((i) => {
      if (i.id == openPlaylist?.id) {
        return {
          ...i,
          youtubeList: [...i.youtubeList, result.data.youtube], // youtubeList 업데이트
        };
      } else {
        return i; // 다른 항목은 그대로 반환
      }
    });
    playerStore.setPlayer({
      playlist: temp,
    });
    if (playerStore.currentYoutubePlaylist.id == openPlaylist?.id) {
      playerStore.setPlayer({
        playlist: temp,
        currentYoutubePlaylist: temp.filter((i) => i.id == openPlaylist.id)[0],
      });
      localStorage.setItem(
        "currentYoutubePlaylist",
        JSON.stringify(temp.filter((i) => i.id == openPlaylist.id)[0]),
      );
    }
    inputRef.current!.value = "";
    return {
      message: "음악 추가"
    };
  };

  const deleteYoutube = async (id: number) => {
    const res = await fetch(`/api/youtube/url?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      return {
        type: "error",
        message: "에러",
      };
    }
    const temp = playerStore.playlist.map((i) => {
      if (i.id == openPlaylist?.id) {
        return {
          ...i,
          youtubeList: i.youtubeList.filter((j) => j.id != id),
        };
      } else {
        return i;
      }
    });
    playerStore.setPlayer({
      playlist: temp,
    });
    const currentYoutube: IYoutube = playerStore.currentYoutube;
    if (currentYoutube.id == id) {
      localStorage.removeItem("currentYoutube");
      let currentYoutubePlaylist: IYoutubePlaylist =
        playerStore.currentYoutubePlaylist;
      currentYoutubePlaylist.youtubeList =
        currentYoutubePlaylist.youtubeList.filter(
          (youtube) => youtube.id != id,
        );
      localStorage.setItem(
        "currentYoutubePlaylist",
        JSON.stringify(currentYoutubePlaylist),
      );
      playerStore.removeCurrentYoutube();
      playerStore.setPlayer({
        currentYoutubePlaylist: currentYoutubePlaylist,
        playedSeconds: 0,
        progressRatio: 0,
      });
    }
    return {
      message: "삭제 성공"
    };
  };

  const handlePlayBackwardClick = () => {
    if (!playerStore.currentYoutubePlaylist.id) return;
    playerStore.currentYoutubePlaylist.youtubeList.forEach((i, index) => {
      if (i.id == playerStore.currentYoutube.id) {
        const newCurrentYoutube =
          playerStore.currentYoutubePlaylist.youtubeList[
            index == 0 ? 0 : index - 1
          ];
        // store
        playerStore.setPlayer({
          currentYoutube: newCurrentYoutube,
          playedSeconds: 0,
          progressRatio: 0,
        });
        // localStorage
        window.localStorage.setItem(
          "currentYoutube",
          JSON.stringify(newCurrentYoutube),
        );
      }
    });
  };

  const handlePlayForwardClick = () => {
    if (!playerStore.currentYoutubePlaylist.id) return;
    playerStore.currentYoutubePlaylist.youtubeList.forEach((i, index) => {
      if (i.id == playerStore.currentYoutube.id) {
        const newCurrentYoutube =
          playerStore.currentYoutubePlaylist.youtubeList[
            index == playerStore.currentYoutubePlaylist.youtubeList.length - 1
              ? index
              : index + 1
          ];
        // store
        playerStore.setPlayer({
          currentYoutube: newCurrentYoutube,
          playedSeconds: 0,
          progressRatio: 0,
        });
        // localStorage
        window.localStorage.setItem(
          "currentYoutube",
          JSON.stringify(newCurrentYoutube),
        );
      }
    });
  };

  const copyLinkHandler = (youtubeUrl: string): void => {
    navigator.clipboard.writeText(youtubeUrl);
    toastifyStore.setToastify({
      type: "success",
      message: "복사되었습니다.",
    });
  };

  const handlePlayRepeat = () => {
    if (!playerStore.playRepeatType) {
      playerStore.setPlayer({
        playRepeatType: "one",
      });
      localStorage.setItem("playRepeatType", "one");
    } else if (playerStore.playRepeatType == "one") {
      playerStore.setPlayer({
        playRepeatType: "all",
      });
      localStorage.setItem("playRepeatType", "all");
    } else {
      playerStore.setPlayer({
        playRepeatType: null,
      });
      localStorage.removeItem("playRepeatType");
    }
  };

  const handlePlaybackMode = () => {
    playerStore.setPlayer({
      isPlayRandom: !playerStore.isPlayRandom,
    });
    localStorage.setItem("isPlayRandom", !playerStore.isPlayRandom + "");
  };

  useEffect(() => {
    const getPlaylist = async () => {
      const res = await fetch("/api/youtube/playlist", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        next: {tags: ["getPlaylist"]},
      });

      if (!res.ok) {
        return {
          type: "error",
          message: "에러",
        };
      }
      const result: getYoutubePlaylistResponse = await res.json();
      playerStore.setPlayer({
        isFetchYoutubePlaylist: true,
        playlist: result.data,
        playRepeatType: localStorage.getItem("playRepeatType"),
        isPlayRandom:
          localStorage.getItem("isPlayRandom") == "true" ? true : false,
      });
    };
    // 처음 요청이 아니라면 요청을 보내지 않음
    if (!playerStore.isFetchYoutubePlaylist) {
      getPlaylist();
    }
  }, []);

  return (
    <ModalTemplate
      className={"h-[calc(100vh-1rem)] w-[80vw] max-h-[60rem] min-w-[22.5rem] bg-gradient"}
    >
      {props.closeButtonComponent}
      <div className="relative z-0 flex h-full w-full justify-end gap-2">
        <div className="absolute left-0 top-1/2 w-full max-w-[37.5rem] -translate-y-1/2 default-flex">
          <div
            className={`relative aspect-square w-[calc(100%-1rem)] max-w-[100vw] overflow-hidden rounded-[50%] will-change-transform default-flex ${playerStore.currentYoutube.id && "outline outline-2 -outline-offset-2 outline-black-80/50"} ${playerStore.youtubePlay ? "animate-slowSpin" : "animate-none"}`}
          >
            {playerStore.currentYoutube?.imageUrl && (
              <Image src={playerStore.currentYoutube.imageUrl} alt={""} fill />
            )}
          </div>
        </div>
        <div className="z-50 flex h-[100%-8.5rem] max-h-[100%-8rem] w-full max-w-[37.5rem] flex-col p-2">
          {/* z-50을 지우게 되면 플레이리스트가 삭제되는 문제가 발생 */}
          <div className={"flex min-h-[3.75rem] w-full z-50"}>
            <input
              ref={inputRef}
              placeholder={
                openPlaylist == null
                  ? "플레이리스트 명을 입력하세요"
                  : "유튜브 url을 입력하세요"
              }
              type={"text"}
              className="mr-1 w-full rounded-[1rem] bg-white-100/90 pl-1"
              maxLength={!openPlaylist?.id ? 30 : 500}
            />
            <Button
              className="relative aspect-square h-full flex-shrink-0 rounded-[1rem] bg-white-100/90"
              onClick={() =>
                props.loadingWithHandler(()=>
                  openPlaylist == null ? createPlaylist() : createYoutubeUrl(),
                )
              }
            >
              추가
            </Button>
          </div>
          <ul
            className={`relative mt-2 flex h-[calc(100%-8.5rem)] w-full flex-col gap-y-1 pb-1 ${openPlaylist != null ? "pt-[4.5rem]" : "overflow-y-scroll scrollbar-hide"}`}
          >
            {playerStore.playlist.map((i, index) => (
              <li
                key={index}
                id={i.id + ""}
                className={`flex w-full flex-shrink-0 cursor-pointer items-center rounded-[1rem] bg-white-100/90 pl-1 duration-1000 ease-in-out ${openPlaylist != null ? (openPlaylist.id == i.id ? "absolute left-0 top-0 mt-1 flex min-h-[4rem] animate-outlineBlink outline" : "h-0 translate-y-[-10vh] opacity-0 -z-10") : "h-[4rem]"}`}
                onClick={() => handlePlaylist(i)}
              >
                <div className="flex w-full items-center justify-start pl-1">
                  {i.title}
                </div>
                <div className="relative h-auto w-[4rem] rounded-[1rem] p-[0.0625rem] text-sm default-flex glassmorphism">
                  {i.youtubeList.length} 개
                </div>
                <button
                  className="relative h-full w-[3.75rem] px-2 default-flex"
                  onClick={() =>
                    props.loadingWithHandler(() => deletePlaylist(i.id))
                  }
                >
                  <Image
                    alt=""
                    src={"/images/icons/ic-delete-black.svg"}
                    width={48}
                    height={48}
                  />
                </button>
              </li>
            ))}
            {
              // 노래가 있는 UI
              openPlaylist != null && (
                <div
                  className={
                    "flex h-full w-full animate-fadeUp flex-col gap-y-1 overflow-y-scroll rounded-[1rem]"
                  }
                >
                  {playerStore.playlist
                    .filter((i) => i.id == openPlaylist?.id)[0]
                    ?.youtubeList.map((i, index) => (
                      <li
                        key={index}
                        className={`flex h-[5rem] w-full flex-shrink-0 cursor-pointer items-center duration-1000 ease-in-out hover:bg-primary-60 ${playerStore.currentYoutube?.id == i.id ? "bg-gradient-purple-40-blue-40-70deg" : i.title == "" ? "bg-red-20" : "bg-white-100/90"}`}
                        onClick={() => handlePlayItemClick(i)}
                      >
                        <div className={"aspect-square h-full default-flex"}>
                          <Image
                            alt=""
                            src={`${i.imageUrl}`}
                            width={72}
                            height={72}
                            className={"rounded-[.25rem]"}
                          />
                        </div>
                        <div className="flex w-full flex-col gap-y-1 overflow-hidden pl-1">
                          <div className="w-fit whitespace-nowrap font-DNFBitBitv2 hover:animate-marquee">
                            {i.title || "재생할 수 없는 노래입니다."}
                          </div>
                          <div className="whitespace-nowrap text-sm text-black-40 hover:animate-marquee">
                            {i.tags}
                          </div>
                        </div>
                        <div className="flex gap-x-1 px-2">
                          <Image
                            alt=""
                            src={"/images/icons/ic-copy-black.svg"}
                            width={48}
                            height={48}
                            onClick={(e) => {
                              e.stopPropagation();
                              copyLinkHandler(i.youtubeUrl);
                            }}
                          />
                          <Image
                            alt=""
                            src={"/images/icons/ic-delete-black.svg"}
                            width={48}
                            height={48}
                            onClick={(e) => {
                              e.stopPropagation();
                              props.loadingWithHandler(()=>deleteYoutube(i.id));
                            }}
                          />
                        </div>
                      </li>
                    ))}
                </div>
              )
            }
          </ul>
          <div
            className={
              "mt-auto h-[3rem] w-full flex-shrink-0 rounded-[1rem] bg-white-100/90 py-1 sm:h-[4rem]"
            }
          >
            {/* 버튼 5개 */}
            <div className="h-full w-full gap-x-4 default-flex">
              <button
                onClick={() => handlePlaybackMode()}
                className="relative flex aspect-square h-[80%] items-center justify-center rounded-[50%] outline outline-2 outline-offset-[-0.125rem] outline-gray-60 hover:bg-primary-20 focus:outline"
              >
                {playerStore.isPlayRandom ? (
                  <div className={"relative h-[50%] w-full"}>
                    <Image
                      alt=""
                      src={"/images/icons/ic-shuffle.svg"}
                      fill
                      style={{objectFit: "contain"}}
                    />
                  </div>
                ) : (
                  <div className={"relative h-[50%] w-full"}>
                    <Image
                      alt=""
                      src={"/images/icons/ic-arrow-right-arrow-left.svg"}
                      fill
                      style={{objectFit: "contain"}}
                    />
                  </div>
                )}
              </button>
              <button
                onClick={() => handlePlayBackwardClick()}
                className="relative flex aspect-square h-[80%] items-center justify-center rounded-[50%] outline outline-2 outline-offset-[-0.125rem] outline-gray-60 hover:bg-primary-20 focus:outline"
              >
                <div className={"relative h-[50%] w-full"}>
                  <Image
                    alt=""
                    src={"/images/icons/ic-backward-step.svg"}
                    fill
                    style={{objectFit: "contain"}}
                  />
                </div>
              </button>
              <button
                className="relative flex aspect-square h-full items-center justify-center rounded-[50%] outline outline-2 outline-offset-[-0.125rem] outline-gray-60 hover:bg-primary-20 focus:outline"
                onClick={() => {
                  playerStore.setPlayer({
                    youtubePlay: !playerStore.youtubePlay,
                  });
                  window.localStorage.setItem(
                    "isPlay",
                    !playerStore.youtubePlay ? "true" : "false",
                  );
                }}
              >
                {playerStore.youtubePlay ? (
                  <FontAwesomeIcon
                    icon={faPause}
                    className={"h-5/8 aspect-square default-flex"}
                  />
                ) : (
                  <FontAwesomeIcon
                    icon={faPlay}
                    className={"h-5/8 aspect-square default-flex"}
                  />
                )}
              </button>
              <button
                onClick={() => handlePlayForwardClick()}
                className="relative flex aspect-square h-[80%] items-center justify-center rounded-[50%] outline outline-2 outline-offset-[-0.125rem] outline-gray-60 hover:bg-primary-20 focus:outline"
              >
                <div className={"relative h-[50%] w-full"}>
                  <Image
                    alt=""
                    src={"/images/icons/ic-forward-step.svg"}
                    fill
                    style={{objectFit: "contain"}}
                  />
                </div>
              </button>
              <button
                className="relative flex aspect-square h-[80%] items-center justify-center rounded-[50%] outline outline-2 outline-offset-[-0.125rem] outline-gray-60 hover:bg-primary-20 focus:outline"
                onClick={() => handlePlayRepeat()}
              >
                <div className={"relative h-[50%] w-full"}>
                  <Image
                    alt=""
                    src={"/images/icons/ic-rotate.svg"}
                    fill
                    style={{objectFit: "contain"}}
                  />
                </div>
                {playerStore.playRepeatType == null && (
                  <div
                    className={
                      "absolute bottom-[-2px] right-[-2px] h-4 w-4 text-[0.75rem] default-primary-outline"
                    }
                  >
                    X
                  </div>
                )}
                {playerStore.playRepeatType == "one" && (
                  <div
                    className={
                      "absolute bottom-[-2px] right-[-2px] h-4 w-4 text-[0.75rem] default-primary-outline"
                    }
                  >
                    1
                  </div>
                )}
                {playerStore.playRepeatType == "all" && (
                  <div
                    className={
                      "absolute bottom-[-2px] right-[-2px] h-4 w-4 text-[0.75rem] default-primary-outline"
                    }
                  >
                    all
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </ModalTemplate>
  );
};

export default YoutubePlayerModal;
