import styled from '@emotion/styled';
import { useCallback, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/reducers';
import { CC } from '@/styles/commonComponentStyle';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import Span from '@/components/common/span/Span';
import Time from '@/utils/fucntion/Time';
import Animations from '@/components/common/animations/Animations';
import ReactPlayer from 'react-player/lazy';
import Modal from '@/components/common/modal/Modal';
import useModal from '@/src/hooks/useModal';
import Button from '@/components/common/button/Button';
import ModalButton from '@/components/common/button/ModalButton';
import YoutubePlayerModal from '@/components/common/modal/YoutubePlayerModal';
import { css } from '@emotion/react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file ReactPlayer.tsx
 * @version 0.0.1 "2023-09-20 20:38:35"
 * @description 설명
 */
interface IReactPlayerContainerProps {
  play: boolean;
}

const Form = () => {
  return (
    <form>
      <input placeholder="입력바람" />
    </form>
  );
};

const ReactPlayerContainer = (props: IReactPlayerContainerProps) => {
  const themeStore = useSelector((state: RootState) => state.themeStore);
  const player = useRef(null);
  const [modalOption, showModal] = useModal();

  // const onClick = useCallback(() => {
  //   console.log('ReactPlayerContainer.tsx 파일 : ', 'test');
  //   Modal1();
  //   showModal(true, '안녕하세요', () => console.log('모달 on'), null, <Form />);
  // }, [modalOption]);

  const [playTime, setPlayTime] = useState({
    playedSeconds: 0,
    played: 0,
  });
  const [inputValue, setInputValue] = useState({
    url: '',
    name: '',
  });

  const handleProgress = state => {
    setPlayTime({
      playedSeconds: state.playedSeconds,
      played: state.played,
    });
  };

  return (
    <Container play={props.play}>
      <CC.ColumnCenterDiv>
        <Span fontSize={'10px'}>
          {Time.secToTime(playTime.playedSeconds)} [
          {Math.floor(playTime.played * 100)}%]
        </Span>
        <ReactPlayer
          width="0px"
          height="0px"
          // url={'https://www.youtube.com/watch?v=Bo-ACZb3xTg'}
          url={'https://www.youtube.com/watch?v=EMPahe2yB5Q'}
          ref={player}
          playing={props.play}
          onProgress={handleProgress}
        />
        <div>
          <input
            type="range"
            min="0"
            max="1"
            step="0.001"
            value={playTime.played}
            onChange={e =>
              setPlayTime(prev => ({
                playedSeconds: prev.playedSeconds,
                played: parseFloat(e.target.value),
              }))
            }
            onMouseUp={e => {
              player.current.seekTo(parseFloat(e.target.value), 'fraction');
            }}
            onTouchEnd={e =>
              player.current.seekTo(parseFloat(e.target.value), 'fraction')
            }
          />
        </div>
      </CC.ColumnCenterDiv>
      <ModalButton modal={<YoutubePlayerModal />} modalW={'300px'} h={'100%'}>
        <Image src={Icons.EtcIcon} alt="etc" width={10} />
      </ModalButton>
    </Container>
  );
};
export default ReactPlayerContainer;

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: calc(120px - 34px) 10px;
  text-align: center;

  img {
    cursor: pointer;
  }

  input[type='range'] {
    -webkit-appearance: none;
    ${props =>
      props.play
        ? css`
            animation: ${Animations.rainbowColors} 1s infinite;
          `
        : css`
            animation-play-state: paused;
          `}
    height: 10px;
    width: calc(100% - 12px);
  }

  input[type='range']:focus {
    outline: none;
  }
  input[type='range']::-webkit-slider-runnable-track {
    width: calc(100% - 12px);
    cursor: pointer;
    border-radius: 1px;
    border: 1px solid #000000;
  }
  input[type='range']::-webkit-slider-thumb {
    border: 1px solid #333333;
    height: 10px;
    width: 12px;
    border-radius: 25px;
    /* background: ${props => props.commonTheme.menuBackground}; */
    cursor: pointer;
    -webkit-appearance: none;
  }
`;
