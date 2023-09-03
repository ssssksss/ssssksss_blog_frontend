import { CC } from '@/styles/commonComponentStyle';
import { ReactNode } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';

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
  titleFontSize?: string;
  titleFontWeight?: number;
  titleBg?: string;
  titleP?: string; // title-padding
  children?: ReactNode;
  padding?: string;
  bg?: string; // background
  br?: string; // border-radius
}

const Space = ({
  title1,
  title3,
  title4,
  gap,
  children,
  height,
  titleWidth,
  titleFontSize,
  titleFontWeight,
  titleBg, // title-background
  titleP, // title-padding
  padding,
  bg,
  br,
}: ISpaceProps) => {
  return (
    <Container
      height={height}
      padding={padding}
      background={bg}
      borderRadius={br}
    >
      {title1 && (
        <ContainerColumn gap={gap}>
          {title1 && (
            <TitleDiv
              titleFontSize={titleFontSize}
              titleFontWeight={titleFontWeight}
              titleWidth={titleWidth}
              titleBg={titleBg}
              padding={titleP}
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
              titleFontWeight={titleFontWeight}
              titleWidth={titleWidth}
              titleBg={titleBg}
              padding={titleP}
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
              padding={titleP}
              titleFontWeight={titleFontWeight}
              titleWidth={titleWidth}
              titleBg={titleBg}
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
const Container = styled.div<{
  height?: string;
  padding?: string;
  background?: string;
}>`
  padding: ${props => props.padding || '6px 4px'};
  ${props =>
    props.height &&
    css`
      height: ${props.height};
    `}
  ${props =>
    props.background &&
    css`
      background: ${props.background};
    `}
  ${props =>
    props.borderRadius &&
    css`
      border-radius: ${props.borderRadius};
    `}
`;

const ContainerColumn = styled(CC.ColumnDiv)`
  height: 100%;
  ${props =>
    props.gap &&
    css`
      gap: ${props.gap}px;
    `}
`;

const ContainerRow = styled(CC.RowBetweenDiv)`
  height: 100%;
  display: flex;
  align-items: center;
  ${props =>
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
  titleBg?: string;
}>`
  ${(props: any) =>
    css`
      width: ${props.titleWidth};
      padding: ${props.padding};
      font-size: ${props.titleFontSize || '16px'};
      font-weight: ${props.titleFontWeight || 600};
      background: ${props.titleBg};
    `}
`;
const ChildrenDiv = styled.div`
  display: flex;
  align-items: center;
`;
