import { faPause } from "@fortawesome/free-solid-svg-icons/faPause";
import { faPlay } from "@fortawesome/free-solid-svg-icons/faPlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface IPlayIcon {
  youtubePlay: boolean;
}
const YoutubePlayIconView = (props: IPlayIcon) => {
  return (
    <div className="aspect-square h-[2.5rem] primary-border-radius default-flex">
      {props.youtubePlay ? (
        <FontAwesomeIcon icon={faPause} width={40} height={40} />
      ) : (
        <FontAwesomeIcon icon={faPlay} width={40} height={40} />
      )}
    </div>
  );
};
export default React.memo(YoutubePlayIconView);