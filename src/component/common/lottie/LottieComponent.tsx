"use client";

import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"));

const LottieComponent = (props: {lottieFile: any; className: string}) => {
  return (
    <>
      <Lottie
        animationData={props.lottieFile}
        className={props.className}
        style={{padding: "0px"}}
      />
    </>
  );
};

export default LottieComponent;
