import { CF } from "@/styles/commonComponentStyle";
import { ReactNode } from "react";
import styled, { css } from "styled-components";

/*
 * Author : Sukyung Lee
 * FileName: Space.tsx
 * Date: 2022-06-21 11:33:07
 * Description : 컴포넌트 위에 타이틀을 보여주기 위한 용도의 컴포넌트
 */

interface ISpaceProps {
  title1?: string;
  title3?: string;
  title4?: string;
  gap?: number;
  width?: string;
  height?: string;
  titleWidth?: string;
  titlePadding?: string;
  titleFontSize?: string;
  titleFontWeight?: number;
  titleBackground?: string;
  children?: ReactNode;
  padding?: string;
}

const Space = ({
  title1,
  title3,
  title4,
  gap,
  children,
  height,
  titleWidth,
  titlePadding,
  titleFontSize,
  titleFontWeight,
  titleBackground,
  padding,
}: ISpaceProps) => {
  return (
    <Container height={height} padding={padding}>
      {title1 && (
        <ContainerColumn gap={gap}>
          {title1 && (
            <TitleDiv
              padding={titlePadding}
              titleFontSize={titleFontSize}
              titleFontWeight={titleFontWeight}
              titleWidth={titleWidth}
              titleBackground={titleBackground}
            >
              {title1}
            </TitleDiv>
          )}
          <ChildrenDiv> {children} </ChildrenDiv>
        </ContainerColumn>
      )}
      {title4 && (
        <ContainerRow gap={gap}>
          {title4 && (
            <TitleDiv
              padding={titlePadding}
              titleFontWeight={titleFontWeight}
              titleWidth={titleWidth}
              titleBackground={titleBackground}
            >
              {title4}
            </TitleDiv>
          )}
          <ChildrenDiv> {children} </ChildrenDiv>
        </ContainerRow>
      )}
      {title3 && (
        <ContainerColumn gap={gap}>
          <ChildrenDiv> {children} </ChildrenDiv>
          {title3 && (
            <TitleDiv
              padding={titlePadding}
              titleFontWeight={titleFontWeight}
              titleWidth={titleWidth}
              titleBackground={titleBackground}
            >
              {title3}
            </TitleDiv>
          )}
        </ContainerColumn>
      )}
    </Container>
  );
};
export default Space;
const Container = styled.div<{ height?: string; padding?: string }>`
  height: 100%;
  width: 100%;
  ${(props) =>
    props.height &&
    css`
      height: ${props.height};
      padding: ${props.padding};
    `}
`;

const ContainerColumn = styled(CF.ColumnDiv)`
  height: 100%;
  ${(props) =>
    props.gap &&
    css`
      gap: ${props.gap}px;
    `}
`;

const ContainerRow = styled(CF.RowBetweenStartDiv)`
  height: 100%;
  display: flex;
  align-items: center;
  ${(props) =>
    props.gap &&
    css`
      gap: ${props.gap}px;
    `}
`;
const TitleDiv = styled.div<{
  padding?: string;
  titleFontSize?: string;
  titleFontWeight?: number;
  titleWidth?: string;
  titleBackground?: string;
}>`
  ${(props: any) =>
    css`
      width: ${props.titleWidth};
      padding: ${props.padding};
      font-size: ${props.titleFontSize || "1em"};
      font-weight: ${props.titleFontWeight || 600};
      background: ${props.titleBackground};
    `}
`;
const ChildrenDiv = styled.div`
  width: 100%;
  height: 100%;
`;
