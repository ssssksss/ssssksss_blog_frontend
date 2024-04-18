import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  BoxFlexComponentTypes,
  BoxGridComponentTypes,
} from './../@types/BoxComponent';
import { commonTheme, themeTypes } from './theme';
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
  bg?: string | number;
  maxW?: string;
  color?: string;
  noCursor?: boolean; // 나중에 삭제 고려해보기 별 필요없는 props
  imgSize?: string; // 이미지 정사각형 형태일때 사용하는 용도인데 나중에 고려해보기
  fontSize?: string;
  fw?: boolean; // font weight
  overflow?: boolean | string;
  outline?: boolean | string | number;
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

const propsCommonStyle = (props) => css`
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
  `}
  // 커스텀하게 정해진 스타일 모아놓는 공간
  ${props.outline == '1' &&
  css`
    outline: solid #333333 1px;
    outline-offset: -1px;
  `}
  ${props.bg == 'theme' &&
  css`
    background: ${props.theme.main.primary20};
    background-clip: padding-box;
  `}
`;

const RowDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.row._.center};
  ${(props: unknown) => propsCommonStyle(props)};
`;

const RowStartDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.row._.start}
  ${(props: unknown) => propsCommonStyle(props)};
`;

const RowRightDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.row.end.center};
  ${(props: unknown) => propsCommonStyle(props)};
`;

const RowCenterDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.row.center.center}
  ${(props: unknown) => propsCommonStyle(props)};
`;
const RowBetweenDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.row.between}
  ${(props: unknown) => propsCommonStyle(props)};
`;
const RowBetweenCenterDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.row.between.center}
  ${(props: unknown) => propsCommonStyle(props)};
`;

const RowBetweenStartDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.row.between.start}
  ${(props: unknown) => propsCommonStyle(props)};
`;

const ColumnLeftDiv = styled.div<IStyleProps>`
  /*  */
  ${commonTheme.flex.column._.start}
  ${(props: unknown) => propsCommonStyle(props)};
`;
const ColumnLeftCenterDiv = styled.div<IStyleProps>`
  /*  */
  ${commonTheme.flex.column._.start}
  justify-content: center;
  ${(props: unknown) => propsCommonStyle(props)};
`;
const ColumnDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.column}
  ${(props: unknown) => propsCommonStyle(props)};
`;
const ColumnStartDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.column.start}
  ${(props: unknown) => propsCommonStyle(props)};
`;
const ColumnStartCenterDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.column.start.center};
  ${(props: unknown) => propsCommonStyle(props)};
`;
const ColumnEndDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.column.end}
  ${(props: unknown) => propsCommonStyle(props)};
`;

const ColumnBetweenDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.column.between}
  ${(props: unknown) => propsCommonStyle(props)};
`;

const ColumnCenterDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.column.center}
  ${(props: unknown) => propsCommonStyle(props)};
`;
const Column_CenterDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.column._.center};
  ${(props: unknown) => propsCommonStyle(props)};
`;

const ColumnCenterCenterDiv = styled.div<IStyleProps>`
  ${commonTheme.flex.column.center.center}
  ${(props: unknown) => propsCommonStyle(props)};
`;

const GridColumn2 = styled.div<IStyleProps>`
  ${commonTheme.grid.column2};
  ${(props: unknown) => propsCommonStyle(props)};
`;

const GridColumn2Adjust = styled.div<IStyleProps & IGridProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    `${props.e1 || 'auto'} ${props.e2 || 'auto'}`};
  ${(props: unknown) => propsCommonStyle(props)};
`;

const GridColumn3 = styled.div<IStyleProps>`
  ${commonTheme.grid.column3};
  ${(props: unknown) => propsCommonStyle(props)};
`;

const GridColumn3Adjust = styled.div<IStyleProps & IGridProps>`
  display: grid;
  grid-template-columns: ${(props) =>
    `${props.e1 || 'auto'} ${props.e2 || 'auto'} ${props.e3 || 'auto'}`};
  ${(props: unknown) => propsCommonStyle(props)};
`;

const GridColumn4 = styled.div<IStyleProps>`
  ${commonTheme.grid.column4};
  ${(props: unknown) => propsCommonStyle(props)};
`;

const GridRow2 = styled.div<IStyleProps>`
  ${commonTheme.grid.row2};
  ${(props: unknown) => propsCommonStyle(props)};
`;
const GridRow2Adjust = styled.div<IStyleProps>`
  display: grid;
  grid-template-rows: ${(props) =>
    `${props.e1 || 'auto'} ${props.e2 || 'auto'}`};
  ${(props: unknown) => propsCommonStyle(props)};
`;

const GridRow4 = styled.div<IStyleProps>`
  ${commonTheme.grid.row4};
  ${(props: unknown) => propsCommonStyle(props)};
`;

const AbsoluteRowBox = styled.div<IStyleProps & IPositionProps>`
  ${(props: unknown) => propsCommonStyle(props)};
  position: absolute;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  display: flex;
  flex-flow: nowrap row;
`;
const AbsoluteColumnBox = styled.div<IStyleProps & IPositionProps>`
  ${(props: unknown) => propsCommonStyle(props)};
  position: absolute;
  top: ${(props) => props.top};
  bottom: ${(props) => props.bottom};
  left: ${(props) => props.left};
  right: ${(props) => props.right};
  display: flex;
  flex-flow: nowrap column;
`;

const RelativeBox = styled.div<IStyleProps>`
  ${(props: unknown) => propsCommonStyle(props)};
  position: relative;
`;
const RelativeRowBox = styled.div<IStyleProps>`
  ${(props: unknown) => propsCommonStyle(props)};
  position: relative;
  display: flex;
  flex-flow: nowrap row;
`;
const RelativeColumnBox = styled.div<IStyleProps>`
  ${(props: unknown) => propsCommonStyle(props)};
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
  ${(props: unknown) => css`
    background-color: ${props.backgroundColor};
    width: ${props.imgSize || props.width};
    height: ${props.imgSize || props.height};
    padding: ${props.padding};
    border-radius: ${props.borderRadius};
  `}
`;
const ImgContainer = styled.div<IStyleProps>`
  aspect-ratio: 1;
  ${(props: unknown) => propsCommonStyle(props)};

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
  ${(props: unknown) => css`
    width: ${props.width};
    max-width: ${props.maxWidth};
  `}
`;

const Text = styled.div<IStyleProps>`
  white-space: normal;
  word-wrap: break-word;

  ${(props: unknown) => css`
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

// s : 2024-03-24 box 형태로 공간을 구분하는 컴포넌트 만들기

const commonBoxStyle = (
  props: BoxFlexComponentTypes.FlexBoxProps & themeTypes,
) => css`
  width: ${props.w};
  min-width: ${props.minW};
  max-width: ${props.maxW};
  height: ${props.h};
  min-height: ${props.minH};
  max-height: ${props.maxH};
  padding: ${props.pd};
  margin: ${props.mg};
  background: ${props.theme.colors?.[props.bg] || props.theme.main?.[props.bg]};
  gap: ${props.theme.calcRem(props.gap)};
  position: ${props.gap};
  top: ${props.top};
  bottom: ${props.bottom};
  left: ${props.left};
  right: ${props.right};
  ${props.scroll &&
  css`
    ${props.theme.scroll?.[props.scroll]};
  `}
  ${props.outline &&
  css`
    outline: solid
      ${props.theme.colors?.[props.outline] || props.theme.main?.primary100}
      ${props.theme.calcRem(2)};
    outline-offset: -${props.theme.calcRem(2)};
    border-radius: ${props.theme.calcRem(8)};
  `};
  // 커스텀하게 정해진 스타일 모아놓는 공간
  ${props.outline == '1' &&
  css`
    outline: solid #333333 1px;
    outline-offset: -1px;
  `}
  ${props.bg == 'theme' &&
  css`
    background: ${props.theme.main.primary20};
    background-clip: padding-box;
  `}
`;
const RelativeRowCenterBox = styled.div<IStyleProps>`
  ${(props: unknown) => propsCommonStyle(props)};
  position: relative;
  display: flex;
  flex-flow: nowrap row;
  align-items: center;
  & > * {
    flex-shrink: 0;
  }
`;
const RelativeRowLeftCenterBox = styled.div<IStyleProps>`
  ${(props: unknown) => propsCommonStyle(props)};
  position: relative;
  display: flex;
  flex-flow: nowrap row;
  justify-content: flex-start;
  align-items: center;
`;
const RowLeftStartBox = styled.div<BoxFlexComponentTypes.FlexBoxProps>`
  ${commonTheme.flexBox.row.left.start};
  ${(props) => commonBoxStyle(props)};
`;
const RowCenterStartBox = styled.div<BoxFlexComponentTypes.FlexBoxProps>`
  ${commonTheme.flexBox.row.center.start};
  ${(props) => commonBoxStyle(props)};
`;
const RowRightStartBox = styled.div<BoxFlexComponentTypes.FlexBoxProps>`
  ${commonTheme.flexBox.row.right.start};
  ${(props) => commonBoxStyle(props)};
`;
const RowLeftCenterBox = styled.div<BoxFlexComponentTypes.FlexBoxProps>`
  ${commonTheme.flexBox.row.left.center};
  ${(props) => commonBoxStyle(props)};
`;
const RowCenterCenterBox = styled.div<BoxFlexComponentTypes.FlexBoxProps>`
  ${commonTheme.flexBox.row.center.center};
  ${(props) => commonBoxStyle(props)};
`;
const RowRightCenterBox = styled.div<BoxFlexComponentTypes.FlexBoxProps>`
  ${commonTheme.flexBox.row.right.center};
  ${(props) => commonBoxStyle(props)};
`;
const RowLeftEndBox = styled.div<BoxFlexComponentTypes.FlexBoxProps>`
  ${commonTheme.flexBox.row.left.end};
  ${(props) => commonBoxStyle(props)};
`;
const RowCenterEndBox = styled.div<BoxFlexComponentTypes.FlexBoxProps>`
  ${commonTheme.flexBox.row.center.end};
  ${(props) => commonBoxStyle(props)};
`;
const RowRightEndBox = styled.div<BoxFlexComponentTypes.FlexBoxProps>`
  ${commonTheme.flexBox.row.right.end};
  ${(props) => commonBoxStyle(props)};
`;
const RowBetweenStartBox = styled.div<BoxFlexComponentTypes.FlexBoxProps>`
  ${commonTheme.flexBox.row.between.start};
  ${(props) => commonBoxStyle(props)};
`;
const RowBetweenCenterBox = styled.div<BoxFlexComponentTypes.FlexBoxProps>`
  ${commonTheme.flexBox.row.between.center};
  ${(props) => commonBoxStyle(props)};
`;
const RowBetweenEndBox = styled.div<BoxFlexComponentTypes.FlexBoxProps>`
  ${commonTheme.flexBox.row.between.end};
  ${(props) => commonBoxStyle(props)};
`;
//
const ColBox = styled.div<BoxGridComponentTypes.GridBoxProps>`
  display: flex;
  flex-flow: nowrap column;
    ${(props) => commonBoxStyle(props)};
`;
const ColLeftStartBox = styled.div<BoxGridComponentTypes.GridBoxProps>`
  ${commonTheme.flexBox.col.left.start};
  ${(props) => commonBoxStyle(props)};
`;
const ColLeftCenterBox = styled.div<BoxGridComponentTypes.GridBoxProps>`
  ${commonTheme.flexBox.col.left.center};
  ${(props) => commonBoxStyle(props)};
`;
const ColLeftEndBox = styled.div<BoxGridComponentTypes.GridBoxProps>`
  ${commonTheme.flexBox.col.left.end};
  ${(props) => commonBoxStyle(props)};
`;
const ColCenterStartBox = styled.div<BoxGridComponentTypes.GridBoxProps>`
  ${commonTheme.flexBox.col.center.start};
  ${(props) => commonBoxStyle(props)};
`;
const ColCenterCenterBox = styled.div<BoxGridComponentTypes.GridBoxProps>`
  ${commonTheme.flexBox.col.center.center};
  ${(props) => commonBoxStyle(props)};
`;
const ColCenterEndBox = styled.div<BoxGridComponentTypes.GridBoxProps>`
  ${commonTheme.flexBox.col.center.end};
  ${(props) => commonBoxStyle(props)};
`;
const ColRightStartBox = styled.div<BoxGridComponentTypes.GridBoxProps>`
  ${commonTheme.flexBox.col.right.start};
  ${(props) => commonBoxStyle(props)};
`;
const ColRightCenterBox = styled.div<BoxGridComponentTypes.GridBoxProps>`
  ${commonTheme.flexBox.col.right.center};
  ${(props) => commonBoxStyle(props)};
`;
const ColRightEndBox = styled.div<BoxGridComponentTypes.GridBoxProps>`
  ${commonTheme.flexBox.col.right.end};
  ${(props) => commonBoxStyle(props)};
`;
const ColBetweenLeftBox = styled.div<BoxGridComponentTypes.GridBoxProps>`
  ${commonTheme.flexBox.col.between.start};
  ${(props) => commonBoxStyle(props)};
`;
const ColBetweenCenterBox = styled.div<BoxGridComponentTypes.GridBoxProps>`
  ${commonTheme.flexBox.col.between.center};
  ${(props) => commonBoxStyle(props)};
`;
const ColBetweenRightBox = styled.div<BoxGridComponentTypes.GridBoxProps>`
  ${commonTheme.flexBox.col.between.end};
  ${(props) => commonBoxStyle(props)};
`;
//
const GridBox = styled.div<BoxGridComponentTypes.GridBoxProps>`
  ${({ columns, rows }) => css`
    gridtemplatecolumns: repeat(${columns}, 1fr);
    gridtemplaterows: ${rows == null ? 'none' : `repeat(${rows}, 1fr)`};
  `}
  ${(props) => commonBoxStyle(props)};
`;

// e : 2024-03-24 box 형태로 공간을 구분하는 컴포넌트 만들기

export const CC = {
  // s: 2024-03-24
  RowLeftStartBox,
  RowCenterStartBox,
  RowRightStartBox,
  RowLeftCenterBox,
  RowCenterCenterBox,
  RowRightCenterBox,
  RowLeftEndBox,
  RowCenterEndBox,
  RowRightEndBox,
  RowBetweenStartBox,
  RowBetweenCenterBox,
  RowBetweenEndBox,
  RelativeRowCenterBox,
  RelativeRowLeftCenterBox,
  ColBox,
  ColLeftStartBox,
  ColLeftCenterBox,
  ColLeftEndBox,
  ColCenterStartBox,
  ColCenterCenterBox,
  ColCenterEndBox,
  ColRightStartBox,
  ColRightCenterBox,
  ColRightEndBox,
  ColBetweenLeftBox,
  ColBetweenCenterBox,
  ColBetweenRightBox,
  GridBox,

  // e: 2024-03-24
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
