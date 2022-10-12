import theme from "./theme";
import styled, { css, keyframes } from "styled-components";

interface IStyleProps {
  gap?: number;
  border?: string;
  padding?: string;
  height?: string;
  minHeight?: string;
  width?: string;
  minWidth?: string;
  backgroundColor?: string;
  color?: string;
  fontSize?: string;
  borderRadius?: string;
  noCursor?: boolean;
  size?: string;
  maxWidth?: string;
}

const RowDiv = styled.div<IStyleProps>`
  width: 100%;
  ${theme.flex.row._.center}

  ${(props: any) =>
    css`
      background-color: ${props.backgroundColor};
      gap: ${props.gap}px;
      border: ${props.border};
      width: ${props.width};
      height: ${props.height};
      padding: ${props.padding};
      color: ${props.color};
      font-size: ${props.fontSize};
    `}
`;

const RowStartDiv = styled.div<IStyleProps>`
  ${theme.flex.row._.start}

  ${(props: any) =>
    css`
      background-color: ${props.backgroundColor};
      gap: ${props.gap}px;
      border: ${props.border};
      width: ${props.width};
      height: ${props.height};
      padding: ${props.padding};
      color: ${props.color};
      font-size: ${props.fontSize};
    `}
`;

const RowRightDiv = styled.div<IStyleProps>`
  width: 100%;
  ${theme.flex.row.end.center};
  ${(props: any) =>
    css`
      background-color: ${props.backgroundColor};
      gap: ${props.gap}px;
      border: ${props.border};
      width: ${props.width};
      height: ${props.height};
      padding: ${props.padding};
      color: ${props.color};
      font-size: ${props.fontSize};
    `}
`;

const RowCenterDiv = styled.div<IStyleProps>`
  ${theme.flex.row.center.center}
  width: 100%;
  ${(props: any) =>
    css`
      background-color: ${props.backgroundColor};
      gap: ${props.gap}px;
      border: ${props.border};
      width: ${props.width};
      height: ${props.height};
      padding: ${props.padding};
      color: ${props.color};
      font-size: ${props.fontSize};
    `}
`;
const RowBetweenDiv = styled.div<IStyleProps>`
  width: 100%;
  ${theme.flex.row.between.center}
  ${(props: any) =>
    css`
      background-color: ${props.backgroundColor};
      gap: ${props.gap}px;
      border: ${props.border};
      width: ${props.width};
      height: ${props.height};
      padding: ${props.padding};
      color: ${props.color};
      font-size: ${props.fontSize};
    `}
`;

const RowBetweenStartDiv = styled.div<IStyleProps>`
  ${theme.flex.row.between.start}
  ${(props: any) =>
    css`
      background-color: ${props.backgroundColor};
      gap: ${props.gap}px;
      border: ${props.border};
      width: ${props.width};
      height: ${props.height};
      padding: ${props.padding};
      color: ${props.color};
      font-size: ${props.fontSize};
    `}
`;

const ColumnLeftDiv = styled.div<IStyleProps>`
  /*  */
  width: 100%;
  ${theme.flex.column._.start}
  ${(props: any) =>
    css`
      background-color: ${props.backgroundColor};
      gap: ${props.gap}px;
      border: ${props.border};
      width: ${props.width};
      height: ${props.height};
      padding: ${props.padding};
      color: ${props.color};
      font-size: ${props.fontSize};
    `}
`;
const ColumnDiv = styled.div<IStyleProps>`
  ${theme.flex.column}
  ${(props: any) =>
    css`
      background-color: ${props.backgroundColor};
      gap: ${props.gap}px;
      border: ${props.border};
      width: ${props.width};
      height: ${props.height};
      padding: ${props.padding};
      color: ${props.color};
      font-size: ${props.fontSize};
    `}
`;
const ColumnEndDiv = styled.div<IStyleProps>`
  ${theme.flex.column.end}
  ${(props: any) =>
    css`
      background-color: ${props.backgroundColor};
      gap: ${props.gap}px;
      border: ${props.border};
      width: ${props.width};
      height: ${props.height};
      padding: ${props.padding};
      color: ${props.color};
      font-size: ${props.fontSize};
    `}
`;

const ColumnBetweenDiv = styled.div<IStyleProps>`
  ${theme.flex.column.between}
  ${(props: any) =>
    css`
      background-color: ${props.backgroundColor};
      gap: ${props.gap}px;
      border: ${props.border};
      width: ${props.width};
      height: ${props.height};
      padding: ${props.padding};
      color: ${props.color};
      font-size: ${props.fontSize};
    `}
`;

const ColumnCenterDiv = styled.div<IStyleProps>`
  width: 100%;
  ${theme.flex.column.center.center}
  ${(props: any) =>
    css`
      background-color: ${props.backgroundColor};
      gap: ${props.gap}px;
      border: ${props.border};
      width: ${props.width};
      height: ${props.height};
      padding: ${props.padding};
      color: ${props.color};
      font-size: ${props.fontSize};
    `}
`;

const ErrorDiv = styled.div`
  color: red;
  font-size: 12px;
  display: flex;
  align-items: center;
  height: 30px;
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
      width: ${props.size || props.width};
      height: ${props.size || props.height};
      padding: ${props.padding};
      border-radius: ${props.borderRadius};
    `}
`;
const ImgContainer = styled.div<IStyleProps>`
  height: ${(props) => props.minHeight};
  width: ${(props) => props.minWidth};
  background: ${(props) => props.backgroundColor};

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

  &:hover {
    mix-blend-mode: difference;
    cursor: ${(props) => (props.noCursor ? "default" : "pointer")};
    & > span {
      position: absolute;
      animation: ${rotationDownUp} 0.3s ease-in-out;
      animation-fill-mode: forwards;
      color: red;
      font-size: 14px;
      transition: 0.5s;
    }
  }
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

export const CF = {
  RowDiv,
  RowRightDiv,
  RowStartDiv,
  RowBetweenDiv,
  RowCenterDiv,
  RowBetweenStartDiv,
  ColumnLeftDiv,
  ColumnBetweenDiv,
  ColumnDiv,
  ColumnCenterDiv,
  ColumnEndDiv,
  ErrorDiv,
  Img,
  ImgContainer,
  OverflowText,
  Text,
};
