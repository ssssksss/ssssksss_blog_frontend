import styled from '@emotion/styled';
import { ReactNode } from 'react';
/**
 * @author Sukyung Lee <ssssksss@naver.com>
 * @file Span.tsx
 * @version 0.0.1 "2023-09-20 22:35:58"
 * @description 설명
 */

interface SpanProps {
  fontSize?: string;
  fontFamily?: string;
  color?: string;
  children?: ReactNode;
}

const Span = ({ children, ...props }: SpanProps) => {
  return <Container {...props}>{children}</Container>;
};
export default Span;

const Container = styled.span<SpanProps>`
    font-size: ${(props) => props.fontSize};
    font-family: : ${(props) => props.fontFamily};
    color: ${(props) => props.color};
`;
