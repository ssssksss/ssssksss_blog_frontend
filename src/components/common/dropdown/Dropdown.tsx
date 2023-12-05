import { CC } from '@/styles/commonComponentStyle';
import { css, keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import React, { useEffect, useRef, useState } from 'react';
import { Icons } from '@/components/common/icons/Icons';
import Image from 'next/image';
import { Button } from '@/components/common/button/Button';
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
  menus: [
    {
      name: string;
      func: () => void;
    }
  ];
}

const Dropdown = (props: IDropdownProps) => {
  const [isOpen, setIsOpen] = useState(null);
  const [activeMenu, setActiveMenu] = useState(props?.menus[0]?.name);

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
    <Container isOpen={isOpen} width={props.w} height={props.h} background={props.bg} borderRadius={props.brR}>
      <ButtonStyle
        background={props.bg} 
        outline={props.outline}
        size="md"
        color={props.color}
        borderRadius={props.brR}
        onClick={() => {
          setIsOpen(prev => (prev === null ? true : !prev));
        }}
      >
        <span> {activeMenu} </span>
        <Arrow>
          {isOpen ? (
            <Image
              src={Icons.UpArrowIcon}
              width={'16px'}
              height={'16px'}
              alt="down-arrow"
            />
          ) : (
            <Image
              src={Icons.DownArrowIcon}
              width={'16px'}
              height={'16px'}
              alt="up-arrow"
            />
          )}
        </Arrow>
      </ButtonStyle>
      <ul>
        {props.menus
          ?.filter(i => i.name !== activeMenu)
          .map((el, index) => (
            <li>
              <DropDownItem
                background={props.bg} 
                borderRadius={props.brR}
                size="md"
                color={props.color}
                isOpen={isOpen}
                listLength={props.menus.length}
                index={index}
                outline={props.outline}
                onClick={() => {
                  setIsOpen(false);
                  if (el.name !== activeMenu) {
                    setActiveMenu(el.name);
                    el.func();
                  }
                }}
              >
                {el.name}
              </DropDownItem>
            </li>
          ))}
      </ul>
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

const Container = styled.div<{
  isOpen: boolean;
  width: string;
  height: string;
  bg: string;
}>`
  position: relative;
  width: ${props => props.width};
  height: ${props => props.height};
  ul {
    background: transparent;
    z-index: 5;
    width: 100%;
    list-style: none;
    position: absolute;
    li {
      width: 100%;
      button {
        width: 100%;
      }
      button:hover {
        color: ${props => props.theme.main.contrast};
        background: ${props => props.theme.main.primary80};
      }
    }
  }
`;

const ButtonStyle = styled(Button)`
  width: 100%;
  height: 100%;
  ${props => props.theme.flex.row.center.center};
  gap: 4px;
  position: relative;
  z-index: 6;

  &:hover {
        color: ${props => props.theme.main.contrast};
        background: ${props => props.theme.main.primary80};
      }
`;
const Arrow = styled(CC.RowDiv)`
  position: absolute;
  right: 0px;
`;
const DropDownItem = styled(Button)<{
  index: number;
  isOpen: boolean;
  listLength: number;
  color?: string;
}>`
  --down: ${props => props.listLength / 10 - props.index / 10 + 's'};
  --up: ${props => props.index / 10 + 's'};
  color: ${props => props.theme.colors.[props.color] || props.theme.main.[props.color] || props.color || props.theme.main.contrast};
  background: ${props => props.theme.colors.[props.background] || props.theme.main.[props.background] || props.background || props.theme.main.contrast};
  animation: ${props =>
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
`;
