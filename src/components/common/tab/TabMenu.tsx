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

  return (
    <Container>
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
  padding-bottom: 1px;

  .submenu {
    background-color: #dcdcdc;
    color: rgb(240 242 245);
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

  .focused::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: rgb(255, 255, 255);
    bottom: -1px;
    left: 0px;
  }

  li {
    outline: solid black 1px;
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
  outline: solid black 1px;
  background-color: white;
  padding: 4px;
  height: ${(props) => props.h || '100%'};
  min-height: ${(props) => props.minH};
  max-height: ${(props) => props.maxH};
  width: ${(props) => props.w};
  min-width: ${(props) => props.minW};
  max-width: ${(props) => props.maxW};
`;
