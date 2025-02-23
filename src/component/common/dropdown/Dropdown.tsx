import useModalState from "@hooks/useModalState";
import useOutsideClick from "@hooks/useOutsideClick";
import { useEffect, useRef, useState } from "react";

export default function Dropdown<T>(props: IDropdown<T>) {
  const [selectedOption, setSelectedOption] = useState<T>(props.defaultValue);
  const ref = useRef<HTMLDivElement>(null);
  const [isOnRightSide, setIsOnRightSide] = useState(true);
  const modalState = useModalState();

  useOutsideClick(ref, () => {
    modalState.closeModal();
  });

  useEffect(() => {
    setSelectedOption(props.value);
  }, [props.value]);

  const toggleDropdown = () => {
    modalState.isOpen ? modalState.closeModal() : modalState.openModal();
    const checkPosition = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const windowWidth = window.innerWidth;
        const rightSide = rect.right > windowWidth / 2;
        setIsOnRightSide(rightSide);
      }
    };

    checkPosition();
  };

  const handleOptionClick = (value: T) => {
    setSelectedOption(value);
    modalState.closeModal();
  };
  const selectedOptionObject = props.options.find(
    (i) => i.value === selectedOption,
  );

  return (
    <div
      className={`relative flex h-full flex-shrink-0 items-center ${props.borderClassName}`}
      ref={ref}>
      <button
        onClick={toggleDropdown}
        className={`-z-1 flex h-full w-full items-center justify-center gap-x-2 text-sm default-primary-outline ${props.containerClassName} font-medium text-gray-700`}>
        <div className={"min-w-fit"}>
          {/* {props.options.filter((i) => i.value == selectedOption)[0].name} */}
          {selectedOptionObject ? selectedOptionObject.name : props.placeholder}
        </div>
        <svg
          className={`20 h-5 w-5 ${modalState.isOpen ? "rotate-180" : "rotate-0"}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor">
          <path
            fillRule="evenodd"
            d="M5.292 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {modalState.isOpen && (
        <ul
          className={`absolute z-[80] overflow-y-scroll bg-white-100 scrollbar-hide default-primary-outline ${props.elementClassName} bg-white/95 text-gray1 flex flex-col items-center gap-1 shadow transition duration-200 ease-out ${props.OptionContainerMaxH}`}
          style={{
            top: ref.current?.clientHeight + "px",
            width: ref.current?.clientWidth,
          }}>
          {props.options.map((i) => (
            <li
              key={i.name}
              onClick={() => {
                props.dropdownHandler(i.value);
                handleOptionClick(i.value);
              }}
              style={{minHeight: ref.current?.clientHeight}}
              className={`flex w-full items-center justify-center text-sm hover:bg-primary-20 ${
                selectedOption === i.value ? "bg-white" : ""
              }`}
              role="menuitem">
              {i.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
