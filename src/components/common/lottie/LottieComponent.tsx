"use client"
import Lottie from "lottie-react";
import React from "react";
const LottieComponent = (props: {lottieFile: any, className: string}) => {
  return (
    <React.Fragment>
      <Lottie animationData={props.lottieFile} className={props.className} style={{padding: "0px"}} />
    </React.Fragment>
  );
};
export default LottieComponent