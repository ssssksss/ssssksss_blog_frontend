import Button from '@components/common/button/Button';
import { Icons } from '@components/common/icons/Icons';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file Dropdown.tsx
 * @version 0.0.1 "2023-09-25 22:16:43"
 * @description 설명
 */

interface IDropdownProps {
  w?: string;
  h?: string;
  bg?: string;
  brR?: string;
  outline?: string;
  color?: string;
  hoverOff?: boolean;
  menuList: [
    {
      name: string;
      func: () => void;
      bg?: string;
    },
  ];
  key?: string;
  value?: string;
  defaultPlaceHolder?: string;
}

const Dropdown = (props: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu] = useState(props.defaultPlaceHolder || props.menuList[0]);

  useEffect(() => {
    const temp = () => {
      setIsOpen(false);
    };
    if (isOpen) {
      window.addEventListener('click', temp);
    }

    return () => {
      window.removeEventListener('click', temp);
    };
  }, [isOpen]);

  return (
    <Container
      isOpen={isOpen}
      width={props.w}
      height={props.h}
      background={props.bg}
      borderRadius={props.brR}
    >
      <ButtonStyle
        background={activeMenu?.bg || props.bg}
        outline={props.outline}
        color={props.color}
        borderRadius={props.brR}
        hoverOff={props.hoverOff}
        onClick={() => {
          setIsOpen((prev) => (prev === null ? true : !prev));
        }}
      >
        <span> {activeMenu?.name || activeMenu} </span>
        <Arrow>
          {isOpen ? (
            <Image
              src={Icons.UpArrowIcon}
              width={'1.6rem'}
              height={'1.6rem'}
              alt="down-arrow"
            />
          ) : (
            <Image
              src={Icons.DownArrowIcon}
              width={'1.6rem'}
              height={'1.6rem'}
              alt="up-arrow"
            />
          )}
        </Arrow>
      </ButtonStyle>
      {isOpen && (
        <ul>
          {props.menuList
            ?.filter((i) => i.bg || i.name !== activeMenu?.name)
            .map((el, index) => (
              <li key={props.key + index}>
                <DropDownItem
                  background={el.bg}
                  borderRadius={props.brR}
                  color={props.color}
                  isOpen={isOpen}
                  listLength={props.menuList.length}
                  index={index}
                  outline={props.outline}
                  hoverOff={props.hoverOff}
                  // onClick={() => {
                  //   setIsOpen(false);
                  //   if (el.bg || el.name !== activeMenu) {
                  //     setActiveMenu(el);
                  //     el.func();
                  //   }
                  // }}
                >
                  {el.name}
                </DropDownItem>
              </li>
            ))}
        </ul>
      )}
    </Container>
  );
};
export default React.memo(Dropdown);

const dropdownUpAnimation = keyframes`
    0% {
        opacity: 1;
    }
    100% {
        opacity: 0;
        display: none;
    }
    `;

const dropdownDownAnimation = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

interface IContainerProps {
  isOpen: boolean;
  width: string;
  height: string;
  bg: string;
}

const Container = styled.div<{ props: IContainerProps }>`
  position: relative;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border-radius: 0rem;
  ul {
    overflow: scroll;
    z-index: 20;
    width: 100%;
    list-style: none;
    position: absolute;
    display: flex;
    flex-flow: nowrap column;
    max-height: ${(props) => props.height * 5};
    ${(props) => props.theme.scroll.hidden};
    outline: inset ${(props) => props.theme.main.primary80} 0.1rem;

    li {
      width: 100%;
      height: ${(props) => props.height};
      z-index: 40;
    }
  }
`;

const ButtonStyle = styled(Button)<{ hoverOff: boolean }>`
  width: 100%;
  height: 100%;
  ${(props) => props.theme.flex.row.center.center};
  gap: 0.4rem;
  position: relative;
  border-radius: ${(props) => props.borderRadius};
  outline: solid ${(props) => props.theme.main.primary40} 0.1rem;
  box-shadow: 0.2rem 0.2rem 0.4rem 0rem rgba(0, 0, 0, 0.25);
  padding-right: 1.6rem;
  {
    ${(props) =>
      props.hoverOff === true ||
      css`
        &:hover {
          color: ${(props) => props.theme.main.contrast};
          background: ${(props) => props.theme.main.primary80};
        }
      `}
  }
`;
const Arrow = styled(CC.RowDiv)`
  position: absolute;
  right: 0rem;
`;
const DropDownItem = styled(Button)<{
  index: number;
  isOpen: boolean;
  listLength: number;
  color?: string;
  background?: string;
  hoverOff?: boolean;
}>`
  --down: ${(props) => props.listLength / 10 - props.index / 10 + 's'};
  --up: ${(props) => props.index / 10 + 's'};
  color: ${(props) =>
    props.theme.colors?.[props.color] ||
    props.theme.main?.[props.color] ||
    props.color};
  background: ${(props) =>
    props.theme.colors?.[props.background] ||
    props.theme.main?.[props.background] ||
    props.background ||
    props.theme.colors.white80};
  animation: ${(props) =>
    props.isOpen === true
      ? css`
          ${dropdownDownAnimation} linear var(--up);
          animation-fill-mode: forwards;
        `
      : props.isOpen === false
        ? css`
            ${dropdownUpAnimation} linear var(--down);
            animation-fill-mode: forwards;
          `
        : props.isOpen === null &&
          css`
            ${dropdownUpAnimation} linear 0s;
            animation-fill-mode: forwards;
          `};

  & {
    width: 100%;
    border-radius: 0rem;
  }
  &:hover {
    background: ${(props) => props.hoverOff || props.theme.main.primary80};
    color: ${(props) => props.hoverOff || props.theme.main.contrast};
  }
`;
