import styled from "@emotion/styled";
// import ReactPlayer from "react-player";
import ReactPlayer from "react-player/lazy";
import { useState, useRef, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store/reducers";
import Time from "../../common/function/Time";
import {commonTheme} from "@/styles/theme";
import { css, keyframes } from "@emotion/css";
import { animationKeyFrames } from "@/styles/animationKeyFrames";
import Button from "../../common/button/Button";
import CustomModal from "../../Modal/CustomModal";
import Input from "../../common/input/Input";
import { CC } from "@/styles/commonComponentStyle";
import ReactPlayerYoutubeItem from "./ReactPlayerYoutubeItem";
import { store } from "@/redux/store";
import { SET_TOASTIFY_MESSAGE } from "@/redux/store/toastify";
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ReactPlayerComponent.tsx
 * @version 0.0.1 "2023-06-13 10:35:41"
 * @description 설명
 */
const ReactPlayerComponent = () => {
  const dispatch = useDispatch();
  const [play, setPlay] = useState(false);
  const themeStore = useSelector((state: RootState) => state.themeStore);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const player = useRef(null);
  const [playTime, setPlayTime] = useState({
    playedSeconds: 0,
    played: 0,
  });
  const [inputValue, setInputValue] = useState({
    url: "",
    name: "",
  });
  const [storage, setStorage] = useState(()=>JSON.parse(localStorage.getItem("ReactPlayerYouTubeList") || "{}"));
  const [choiceYoutubeLink, setChoiceYoutubeLink] = useState(JSON.parse(localStorage.getItem("ChoiceYoutubeLink") || "{}"));
  const handleProgress = (state) => {
    setPlayTime({
      playedSeconds: state.playedSeconds,
      played: state.played,
    });
  };

  const AddCacheStorageHandler = () => {
    if (inputValue.url === "" || inputValue.name === "") return (
      store.dispatch(SET_TOASTIFY_MESSAGE({
        type: "warning",
        message: "값을 입력해주세요",
      }))
    );
    if([inputValue.url] in JSON.parse(localStorage.getItem("ReactPlayerYouTubeList") || "{}" )) return (
      store.dispatch(SET_TOASTIFY_MESSAGE({
        type: "warning",
        message: "이미 존재하는 링크입니다.",
      }))
    );
    localStorage.setItem(
      "ReactPlayerYouTubeList",
      JSON.stringify({
        [inputValue.url]: inputValue,
        ...storage,
      })
    );
    setStorage({
      [inputValue.url]: inputValue,
      ...storage,
    });
    setInputValue({
      url: "",
      name: "",
    })
    store.dispatch(SET_TOASTIFY_MESSAGE({
      type: "success",
      message: "추가 되었습니다.",
    }))
  };

  const UpdateCacheStorageHandler = (input, props) => {
    if (input.url === "" || input.name === "") return (
      store.dispatch(SET_TOASTIFY_MESSAGE({
        type: "warning",
        message: "값을 입력해주세요",
      }))
    );
    if (input.url !== props.url) {
      const temp = JSON.parse(localStorage.getItem("ReactPlayerYouTubeList"));
      delete temp.[props.url];
      localStorage.setItem(
        "ReactPlayerYouTubeList",
        JSON.stringify({
          [input.url]: input,
          ...temp,
        })
      );
      setStorage({
        [input.url]: input,
        ...temp,
      });
      store.dispatch(SET_TOASTIFY_MESSAGE({
        type: "success",
        message: "수정 되었습니다.",
      }))
    }
    else if (input.name !== props.name) {
      localStorage.setItem(
        "ReactPlayerYouTubeList",
        JSON.stringify({
          [input.url]: input,
          ...JSON.parse(localStorage.getItem("ReactPlayerYouTubeList")),
        })
      );
      setStorage({
        [input.url]: input,
        ...JSON.parse(localStorage.getItem("ReactPlayerYouTubeList")),
      });
      store.dispatch(SET_TOASTIFY_MESSAGE({
        type: "success",
        message: "수정 되었습니다.",
      }))
    }
  };
  const DeleteCacheStorageHandler = (props) => {
    const temp = JSON.parse(localStorage.getItem("ReactPlayerYouTubeList"));
    delete temp[props.url];
    localStorage.setItem(
      "ReactPlayerYouTubeList",
      JSON.stringify({
        ...temp,
      })
    );
    setStorage({
      ...temp,
    });
    const temp1 = window.localStorage.getItem("ChoiceYoutubeLink");
        if(props.url === temp1?.url) {
        localStorage.setItem("ChoiceYoutubeLink",{});
      }
    store.dispatch(SET_TOASTIFY_MESSAGE({
      type: "error",
      message: "삭제 되었습니다.",
    }))
  };

  const ChoiceYoutubePlayLinkHandler = (input, props) => {
    localStorage.setItem("ChoiceYoutubeLink",JSON.stringify({
      url: props.url,
      name : props.name
    }));
    setChoiceYoutubeLink({
      url: props.url,
      name : props.name
    });
    store.dispatch(SET_TOASTIFY_MESSAGE({
      type: "info",
      message: "선택되었습니다.",
    }))
  }

  return (
    <Container>
      <ReactPlayer
        width="0px"
        height="0px"
        url={choiceYoutubeLink.url}
        ref={player}
        playing={play}
        onProgress={handleProgress}
        />
      <PlayControlButton
        theme={themeStore}
        onClick={() => setPlay((prev) => !prev)}
        src={play ? "/img/ui-icon/pause_icon.png" : "/img/ui-icon/play_icon.png"}>
      </PlayControlButton>
      <ColumnDiv theme={themeStore}>
        <RowDiv>
          <YoutubeAddLinkButton
            theme={themeStore}
            src={"/img/ui-icon/playlist_add.png"}
            onClick={() => setIsOpenModal(true)}>
          </YoutubeAddLinkButton>
          <div>
            {Time.secToTime(playTime.playedSeconds)} [{Math.floor(playTime.played * 100)}%]
          </div>
        </RowDiv>
        <div>
        <input
          type="range"
          min="0"
          max="1"
          step="0.001"
          value={playTime.played}
          onChange={(e) =>
            setPlayTime((prev) => ({
              playedSeconds: prev.playedSeconds,
              played: parseFloat(e.target.value),
            }))
          }
          onMouseUp={(e) => {
            player.current.seekTo(parseFloat(e.target.value), "fraction");
          }}
          onTouchEnd={(e) => player.current.seekTo(parseFloat(e.target.value), "fraction")}
        />
        </div>
      </ColumnDiv>
      {isOpenModal && (
        <CustomModal title={"유튜브 플레이리스트"} overlayDisable={true} toggleModal={() => setIsOpenModal(!isOpenModal)}>
          <CC.RowDiv gap={12} fontSize={commonTheme.fontSize.sm} backgroundColor={commonTheme.linearGradientColors.skyblue}>
            <CC.ColumnDiv width="60%" gap={8} padding={"4px 0px 4px 8px"}> 
              <CC.RowBetweenDiv gap={4}>
                <CC.RowDiv width="50px"> url : </CC.RowDiv>
                <Input
                  value={inputValue.url}
                  onChange={(e) => {
                    setInputValue({
                      ...inputValue,
                      url: e.target.value,
                    });
                  }}
                  placeholder={"유튜브 링크"}
                  />
              </CC.RowBetweenDiv>
              <CC.RowBetweenDiv gap={4}>
                <CC.RowDiv width="50px" > 이름 : </CC.RowDiv>
                <Input
                  value={inputValue.name}
                  onChange={(e) => {
                    setInputValue({
                      ...inputValue,
                      name: e.target.value,
                    });
                  }}
                  placeholder={"유튜브 제목"}
                />
              </CC.RowBetweenDiv>
            </CC.ColumnDiv>
            <CC.RowRightDiv width="40%" >
              <Button onClick={() => {
                AddCacheStorageHandler();
              }}>
                추가
              </Button>
            </CC.RowRightDiv>
          </CC.RowDiv>
          <CC.ColumnDiv gap={4}>
          {Object.keys(storage).length !== 0 && (
            Object.entries(storage)?.map(([key, value],index) => (
              <ReactPlayerYoutubeItem
                key={key}
                url={key}
                name={value.name}
                choiceYoutubeLink={choiceYoutubeLink}
                DeleteCacheStorageHandler={DeleteCacheStorageHandler}
                UpdateCacheStorageHandler={UpdateCacheStorageHandler}
                ChoiceYoutubePlayLinkHandler={ChoiceYoutubePlayLinkHandler}
              />
              ))
           )}
          </CC.ColumnDiv>
        </CustomModal>
      )}
    </Container>
  );
};
export default ReactPlayerComponent;


const Container = styled.div`
  width: 320px;
  display: flex;
  flex-flow: nowrap row;
  gap: 8px;
  align-items: center;
  padding-left: 30px;
`;

interface IMenuContainerProps {
  theme: {
    menuBackground: string;
    menuIconBackground: string;
    menuIconFont: string;
    menuIconFontColor: string;
    HoverMenuIconBackground: string;
    HoverMenuIconFontColor: string;
  };
}

const YoutubeAddLinkButton = styled.img<IMenuContainerProps>`
  /* color: ${(props) => props.commonTheme.menuBackground}; */
  /* background-color: ${(props) => props.commonTheme.menuIconFontColor}; */
  border-radius: 10px;
  width: 16px;
  height: auto !important;
  padding-left: 2px;
  
  &:hover {
    cursor: pointer;
  }
  `;

const PlayControlButton = styled.img<IMenuContainerProps>`
  width: 24px;
  height: 24px;
  /* color: ${(props) => props.commonTheme.menuBackground}; */
  /* background-color: ${(props) => props.commonTheme.menuIconFontColor}; */
  border-radius: 10px;
  z-index: 10;
  
  &:hover {
    cursor: pointer;
    animation: ${animationKeyFrames.UpToDownRepeat} 2s infinite;
  }
`;

const ColumnDiv = styled.div<IMenuContainerProps>`
  display: flex;
  flex-flow: nowrap column;
  font-size: ${commonTheme.fontSize.xs};
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 110px;

  input[type="range"] {
    -webkit-appearance: none;
    animation: ${animationKeyFrames.rainbowColors} 1s infinite;
    height: 12px;
    width: 100%;
  }

  input[type="range"]:focus {
    outline: none;
  }
  input[type="range"]::-webkit-slider-runnable-track {
    width: 100%;
    cursor: pointer;
    border-radius: 1px;
    border: 1px solid #000000;
  }
  input[type="range"]::-webkit-slider-thumb {
    border: 1px solid #333333;
    height: 12px;
    width: 12px;
    border-radius: 25px;
    /* background: ${(props) => props.commonTheme.menuBackground}; */
    cursor: pointer;
    -webkit-appearance: none;
  }
`;

const RowDiv = styled.div`
  display: flex;
  flex-flow: nowrap row;
  width: 100%;
  align-items: center;
  gap: 4px;
  color: black;
  background: white;
  border-radius: 20px;
`;
