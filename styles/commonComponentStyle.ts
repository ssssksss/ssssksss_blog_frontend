import { commonTheme } from './theme';
import { css, keyframes } from '@emotion/react';
import Image from 'next/image';
import styled from '@emotion/styled';
interface IStyleProps {
  gap?: number;
  br?: string;
  brR?: string;
  pd?: string;
  mg?: string;
  h?: string;
  minH?: string;
  w?: string;
  minW?: string;
  bg?: string;
  maxW?: string;
  color?: string;
  noCursor?: boolean; // 나중에 삭제 고려해보기 별 필요없는 props
  imgSize?: string; // 이미지 정사각형 형태일때 사용하는 용도인데 나중에 고려해보기
  fontSize?: string;
  overflow?: boolean
  outline?: boolean;
  first?: string; // grid 너비 정하는데 사용
  second?: string; // grid 너비 정하는데 사용
  third?: string; // grid 너비 정하는데 사용
}

const propsCommonStyle = (props: any) => css`
  gap: ${props.gap}px;
  border: ${props.br};
  border-radius: ${props.brR};
  padding: ${props.pd};
  margin: ${props.mg};
  height: ${props.h};
  min-height: ${props.minH};
  width: ${props.w};
  min-width: ${props.minW};
  background: ${props.theme.colors.[props.bg] || props.theme.main.[props.bg]};
  max-width: ${props.maxW};
  color: ${props.color};
  font-size: ${props.fontSize};
  ${
    props.overflow &&
    css`
        overflow: scroll;
    `};

    & > h1, h2, h3, span, div{
  ${
    props.overflow === 'hidden' &&
    css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      `};
    }
  ${
    props.outline &&
    css`
      outline: solid ${props.theme.colors.[props.color] || props.theme.main.[props.color] || props.theme.main.primary80} 1px;
      background: transparent;
    `};
`;

const RowDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.row._.center};
  ${(props: any) => propsCommonStyle(props)};
`;

const RowStartDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.row._.start}
  ${(props: any) => propsCommonStyle(props)};
`;

const RowRightDiv = styled.div<IStyleProps>`
  width: 100%;
  ${commonTheme.flex.row.end.center};
  ${(props: any) => propsCommonStyle(props)};
`;

const RowCenterDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.row.center.center}
  width: 100%;
  ${(props: any) => propsCommonStyle(props)};
`;
const RowBetweenDiv = styled.div<IStyleProps>`
  width: 100%;
  ${commonTheme.flex.row.between.center}
  ${(props: any) => propsCommonStyle(props)};
`;

const RowBetweenStartDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.row.between.start}
  ${(props: any) => propsCommonStyle(props)};
`;

const ColumnLeftDiv = styled.div<IStyleProps>`
  /*  */
  width: 100%;
  ${commonTheme.flex.column._.start}
  ${(props: any) => propsCommonStyle(props)};
`;
const ColumnLeftCenterDiv = styled.div<IStyleProps>`
  /*  */
  width: 100%;
  ${commonTheme.flex.column._.start}
  justify-content: center;
  ${(props: any) => propsCommonStyle(props)};
`;
const ColumnDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.column}
  ${(props: any) => propsCommonStyle(props)};
`;
const ColumnStartDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.column.start}
  ${(props: any) => propsCommonStyle(props)};
`;
const ColumnStartCenterDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.column.start.center};
  ${(props: any) => propsCommonStyle(props)};
`;
const ColumnEndDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.column.end}
  ${(props: any) => propsCommonStyle(props)};
`;

const ColumnBetweenDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.column.between}
  ${(props: any) => propsCommonStyle(props)};
`;

const ColumnCenterDiv = styled.div<IStyleProps>`
  width: 100%;
  ${commonTheme.flex.column.center}
  ${(props: any) => propsCommonStyle(props)};
`;

const ColumnCenterCenterDiv = styled.div<IStyleProps>`
  width: 100%;
  ${commonTheme.flex.column.center.center}
  ${(props: any) => propsCommonStyle(props)};
`;

const GridColumn2 = styled.div<IStyleProps>`
  ${commonTheme.grid.column2};
  ${(props: any) => propsCommonStyle(props)};
`;

const GridColumn2Adjust = styled.div<IStyleProps>`
  display: grid;
  grid-template-columns: ${props => `${props.first || "auto"} ${props.second || "auto"}`};
  ${(props: any) => propsCommonStyle(props)};
`;

const GridColumn3 = styled.div<IStyleProps>`
  ${commonTheme.grid.column3};
  ${(props: any) => propsCommonStyle(props)};
`;

const GridColumn4 = styled.div<IStyleProps>`
  ${commonTheme.grid.column4};
  ${(props: any) => propsCommonStyle(props)};
`;

const ErrorDiv = styled.div`
  color: red;
  font-size: 12px;
  display: flex;
  align-items: center;
`;

const rotationDownUp = keyframes`
        from {
          opacity: 0;
          transform: rotateX(90deg);
        }
        
        to {
          opacity: 1;
          transform: rotateX(0deg);
        }
`;
const Img = styled.img<IStyleProps>`
  ${(props: any) =>
    css`
      background-color: ${props.backgroundColor};
      width: ${props.imgSize || props.width};
      height: ${props.imgSize || props.height};
      padding: ${props.padding};
      border-radius: ${props.borderRadius};
    `}
`;
const ImgContainer = styled.div<IStyleProps>`
  height: ${props => props.minHeight};
  width: ${props => props.minWidth};
  background: ${props => props.backgroundColor};

  position: relative;
  display: flex;
  flex-flow: nowrap column;
  align-items: center;
  justify-content: center;
  gap: 2px;

  & > span {
    font-size: 12px;
    white-space: nowrap;
  }

  /* &:hover {
    mix-blend-mode: difference;
    cursor: ${props => (props.noCursor ? 'default' : 'pointer')};
    & > span {
      position: absolute;
      animation: ${rotationDownUp} 0.3s ease-in-out;
      animation-fill-mode: forwards;
      color: red;
      font-size: 14px;
      transition: 0.5s;
    }
  } */
`;

const OverflowText = styled.div<IStyleProps>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${(props: any) =>
    css`
      width: ${props.width};
      max-width: ${props.maxWidth};
    `}
`;

const Text = styled.div<IStyleProps>`
  white-space: normal;
  word-wrap: break-word;

  ${(props: any) =>
    css`
      width: ${props.width};
      max-width: ${props.maxWidth};
    `}
`;

const Container = styled.div<IStyleProps>`
  width: 100%;
`;
const Wrapper = styled.div<IStyleProps>`
  width: 100%;
`;

export const CC = {
  RowDiv,
  RowRightDiv,
  RowStartDiv,
  RowBetweenDiv,
  RowCenterDiv,
  RowBetweenStartDiv,
  ColumnLeftDiv,
  ColumnLeftCenterDiv,
  ColumnBetweenDiv,
  ColumnDiv,
  ColumnStartDiv,
  ColumnStartCenterDiv,
  ColumnCenterDiv,
  ColumnCenterCenterDiv,
  ColumnEndDiv,
  GridColumn2,
  GridColumn2Adjust,
  GridColumn3,
  GridColumn4,
  ErrorDiv,
  Img,
  ImgContainer,
  OverflowText,
  Text,
  Container,
  Wrapper,
};
