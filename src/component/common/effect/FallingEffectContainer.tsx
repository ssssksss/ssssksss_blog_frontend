"use client";

import FallingEffect from "../layout/hybrid/FallingEffect";

interface IFallingEffectContainer {

}
const FallingEffectContainer = (props: IFallingEffectContainer) => {
  return (
    <>  
      <FallingEffect type="❄️" />
      <FallingEffect type="🌸" />
    </> 
  );
};
export default FallingEffectContainer;