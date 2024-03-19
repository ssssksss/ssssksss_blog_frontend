import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { commonTheme } from './theme';
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
  fw?: boolean; // font weight
  overflow?: boolean;
  outline?: boolean;
  first?: string; // grid 너비 정하는데 사용
  second?: string; // grid 너비 정하는데 사용
  third?: string; // grid 너비 정하는데 사용
  outlineColor?: string;
  fontFamily?: string;
}

interface IPositionProps {
  top: string;
  left: string;
  right: string;
  bottom: string;
}
interface IGridProps {
  e1?: string;
  e2?: string;
  e3?: string;
  e4?: string;
}

const propsCommonStyle = (props: any) => css`
  gap: ${props.gap * 0.1}rem;
  border: ${props.br};
  border-radius: ${props.brR};
  padding: ${props.pd};
  margin: ${props.mg};
  height: ${props.h};
  min-height: ${props.minH};
  width: ${props.w};
  min-width: ${props.minW};
  background: ${props.theme.colors?.[props.bg] || props.theme.main?.[props.bg]};
  max-width: ${props.maxW};
  color: ${props.theme.colors?.[props.color] ||
  props.theme.main?.[props.color]};
  font-size: ${props.fontSize};
  font-weight: ${props.fw && '800'};
  font-family: ${props.fontFamily};
  position: ${props.position};
  ${props.overflow === 'hidden' &&
  css`
      overflow: scroll,
      msOverflowStyle: none,
      scrollbarWidth: none,
      &::-webkit-scrollbar: {
        display: none,
      },
      text-overflow: ellipsis;
      white-space: nowrap;
      `}
  ${props.outline &&
  css`
    outline: solid
      ${props.theme.colors?.[props.outlineColor] ||
      props.theme.main?.[props.outlineColor] ||
      props.outlineColor}
      0.2rem;
    outline-offset: -0.2rem;
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
const Column_CenterDiv = styled.div<IStyleProps>`
  width: 100%;
  ${commonTheme.flex.column._.center};
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

const GridColumn2Adjust = styled.div<IStyleProps & IGridProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    `${props.e1 || 'auto'} ${props.e2 || 'auto'}`};
  ${(props: any) => propsCommonStyle(props)};
`;

const GridColumn3 = styled.div<IStyleProps>`
  ${commonTheme.grid.column3};
  ${(props: any) => propsCommonStyle(props)};
`;

const GridColumn3Adjust = styled.div<IStyleProps & IGridProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    `${props.e1 || 'auto'} ${props.e2 || 'auto'} ${props.e3 || 'auto'}`};
  ${(props: any) => propsCommonStyle(props)};
`;

const GridColumn4 = styled.div<IStyleProps>`
  ${commonTheme.grid.column4};
  ${(props: any) => propsCommonStyle(props)};
`;

const GridRow2 = styled.div<IStyleProps>`
  ${commonTheme.grid.row2};
  ${(props: any) => propsCommonStyle(props)};
`;
const GridRow2Adjust = styled.div<IStyleProps>`
  display: grid;
  grid-template-rows: ${(props) =>
    `${props.e1 || 'auto'} ${props.e2 || 'auto'}`};
  ${(props: any) => propsCommonStyle(props)};
`;

const GridRow4 = styled.div<IStyleProps>`
  ${commonTheme.grid.row4};
  ${(props: any) => propsCommonStyle(props)};
`;

const AbsoluteRowBox = styled.div<IStyleProps & IPositionProps>`
  ${(props: any) => propsCommonStyle(props)};
  position: absolute;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  display: flex;
  flex-flow: nowrap row;
`;
const AbsoluteColumnBox = styled.div<IStyleProps & IPositionProps>`
  ${(props: any) => propsCommonStyle(props)};
  position: absolute;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  display: flex;
  flex-flow: nowrap column;
`;

const RelativeBox = styled.div<IStyleProps>`
  ${(props: any) => propsCommonStyle(props)};
  position: relative;
`;
const RelativeRowBox = styled.div<IStyleProps>`
  ${(props: any) => propsCommonStyle(props)};
  position: relative;
  display: flex;
  flex-flow: nowrap row;
`;
const RelativeColumnBox = styled.div<IStyleProps>`
  ${(props: any) => propsCommonStyle(props)};
  position: relative;
  display: flex;
  flex-flow: nowrap column;
`;

const ErrorDiv = styled.div`
  color: red;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
`;

const Img = styled.img<IStyleProps>`
  ${(props: any) => css`
    background-color: ${props.backgroundColor};
    width: ${props.imgSize || props.width};
    height: ${props.imgSize || props.height};
    padding: ${props.padding};
    border-radius: ${props.borderRadius};
  `}
`;
const ImgContainer = styled.div<IStyleProps>`
  aspect-ratio: 1;
  ${(props: any) => propsCommonStyle(props)};

  position: relative;
  display: flex;
  flex-flow: nowrap column;
  align-items: center;
  justify-content: center;

  img {
    object-fit: contain;
    width: 100%;
    height: 100%;
  }
`;

const OverflowText = styled.div<IStyleProps>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${(props: any) => css`
    width: ${props.width};
    max-width: ${props.maxWidth};
  `}
`;

const Text = styled.div<IStyleProps>`
  white-space: normal;
  word-wrap: break-word;

  ${(props: any) => css`
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
  Column_CenterDiv,
  ColumnCenterCenterDiv,
  ColumnEndDiv,
  GridColumn2,
  GridColumn2Adjust,
  GridColumn3,
  GridColumn3Adjust,
  GridColumn4,
  GridRow2,
  GridRow2Adjust,
  GridRow4,
  AbsoluteRowBox,
  AbsoluteColumnBox,
  RelativeBox,
  RelativeRowBox,
  RelativeColumnBox,
  ErrorDiv,
  Img,
  ImgContainer,
  OverflowText,
  Text,
  Container,
  Wrapper,
};
