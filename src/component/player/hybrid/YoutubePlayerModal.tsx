import ThemeInput1 from "@component/common/input/ThemeInput1";
import ModalTemplate from "@component/common/modal/hybrid/ModalTemplate";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useFetchCSR from "@hooks/useFetchCSR";
import usePlayerStore from "@store/playerStore";
import useToastifyStore from "@store/toastifyStore";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay } from "react-icons/fa";
import { FaArrowsRotate, FaShuffle } from "react-icons/fa6";
import { IoMdSkipBackward, IoMdSkipForward } from "react-icons/io";
import { LuArrowRightLeft } from "react-icons/lu";
import { MdContentCopy, MdDelete } from "react-icons/md";
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
  const fetchCSR = useFetchCSR();
  const selectPlaylist = (item: IYoutubePlaylist) => {
    setOpenPlaylist((prev) => (prev != null ? null : item));
    inputRef.current!.value = ""; // input 값을 초기화
  };

  const createPlaylist = async () => {
    const title = inputRef.current?.value;
    const result: IYoutubePlaylist = await fetchCSR.requestWithHandler({
      url: "/api/youtube/playlist",
      method: "POST",
      body: {playlistTitle: title},
    });
    if (result == undefined) return;

    playerStore.setPlayer({
      playlist: [...playerStore.playlist, result],
    });
    inputRef.current!.value = "";
  };

  const selectMediaItem = (item: IYoutube) => {
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
    const result = await fetchCSR.requestWithHandler(
      {
        url: `/api/youtube/playlist?id=${id}`,
        method: "DELETE",
      },
    );
    if (result == undefined) return;
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
    if (openPlaylist != null) {
      inputRef.current!.value = "";
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
    // 같은 플레이리스트에는 중복 URL 안되게 처리
    if (playerStore.currentYoutubePlaylist.youtubeList.filter(i => i.youtubeUrl == url).length > 0) {
      toastifyStore.setToastify({
        type: "warning",
        message: "중복된 URL이 존재합니다."
      });
      return;
    }
    const v = _url.searchParams.get("v");
    const result: {youtube: IYoutube} = await fetchCSR.requestWithHandler({
      url: "/api/youtube/url",
      method: "POST",
      body: {
        youtubePlaylistId: openPlaylist?.id,
        youtubeUrlKeyId: v,
        youtubeUrl: url,
      },
      showSuccessToast: true,
      successMessage: "노래가 추가 되었습니다."
    });
    if (result == undefined) return;
    const temp: IYoutubePlaylist[] = playerStore.playlist.map((i) => {
      if (i.id == openPlaylist?.id) {
        return {
          ...i,
          youtubeList: [...i.youtubeList, result.youtube], // youtubeList 업데이트
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
    const result = await fetchCSR.requestWithHandler({
      url: `/api/youtube/url?id=${id}`,
      method: "DELETE",
    });
    if (result == undefined) return;
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
    }
    localStorage.setItem("progressRatio", "0");
    localStorage.setItem("playSeconds", "0");
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
      const result: IYoutubePlaylist[] = await fetchCSR.requestWithHandler({
        url: "/api/youtube/playlist",
      });
      if (result == undefined) return;
      playerStore.setPlayer({
        isFetchYoutubePlaylist: true,
        playlist: result,
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
      className={
        "h-[calc(100vh-1rem)] max-h-[60rem] w-[80vw] min-w-[22.5rem] bg-gradient"
      }
    >
      {props.closeButtonComponent}
      <div className="relative z-0 flex h-full w-full justify-end gap-2">
        <div className="absolute left-0 top-1/2 w-full max-w-[37.5rem] -translate-y-1/2 default-flex">
          <div
            className={`relative aspect-square w-[calc(100%-1rem)] max-w-[100vw] overflow-hidden rounded-[50%] will-change-transform default-flex ${playerStore.currentYoutube.id && "-border-offset-2 outline outline-2 outline-black-80/50"} ${playerStore.youtubePlay ? "animate-slowSpin" : "animate-none"}`}
          >
            {playerStore.currentYoutube?.imageUrl && (
              <Image src={playerStore.currentYoutube.imageUrl} alt={""} fill />
            )}
          </div>
        </div>
        <div className="z-50 flex h-[100%-6.5rem] max-h-[100%-8rem] w-full max-w-[37.5rem] flex-col p-2">
          {/* z-50을 지우게 되면 플레이리스트가 삭제되는 문제가 발생 */}
          <div className={"z-50 flex w-full"}>
            <ThemeInput1
              ref={inputRef}
              placeholder={
                openPlaylist == null
                  ? "플레이리스트 명을 입력하세요"
                  : "유튜브 url을 입력하세요"
              }
              type={"text"}
              className="mr-1 h-btn-md w-full pl-1"
              maxLength={!openPlaylist?.id ? 30 : 500}
            />
            <button
              className="relative aspect-square h-btn-md w-[3.25rem] flex-shrink-0 rounded-2xl border-2 border-contrast-1 px-2"
              onClick={() =>
                openPlaylist == null ? createPlaylist() : createYoutubeUrl()
              }
              aria-label={
                openPlaylist ? "플레이리스트 추가 버튼" : "유튜브 url 추가 버튼"
              }
            >
              추가
            </button>
          </div>
          <ul
            className={`relative mt-2 flex h-[calc(100%-8.5rem)] w-full flex-col gap-y-1 pb-1 ${openPlaylist != null ? "pt-[4.5rem]" : "overflow-y-scroll scrollbar-hide"}`}
          >
            {playerStore.playlist.map((i, index) => (
              <li
                key={index}
                id={i.id + ""}
                className={`flex w-full flex-shrink-0 cursor-pointer items-center border-y-2 pl-1 duration-1000 ease-in-out glassmorphism ${openPlaylist != null ? (openPlaylist.id == i.id ? "animate-borderBlink absolute left-0 top-0 mt-1 flex min-h-[4rem]" : "-z-10 h-0 translate-y-[-10vh] opacity-0") : "h-[4rem]"}`}
                onClick={() => selectPlaylist(i)}
              >
                <div className="flex w-full items-center justify-start pl-1">
                  {i.title}
                </div>
                <div className="relative h-auto w-[4rem] rounded-2xl p-[0.0625rem] text-sm default-flex glassmorphism">
                  {i.youtubeList.length} 개
                </div>
                <button
                  className="relative h-full w-[3.75rem] px-2 default-flex"
                  onClick={() => deletePlaylist(i.id)}
                  aria-label="플레이리스트 제거 버튼"
                >
                  <MdDelete size={"32"} />
                </button>
              </li>
            ))}
            {
              // 노래가 있는 UI
              openPlaylist != null && (
                <ul
                  className={
                    "flex h-full w-full animate-fadeUp flex-col overflow-y-scroll"
                  }
                >
                  {playerStore.playlist
                    .filter((i) => i.id == openPlaylist?.id)[0]
                    ?.youtubeList.map((i, index) => (
                      <li
                        key={index}
                        className="w-full flex-shrink-0 border-y-2 border-contrast-1"
                      >
                        <button
                          type="button"
                          onClick={() => {
                            selectMediaItem(i);
                            if (i.id == playerStore.currentYoutube.id) {
                              playerStore.setPlayer({
                                youtubePlay: !playerStore.youtubePlay,
                              });
                              window.localStorage.setItem(
                                "isPlay",
                                !playerStore.youtubePlay ? "true" : "false",
                              );
                            } else {
                              playerStore.setPlayer({
                                youtubePlay: true,
                              });
                              window.localStorage.setItem("isPlay", "true");
                            }
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              selectMediaItem(i);
                              if (i.id == playerStore.currentYoutube.id) {
                                playerStore.setPlayer({
                                  youtubePlay: !playerStore.youtubePlay,
                                });
                                window.localStorage.setItem(
                                  "isPlay",
                                  !playerStore.youtubePlay ? "true" : "false",
                                );
                              }
                            }
                          }}
                          className={`flex h-[5rem] w-full cursor-pointer items-center duration-1000 ease-in-out glassmorphism hover:bg-primary-60 ${
                            playerStore.currentYoutube?.id == i.id
                              ? "bg-gradient-purple-40-blue-40-70deg"
                              : i.title == ""
                                ? "bg-red-20"
                                : ""
                          }`}
                        >
                          <div className="aspect-square h-full default-flex">
                            <Image
                              alt=""
                              src={`${i.imageUrl}`}
                              width={72}
                              height={72}
                              className="rounded-[.25rem]"
                            />
                          </div>
                          <div className="flex w-full flex-col gap-y-1 overflow-hidden pl-1 text-left">
                            <div className="w-fit whitespace-nowrap font-DNFBitBitv2 hover:animate-marquee">
                              {i.title || "재생할 수 없는 노래입니다."}
                            </div>
                            <div className="whitespace-nowrap text-sm text-primary-contrast hover:animate-marquee">
                              {i.tags !== "[]" && i.tags}
                            </div>
                          </div>
                          <div className="flex gap-x-1 px-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                copyLinkHandler(i.youtubeUrl);
                              }}
                            >
                              <MdContentCopy
                                aria-label="유튜브 링크 복사 버튼"
                                size="32"
                              />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteYoutube(i.id);
                              }}
                            >
                              <MdDelete
                                aria-label="유튜브 링크 삭제 버튼"
                                size="32"
                              />
                            </button>
                          </div>
                        </button>
                      </li>
                    ))}
                </ul>
              )
            }
          </ul>
          <div
            className={"mt-auto h-[3rem] w-full flex-shrink-0 py-1 sm:h-[4rem] glassmorphism"}
          >
            {/* 버튼 5개 */}
            <div className="h-full w-full gap-x-4 default-flex">
              <button
                onClick={() => handlePlaybackMode()}
                className="relative flex aspect-square h-[80%] items-center justify-center rounded-[50%] outline outline-2 outline-offset-[-0.125rem] outline-gray-60 hover:bg-primary-20 focus:outline"
                aria-label={
                  playerStore.isPlayRandom
                    ? "순차 재생으로 변경 버튼"
                    : "랜덤 재생으로 변경 버튼"
                }
              >
                {playerStore.isPlayRandom ? (
                  <FaShuffle size={"24"} />
                ) : (
                  <LuArrowRightLeft size={"24"} />
                )}
              </button>
              <button
                onClick={() => handlePlayBackwardClick()}
                className="relative flex aspect-square h-[80%] items-center justify-center rounded-[50%] outline outline-2 outline-offset-[-0.125rem] outline-gray-60 hover:bg-primary-20 focus:outline"
                aria-label="뒤로가기 버튼"
              >
                <IoMdSkipBackward size={"24"} />
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
                aria-label={
                  playerStore.youtubePlay ? "노래 멈춤 버튼" : "노래 시작 버튼"
                }
              >
                {playerStore.youtubePlay ? (
                  <FaPause size={"28"} />
                ) : (
                  <FaPlay size={"28"} className="ml-1" />
                )}
              </button>
              <button
                onClick={() => handlePlayForwardClick()}
                className="relative flex aspect-square h-[80%] items-center justify-center rounded-[50%] outline outline-2 outline-offset-[-0.125rem] outline-gray-60 hover:bg-primary-20 focus:outline"
                aria-label="앞으로 가기 버튼"
              >
                <IoMdSkipForward size={"24"} />
              </button>
              <button
                className="relative flex aspect-square h-[80%] items-center justify-center rounded-[50%] outline outline-2 outline-offset-[-0.125rem] outline-gray-60 hover:bg-primary-20 focus:outline"
                onClick={() => handlePlayRepeat()}
                aria-label={
                  playerStore.playRepeatType == null
                    ? "노래 1개 반복 버튼"
                    : playerStore.playRepeatType == "one"
                      ? "노래 전체 반복 버튼"
                      : "노래 반복 하지 않는 버튼"
                }
              >
                <FaArrowsRotate size={"24"} />
                {playerStore.playRepeatType == null && (
                  <div
                    className={
                      "absolute bottom-[-2px] right-[-2px] h-4 w-4 text-[0.75rem] primary-border-radius"
                    }
                  >
                    X
                  </div>
                )}
                {playerStore.playRepeatType == "one" && (
                  <div
                    className={
                      "absolute bottom-[-2px] right-[-2px] h-4 w-4 text-[0.75rem] primary-border-radius"
                    }
                  >
                    1
                  </div>
                )}
                {playerStore.playRepeatType == "all" && (
                  <div
                    className={
                      "absolute bottom-[-2px] right-[-2px] h-4 w-4 text-[0.75rem] primary-border-radius"
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

export default React.memo(YoutubePlayerModal);
