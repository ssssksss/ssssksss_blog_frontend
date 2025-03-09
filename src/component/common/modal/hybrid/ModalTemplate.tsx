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
      className={`primary-border-radius relative flex flex-shrink-0 animate-modalGrowingScale flex-col items-center overflow-y-scroll rounded-[1rem] bg-default-1 px-[1rem] pb-[1rem] pt-[4rem] scrollbar-hide ${props.className} ${props.className?.includes("max-w") || "max-w-[min(75rem,100vw)]"} ${props.className?.includes("min-w") || "min-w-[22.5rem]"} ${props.className?.includes("max-h") || "max-h-[calc(100vh-1rem)]"} `}
    >
      {props.children}
    </section>
  );
};
export default ModalTemplate;
