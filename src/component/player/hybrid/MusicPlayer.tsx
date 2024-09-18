import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import ModalButton from 'src/component/common/modal/hybrid/ModalButton';
import usePlayerStore from 'src/store/playerStore';
import useAuthStore from 'src/store/userStore';
import YoutubePlayerModal from './YoutubePlayerModal';


interface IMusicPlayerProps {
  isNavbarOpen: boolean;
}

const MusicPlayer = (props: IMusicPlayerProps) => {
  const playerStore = usePlayerStore();
  const authStore = useAuthStore();
  const player = useRef<ReactPlayer | null>(null);

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

  return (
    <div className="w-full pb-2">
      <div
        className={`grid grid-cols-[2.4rem_calc(100%-2.4rem)] items-center w-48 h-14 cursor-pointer transition-all duration-300 hover:bg-primary-200 ${
          props.isNavbarOpen ? 'w-48' : 'w-11 grid-cols-[4.4rem] p-0'
        }`}
        onClick={() => {
          playerStore.setPlayer({
            youtubePlay: !playerStore.youtubePlay,
          });
        }}
      >
        <div className="w-6 aspect-square px-3.5">
          {playerStore.youtubePlay ? (
            <FontAwesomeIcon icon={faPause} />
          ) : (
            <FontAwesomeIcon icon={faPlay} />
          )}
        </div>
        <div
          className={`${props.isNavbarOpen ? 'flex' : 'hidden'} flex-col items-center gap-4`}
        >
          {/* <Span fontSize="1rem">
            {timeFunction.secToTime(playTime.playedSeconds)} [
            {Math.floor(playTime.played * 100)}%]
          </Span> */}
          <ReactPlayer
            width="0rem"
            height="0rem"
            loop
            url={
              window.localStorage.getItem('youtubeLink') ||
              'https://www.youtube.com/watch?v=eyyAUFxlnGg'
            }
            ref={player}
            playing={playerStore.youtubePlay}
            onProgress={handleProgress}
          />
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
            onMouseUp={(e) =>
              player.current?.seekTo(
                parseFloat(e.currentTarget.value),
                'fraction',
              )
            }
            onTouchEnd={(e) =>
              player.current?.seekTo(
                parseFloat(e.currentTarget.value),
                'fraction',
              )
            }
            className="w-full h-4 appearance-none bg-transparent focus:outline-none"
          />
        </div>
        {!!authStore.id && (
          <ModalButton
            modal={<YoutubePlayerModal />}
            modalClassName={"min-w-[32rem] max-w-[96vw] h-[2.4rem]"}
            modalOverlayVisible
          >
            <Image src={"/images/logo/ic-etc.svg"} alt="etc" width={10} height={10} />
          </ModalButton>
        )}
        {/* {!!authStore.id && (
        <Modal
          modalState={modalState}
        >
          <YoutubePlayerModal />
        </Modal>
        )} */}
      </div>
      <div className="w-full px-2">
        <div className="w-full overflow-hidden whitespace-nowrap box-border outline outline-2 outline-primary-400 rounded-xl">
          <span className="inline-block pl-full animate-marquee">
            {playerStore.youtubeTitle}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
