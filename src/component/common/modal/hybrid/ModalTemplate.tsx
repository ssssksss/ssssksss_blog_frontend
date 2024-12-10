import { ReactNode } from "react";

interface IModalTemplate {
  className?: string;
  children?: ReactNode;
  style?: React.CSSProperties;
}
const ModalTemplate = (props: IModalTemplate) => {
  return (
    <section
      // style={{minWidth: "30rem"}}
      style={{...props.style}}
      className={`relative flex max-h-[calc(100vh-1rem)] min-w-[22.5rem] max-w-[min(75rem,100vw)] flex-shrink-0 animate-modalGrowingScale flex-col items-center overflow-y-scroll rounded-[1rem] bg-white-80 scrollbar-hide default-outline ${props.className} px-[1rem] pt-[4rem]`}>
      {props.children}
    </section>
  );
};
export default ModalTemplate;
