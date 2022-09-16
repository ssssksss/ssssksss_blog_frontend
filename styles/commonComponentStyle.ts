import theme from "./theme";
import styled, { css, keyframes } from "styled-components";

interface IStyleProps {
  gap?: number;
  border?: string;
  padding?: string;
  height?: string;
  width?: string;
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

const Img = styled.img<IStyleProps>`
  ${(props: any) =>
    css`
      background-color: ${props.backgroundColor};
      width: ${props.size || props.width};
      height: ${props.size || props.height};
      padding: ${props.padding};
      border-radius: ${props.borderRadius};
    `}

  &:hover {
    cursor: ${(props) => (props.noCursor ? "default" : "pointer")};
  }
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
const ImgContainer = styled(ColumnCenterDiv)`
  width: auto;
  & > span {
    visibility: hidden;
  }

  &:hover {
    & > span {
      visibility: visible;
      animation: ${rotationDownUp} 0.3s ease-in-out;
      animation-fill-mode: forwards;
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
