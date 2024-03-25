import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import { ReactNode, useEffect, useState } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file Select.tsx
 * @version 0.0.1 "2023-10-19 04:29:50"
 * @description react-hook-form
 *
 * @description 설명
 */

interface ISelectProps {
  children: ReactNode;
  placeholder?: string;
  defaultValue?: string;
  data?: [{ value: string; name: string; bg: string }];
  outline?: boolean;
  outlineColor?: string;
  w?: string;
  h?: string;
  value?: {
    value: unknown;
    name: unknown;
    bg: string;
  };
  bg?: string;
  // react-hook-form에서 사용하는 용도
  setValue?: unknown;
  trigger?: unknown;
  enable?: boolean;
  // 클릭후 바로 최신 데이터가 필요한 경우에는 onChange에서 props를 이용하여 값을 받아 사용하면 된다.
  onChange?: () => void;
}

const Select = (props: ISelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState({
    value: props.defaultValue?.value,
    name: props.defaultValue?.name,
    bg: props.defaultValue?.bg,
  });

  useEffect(() => {
    const _windowClickHandler = () => {
      setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('click', _windowClickHandler);
    }

    return () => {
      window.removeEventListener('click', _windowClickHandler);
    };
  }, [isOpen]);

  useEffect(() => {
    setData({
      ...data,
      value: props.defaultValue?.value,
      name: props.defaultValue?.name || props.placeholder,
      bg: props.defaultValue?.bg,
    });
  }, [props.defaultValue]);

  return (
    <Container
      {...props}
      onClick={(e) => {
        if (props.enable === false) return;
        setIsOpen((prev) => !prev);
        e.stopPropagation();
      }}
      tabIndex={'0'}
    >
      <CC.RowCenterDiv
        bg={props.enable === false ? 'gray80' : data?.bg || 'white80'}
      >
        {data?.name || data?.value}
      </CC.RowCenterDiv>
      {isOpen && (
        <ul>
          {props.data
            ?.filter((j) => data.value != j.value)
            .map((i) => (
              <SelectItem
                key={i.value}
                bg={i.bg}
                onClick={() => {
                  setData({
                    ...data,
                    value: i.value,
                    name: i.name,
                    bg: i.bg,
                  });
                  props.onChange(i);
                }}
              >
                {i.name || i.value}
              </SelectItem>
            ))}
        </ul>
      )}
      <IconSVG
        bg={props.bg}
        width="18"
        height="15"
        viewBox="0 0 18 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fillRule="evenodd" clipRule="evenodd" d="M9 15L0 0L17 0L9 15Z" />
      </IconSVG>
    </Container>
  );
};
export default Select;

const Container = styled.div<ISelectProps>`
  // 외곽 디자인(border-radius, outline, box-shadow) //
  outline: inset
    ${(props) =>
      props.theme.colors?.[props.outlineColor] ||
      props.theme.main?.[props.outlineColor] ||
      props.theme.main.primary80}
    0.1rem;

  // 컨테이너(width, height, margin, padding, border, flex, grid, position) //
  display: flex;
  width: ${(props) => props.w || 'max-content'};
  height: ${(props) => props.h || '2.4rem'};
  position: relative;
  padding-right: 1.8rem;

  // 배경색(background) //
  background: ${(props) =>
    props.theme.colors?.[props.bg] ||
    props.theme.main?.[props.bg] ||
    props.bg ||
    props.theme.colors.white80};

  color: ${(props) => props.theme.colors.black60};
  justify-content: flex-start;

  &:hover {
    cursor: pointer;
  }

  div:nth-of-type(1) {
    cursor: ${(props) => {
      props.enable === false && 'not-allowed';
    }};
  }

  input {
    display: none;
  }

  ul {
    background: transparent;
    position: absolute;
    z-index: 5;
    width: 100%;
    top: 2.4rem;
    max-height: 16rem;
    overflow: scroll;
    outline: inset ${(props) => props.theme.main.primary80} 0.1rem;
  }
  li {
    --pd-left: 0.2rem;
    --scale-value: 1.4;
    width: 100%;
    height: 2.4rem;
    display: flex;
    align-items: center;
    color: ${(props) => props.theme.colors.black60};
    padding-left: var(--pd-left);
    cursor: pointer;

    &:hover {
      font-weight: 800;
      transition: all 0.6s ease;
    }
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

const SelectItem = styled.li<{ props: unknown }>`
  background: ${(props) =>
    props.theme.colors?.[props.bg] ||
    props.theme.main?.[props.bg] ||
    props.theme.colors.white80};
`;

const IconSVG = styled.svg<{ bg: string }>`
  position: absolute;
  right: 0;
  align-self: center;
  width: 1.6rem;
  aspect-ratio: 1;
  background: ${(props) => props.bg};
  path {
    fill: ${(props) => props.theme.main.primary80};
  }
`;
