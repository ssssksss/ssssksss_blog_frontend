const YoutubePlayerModal = dynamic(
  () => import('@components/reactPlayer/YoutubePlayerModal'),
  {
    loading: () => <p>Loading...</p>,
  },
);

import Animations from '@components/common/animations/Animations';
import ModalButton from '@components/common/button/ModalButton';
import { Icons } from '@components/common/icons/Icons';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { store } from '@redux/store';
import { rootActions } from '@redux/store/actions';
import { RootState } from '@redux/store/reducers';
import { CC } from '@styles/commonComponentStyle';
import { timeFunction } from '@utils/function/timeFunction';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { useSelector } from 'react-redux';
import Span from '../common/span/Span';

interface IReactPlayerContainerProps {
  isNavbarOpen: boolean;
}

const ReactPlayerContainer = (props: IReactPlayerContainerProps) => {
  const reactPlayerStore = useSelector((state: RootState) => state.reactPlayerStore);
  const authStore = useSelector((state: RootState) => state.authStore);
  const player = useRef(null);

  const [playTime, setPlayTime] = useState({
    playedSeconds: 0,
    played: 0,
  });

  const handleProgress = (state: {playedSeconds: number, played: number}) => {
    setPlayTime({
      playedSeconds: state.playedSeconds,
      played: state.played,
    });
  };

  return (
    <div className="w-full pb-[.5rem]">
      <Container
        outline={true}
        isNavbarOpen={props.isNavbarOpen}
        play={reactPlayerStore.youtubePlay}
        anime={Animations.rainbowColors}
      >
        <div
          className={'w-[1.5rem] aspect-square px-[0.9rem]'}
          onClick={() => {
            store.dispatch(
              rootActions.reactPlayerStore.setYoutubePlay(
                !reactPlayerStore.youtubePlay,
              ),
            );
          }}
        >
          {reactPlayerStore.youtubePlay ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </div>
        <CC.RowDiv gap={4} className={'youtube-sub-menu'}>
          <CC.ColumnCenterDiv>
            <Span fontSize={'1rem'}>
              {timeFunction.secToTime(playTime.playedSeconds)} [
              {Math.floor(playTime.played * 100)}%]
            </Span>

            <ReactPlayer
              width="0rem"
              height="0rem"
              loop={true}
              url={
                window.localStorage.getItem('youtubeLink') ||
                'https://www.youtube.com/watch?v=eyyAUFxlnGg'
              }
              ref={player}
              playing={reactPlayerStore.youtubePlay}
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
                onMouseUp={(e: React.MouseEvent<HTMLInputElement>) => {
                  player.current?.seekTo(
                    parseFloat(e.currentTarget.value),
                    'fraction',
                  );
                }}
                onTouchEnd={(e: React.TouchEvent<HTMLInputElement>) => {
                  player.current?.seekTo(
                    parseFloat(e.currentTarget.value),
                    'fraction',
                  );
                }}
              />
            </div>
          </CC.ColumnCenterDiv>
          {!!authStore.id && (
            <ModalButton
              modal={<YoutubePlayerModal />}
              modalMinW={'32rem'}
              modalW={'96vw'}
              h={'2.4rem'}
              modalBg={'white'}
              modalOverlayVisible={true}
              outline={true}
            >
              <Image src={Icons.EtcIcon} alt="etc" width={10} />
            </ModalButton>
          )}
        </CC.RowDiv>
      </Container>
      <div className={'w-full px-[.5rem]'}>
        <MarqueeContainer>
          <MarqueeText>{reactPlayerStore.youtubeTitle}</MarqueeText>
        </MarqueeContainer>
      </div>
    </div>
  );
};
export default ReactPlayerContainer;

const Container = styled.div<{
  isNavbarOpen: boolean;
  outline: true;
  play: boolean;
  anime: unknown;
  active?: boolean;
}>`
  display: grid;
  grid-template-columns: 2.4rem calc(100% - 2.4rem);
  align-items: center;
  width: 12rem;
  height: 3.6rem;
  cursor: pointer;
  &:hover {
    background: ${(props) => props.theme.main.primary20};
  }

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
const marqueeAnimation = keyframes`
  from {
    transform: translateX(0rem);
  }
  to {
    transform: translateX(-100%);
  }
`;


const MarqueeContainer = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  box-sizing: border-box;
  outline: 2px solid ${(props) => props.theme.main.primary40};
  border-radius: 1rem;
`;

const MarqueeText = styled.span`
  display: inline-block;
  padding-left: 100%;
  animation: ${marqueeAnimation} 15s linear infinite;
`;
