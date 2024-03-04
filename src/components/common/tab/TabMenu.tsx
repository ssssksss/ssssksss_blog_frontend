import styled from '@emotion/styled';
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
}

const TabMenu = (props: TabMenuType) => {
  const [currentTab, clickTab] = useState(0);

  const selectMenuHandler = (index) => {
    clickTab(index);
  };
  return (
    <Container>
      <HeadContainer>
        {props.menu.map((el, index) => (
          <li
            key={index}
            className={index === currentTab ? 'submenu focused' : 'submenu'}
            onClick={() => selectMenuHandler(index)}
          >
            {el.tabName}
          </li>
        ))}
      </HeadContainer>
      <BodyContainer
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

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const HeadContainer = styled.ul`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  align-items: center;
  list-style: none;

  .submenu {
    background-color: #dcdcdc;
    color: rgb(232, 234, 237);
    display: flex;
    width: max-content;
    padding: 10px;
    font-size: 15px;
    transition: 0.5s;
    cursor: pointer;
  }

  .focused {
    background-color: rgb(255, 255, 255);
    color: rgb(21, 20, 20);
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
  background-color: white;
  padding: 4px;
  height: ${(props) => props.h || '100%'};
  min-height: ${(props) => props.minH};
  max-height: ${(props) => props.maxH};
  width: ${(props) => props.w};
  min-width: ${(props) => props.minW};
  max-width: ${(props) => props.maxW};
`;
