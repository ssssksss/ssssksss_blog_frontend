import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

interface IAutoHeightTextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  activeBg?: string; // 필요하다면 커스텀 props 추가
}

const AutoHeightTextarea = forwardRef<
  HTMLTextAreaElement,
  IAutoHeightTextareaProps
>((props, ref) => {
  const innerRef = useRef<HTMLTextAreaElement>(null);
  const [textareaValue, setAutoHeightTextareaValue] = useState(
    props.defaultValue || "",
  );

  useImperativeHandle(ref, () => innerRef.current as HTMLTextAreaElement);

  const handleResizeHeight = useCallback(() => {
    if (innerRef.current) {
      innerRef.current.style.height = "auto";
      innerRef.current.style.height = innerRef.current.scrollHeight + "px";
      setAutoHeightTextareaValue(innerRef.current.value);
      if (props.maxLength && innerRef.current.value.length > props.maxLength) {
        innerRef.current.value = innerRef.current.value.slice(
          0,
          props.maxLength,
        );
      }
    }
  }, []);

  return (
    <textarea
      // ${ props.disabled ? "bg-transparent" : props.activeBg || "bg-white"}
      {...props} // ✅ HTML 속성들 자동 전달
      className={`h-auto resize-none overflow-hidden !outline-none scrollbar-hide ${props.className || ""}`}
      ref={innerRef}
      rows={1}
      onInput={handleResizeHeight}
      maxLength={props.maxLength}
    />
  );
});

AutoHeightTextarea.displayName = "AutoHeightTextarea";

export default AutoHeightTextarea;
