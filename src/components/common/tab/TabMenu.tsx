import styled from '@emotion/styled';
import { CC } from '@styles/commonComponentStyle';
import { Component, useState } from 'react';

/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file TabMenu.tsx
 * @version 0.0.1 "2024-03-04 01:16:09"
 * @description 설명
 */

interface TabMenuType {
  menu: [
    {
      tabName: string;
      tabComponent: Component;
    },
  ];
  tabMenuH: string;
  tabMenuMinH: string;
  tabMenuMaxH: string;
  tabMenuW: string;
  tabMenuMinW: string;
  tabMenuMaxW: string;
  bg: string;
  outline: boolean;
}

const TabMenu = (props: TabMenuType) => {
  const [currentTab, clickTab] = useState(0);

  return (
    <Container {...props}>
      <HeadContainer>
        {props.menu.map((el, index) => (
          <li
            key={index}
            className={index === currentTab ? 'submenu focused' : 'submenu'}
            onClick={() => clickTab(index)}
          >
            {el.tabName}
          </li>
        ))}
      </HeadContainer>
      <BodyContainer
        {...props}
        h={props.tabMenuH}
        maxH={props.tabMenuMaxH}
        minH={props.tabMenuMinH}
        w={props.tabMenuW}
        maxW={props.tabMenuMaxW}
        minW={props.tabMenuMinW}
      >
        {props.menu[currentTab].tabComponent}
      </BodyContainer>
    </Container>
  );
};
export default TabMenu;

const Container = styled(CC.ColumnDiv)<{ props: unknown }>`
  width: 100%;
  height: 100%;
`;

const HeadContainer = styled.ul`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;
  padding-bottom: 0.1rem;

  .submenu {
    background-color: #dcdcdc;
    color: rgb(240 242 245);
    display: flex;
    width: max-content;
    padding: 1rem;
    font-size: 1.5rem;
    transition: 0.5s;
    cursor: pointer;
  }

  .focused {
    background-color: rgb(255, 255, 255);
    color: rgb(21, 20, 20);
  }

  .focused::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 0.1rem;
    background-color: rgb(255, 255, 255);
    bottom: -0.1rem;
    left: 0rem;
  }

  li {
    outline: ${(props) => props.outline && 'solid black 0.1rem'};
    position: relative;
  }

  & div.desc {
    text-align: center;
  }
`;

const BodyContainer = styled.div<{
  h: string;
  maxH: string;
  minH: string;
  w: string;
  maxW: string;
  minW: string;
}>`
  outline: ${(props) => props.outline && 'solid black 0.1rem'};
  padding: 0.4rem;
  height: ${(props) => props.h || '100%'};
  min-height: ${(props) => props.minH};
  max-height: ${(props) => props.maxH};
  width: ${(props) => props.w};
  min-width: ${(props) => props.minW};
  max-width: ${(props) => props.maxW};
`;
