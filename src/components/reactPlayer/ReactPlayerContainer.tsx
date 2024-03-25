const YoutubePlayerModal = dynamic(
  () => import('@components/common/modal/YoutubePlayerModal'),
  {
    loading: () => <p>Loading...</p>,
  },
);

import Animations from '@components/common/animations/Animations';
import ModalButton from '@components/common/button/ModalButton';
import { Icons } from '@components/common/icons/Icons';
import styled from '@emotion/styled';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { Time } from '@utils/function/Time';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import Span from '../common/span/Span';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ReactPlayer.tsx
 * @version 0.0.1 "2023-09-20 20:38:35"
 * @description 설명
 */
interface IReactPlayerContainerProps {
  isNavbarOpen: boolean;
}

const ReactPlayerContainer = (props: IReactPlayerContainerProps) => {
  const [youtubePlay, setYoutubePlay] = useState(false);
  const authStore = useSelector((state: RootState) => state.authStore);
  const player = useRef(null);

  const [playTime, setPlayTime] = useState({
    playedSeconds: 0,
    played: 0,
  });

  const handleProgress = (state) => {
    setPlayTime({
      playedSeconds: state.playedSeconds,
      played: state.played,
    });
  };

  return (
    <Container
      outline={true}
      isNavbarOpen={props.isNavbarOpen}
      play={youtubePlay}
      anime={Animations.rainbowColors}
    >
      <Image
        src={youtubePlay ? Icons.PauseIcon : Icons.PlayIcon}
        alt="플레이어"
        onClick={() => setYoutubePlay((prev) => !prev)}
        width={'24'}
        height={'24'}
      />
      <CC.RowDiv gap={4} className={'youtube-sub-menu'}>
        <CC.ColumnCenterDiv>
          <Span fontSize={'1rem'}>
            {Time.secToTime(playTime.playedSeconds)} [
            {Math.floor(playTime.played * 100)}%]
          </Span>

          <ReactPlayer
            width="0rem"
            height="0rem"
            url={
              window.localStorage.getItem('youtubeLink') ||
              'https://www.youtube.com/watch?v=eyyAUFxlnGg'
            }
            ref={player}
            playing={youtubePlay}
            onProgress={handleProgress}
          />
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
                player.current?.seekTo(parseFloat(e.target.value), 'fraction');
              }}
              onTouchEnd={(e) => {
                player.current?.seekTo(parseFloat(e.target.value), 'fraction');
              }}
            />
          </div>
        </CC.ColumnCenterDiv>
        {authStore.id && (
          <ModalButton
            modal={<YoutubePlayerModal />}
            modalMinW={'32rem'}
            modalW={'96vw'}
            h={'2.4rem'}
            modalBg={'white'}
            modalOverlayVisible={'true'}
            outline={true}
          >
            <Image src={Icons.EtcIcon} alt="etc" width={10} />
          </ModalButton>
        )}
      </CC.RowDiv>
    </Container>
  );
};
export default ReactPlayerContainer;

const Container = styled.div<{
  isNavbarOpen: boolean;
  outline: true;
  play: boolean;
  anime: unknown;
}>`
  display: grid;
  grid-template-columns: 2.4rem calc(100% - 2.4rem);
  align-items: center;
  width: 12rem;
  height: 3.2rem;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.main.primary20};
  }

  ${(props) =>
    props.outline &&
    `
    outline: solid ${props.theme.colors?.[props.color] || props.theme.main?.[props.color] || props.theme.main.primary80} 0.1rem;
    background: transparent;
    `}
  & > :nth-last-of-type(1) {
    justify-content: flex-start;
    animation-name: ${Animations.LeftToRightFadein};
    animation-duration: 0.6s;
  }

  ${(props) =>
    props.active &&
    `
    background: ${props.theme.main.primary20};
    `};

  ${(props) =>
    props.isNavbarOpen
      ? `
      align-items: center;
      width: 12rem;
    `
      : `
        align-items: center;
        grid-template-columns: 4.4rem;
        width: 4.4rem;
        padding: 0rem;
        .youtube-sub-menu {
          display: none;
        }
        `}

  img {
    cursor: pointer;
  }

  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    width: calc(100%);
    cursor: pointer;
    border-radius: 0.1rem;
    border: 0.1rem solid #000000;
  }
  input[type='range']::-webkit-slider-thumb {
    border: 0.1rem solid #333333;
    height: 1rem;
    width: 1.2rem;
    border-radius: 2.5rem;
    cursor: pointer;
    -webkit-appearance: none;
  }
  input[type='range'] {
    -webkit-appearance: none;
    animation: ${Animations.rainbowColors} 1s infinite;
    animation: ${(props) => props.play || 'none'};
    animation-play-state: ${(props) => props.play || 'paused'};
    height: 1rem;
    width: calc(100%);
  }
`;
